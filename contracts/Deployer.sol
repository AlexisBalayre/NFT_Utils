// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Nft.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Deployer is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
     
    EnumerableSet.AddressSet private collections;

    event NewCollectionDeployed(address indexed collectionAddress, string indexed name, string symbol);

    function getCollectionAddress(uint256 _index) view external returns (address _collection) {
        _collection = collections.at(_index);
    }

    function getCollectionsAddresses() view external returns (address[] memory _collections) {
        _collections = collections.values();
    }

    function getCollectionsNumber() view external returns (uint256 _collectionNumber) {
        _collectionNumber = collections.length();
    }

    function isCollectionAddress(address _collection) view external returns (bool _isCollectionAddress) {
        _isCollectionAddress = collections.contains(_collection);
    }

    function deployCollection(string memory _name, string memory _symbol, string memory _baseURI) external onlyOwner {
        Nft newCollection = new Nft(msg.sender, _name, _symbol, _baseURI);
        collections.add(address(newCollection));
        emit NewCollectionDeployed(address(newCollection), _name, _symbol);
    }
}
