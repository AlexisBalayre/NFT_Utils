import { ethers } from "hardhat";
import { Nft } from "../../typechain-types";

// TODO: Replace with your own values
const deployerContractAddress: string = "";
const minterAddress: string = "";
const collectionName: string = "";
const collectionSymbol: string = "";
const collectionURI: string = "";



async function main() {
    const [ owner, ] = await ethers.getSigners();
    console.log(`Deploying NFT Collection ${collectionName} with symbol ${collectionSymbol} with ${deployerContractAddress} as deployer contract`);
    let deployerContract = await ethers.getContractAt("Deployer", deployerContractAddress);
    let tx = await deployerContract.connect(owner).deployCollection(collectionName, collectionSymbol, collectionURI);
    let txReceipt = await tx.wait();
    const nftAddress = txReceipt.logs?.[0].address;
    console.log(`NFT Collection deployed at ${nftAddress}`);
    let nftContract = await ethers.getContractAt("Nft", nftAddress) as Nft;
    let tx2 = await nftContract.connect(owner).setMinterRole(minterAddress, true);
    await tx2.wait();
    console.log(`Minter role setted for ${minterAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
