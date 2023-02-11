import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Deployer, Nft } from "../typechain-types";
import { deployDeployer } from "./utils/deployContracts";

describe("Global test", function () {
    let deployer: Deployer;
    let nft: Nft;
    let owner: SignerWithAddress;
    let minter: SignerWithAddress;
    let userA: SignerWithAddress;
    let userB: SignerWithAddress;
    let userC: SignerWithAddress;
    
    before(async function () {
        const signers = await ethers.getSigners();
        owner = signers[0];
        minter = signers[1];
        userA = signers[2];
        userB = signers[3];
        userC = signers[4];
        deployer = (await deployDeployer(owner)).deployerInstance;
    });
    
    it("should deploy a collection", async function () {
        let tx = await deployer.connect(owner).deployCollection("Test", "TEST", "https://alexis.balayre.xyz/collections/1/");
        let txReceipt = await tx.wait();
        const nftAddress = txReceipt.logs?.[0].address;
        nft = await ethers.getContractAt("Nft", nftAddress) as Nft;
        expect(await nft.name()).to.equal("Test");
        expect(await nft.symbol()).to.equal("TEST");
        expect(await nft.owner()).to.equal(owner.address);
        expect(await nft.baseURI()).to.equal("https://alexis.balayre.xyz/collections/1/");
    });

    it("should mint a token for user A", async function () {
        const beforeBalance = await nft.balanceOf(userA.address);
        let tx = await nft.connect(owner).safeMint(userA.address);
        await tx.wait();
        const afterBalance = await nft.balanceOf(userA.address);
        expect(afterBalance).to.equal(beforeBalance.add(1));
        expect(await nft.tokenURI(0)).to.equal("https://alexis.balayre.xyz/collections/1/0");
    });

    it("should mint a token for user A and for user B", async function () {
        const beforeBalanceA = await nft.balanceOf(userA.address);
        const beforeBalanceB = await nft.balanceOf(userB.address);
        let tx = await nft.connect(owner).safeMintBatch([userA.address, userB.address]);
        await tx.wait();
        const afterBalanceA = await nft.balanceOf(userA.address);
        const afterBalanceB = await nft.balanceOf(userB.address);
        expect(afterBalanceA).to.equal(beforeBalanceA.add(1));
        expect(afterBalanceB).to.equal(beforeBalanceB.add(1));
        expect(await nft.tokenURI(1)).to.equal("https://alexis.balayre.xyz/collections/1/1");
        expect(await nft.tokenURI(2)).to.equal("https://alexis.balayre.xyz/collections/1/2");
    });

    it("should not deploy a collection", async function () {
        await expect(deployer.connect(userC).deployCollection("Test", "TEST", "https://alexis.balayre.xyz/")).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not allow user C to mint a token for user A", async function () {
        await expect(nft.connect(userC).safeMint(userA.address)).to.be.reverted;
    });

    it("should allow user C to mint a token for user A", async function () {
        await nft.connect(owner).setMinterRole(userC.address, true);
        const beforeBalance = await nft.balanceOf(userA.address);
        let tx = await nft.connect(userC).safeMint(userA.address);
        await tx.wait();
        const afterBalance = await nft.balanceOf(userA.address);
        expect(afterBalance).to.equal(beforeBalance.add(1));
    });


});