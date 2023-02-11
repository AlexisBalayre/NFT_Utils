// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nft is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIdCounter;
    mapping(address => bool) private _isMinter;

    string public baseURI;

    error IsNotMinter(address _caller);

    constructor(
        address _owner,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        transferOwnership(_owner);
        _isMinter[_owner] = true;
        baseURI = _initBaseURI;
    }

    function isMinter(address _minter) external view returns (bool) {
        return _isMinter[_minter];
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function safeMint(address _to) external returns (uint256 tokenId) {
        if (!_isMinter[msg.sender]) revert IsNotMinter(msg.sender);
        tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(_to, tokenId);
    }

    function safeMintBatch(address[] calldata _to) external returns (uint256[] memory tokenIds) {
        if (!_isMinter[msg.sender]) revert IsNotMinter(msg.sender);
        tokenIds = new uint256[](_to.length);
        for (uint256 i = 0; i < _to.length; ++i) {
            tokenIds[i] = tokenIdCounter.current();
            tokenIdCounter.increment();
            _safeMint(_to[i], tokenIds[i]);
        }
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI) external onlyOwner {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function setMinterRole(address _minter, bool _hasMinterRole) external onlyOwner {
        _isMinter[_minter] = _hasMinterRole;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
    }

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }
}