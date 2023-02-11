import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { Deployer, Nft } from "../../typechain-types";

export async function deployDeployer(owner: SignerWithAddress): Promise<{ deployerInstance: Deployer }> {
    let deployerContract = await ethers.getContractFactory("Deployer", owner);
    let deployerInstance = await deployerContract.deploy() as Deployer;
    await deployerInstance.deployed();
    console.log(`Deployer deployed at ${deployerInstance.address}`);
    return { deployerInstance };
}

/* export async function deployNftCollection(owner: SignerWithAddress, deployer: Deployer, name: string, symbol: string): Promise<{ nft: Nft }> {
    let tx =  await deployer.connect(owner).deployCollection(name, symbol);
    let txReceipt = await tx.wait();
    console.log(txReceipt)
} */