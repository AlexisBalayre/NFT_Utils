import { ethers } from "hardhat";
import { Nft } from "../../typechain-types";

// TODO: Replace with your own values
const nftCollectionContract: string = "";
const to: string = "";

async function main() {
    const [ , minter ] = await ethers.getSigners();
    console.log(`Minting NFT to ${to} ...`);
    let nft = await ethers.getContractAt("Nft", nftCollectionContract) as Nft;
    let tx = await nft.connect(minter).safeMint(to);
    await tx.wait();
    console.log(`NFT minted`);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
