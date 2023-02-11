import { ethers } from "hardhat";
import { Nft } from "../../typechain-types";

// TODO: Replace with your own values
const nftCollectionContract = "";
const tokenIDs: number[] = [];
const uri: string[] = [];

async function main() {
    const [ owner, ] = await ethers.getSigners();
    for (let i = 0; i < tokenIDs.length; i++) {
        console.log(`Changing URI of token ${tokenIDs[i]} to ${uri[i]} ...`);
        let nft = await ethers.getContractAt("Nft", nftCollectionContract) as Nft;
        let tx = await nft.connect(owner).setTokenURI(tokenIDs[i], uri[i]);
        await tx.wait();
        console.log(`URI changed`);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
