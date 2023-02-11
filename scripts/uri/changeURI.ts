import { ethers } from "hardhat";
import { Nft } from "../../typechain-types";

// TODO: Replace with your own values
const nftCollectionContract = "";
const tokenID: number = 1;
const uri: string = "";

async function main() {
    const [ owner, ] = await ethers.getSigners();
    console.log(`Changing URI of token ${tokenID} to ${uri} ...`);
    let nft = await ethers.getContractAt("Nft", nftCollectionContract) as Nft;
    let tx = await nft.connect(owner).setTokenURI(tokenID, uri);
    await tx.wait();
    console.log(`URI changed`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
