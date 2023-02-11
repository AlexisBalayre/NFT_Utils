import { ethers } from "hardhat";
import { Deployer } from "../../typechain-types";

async function main() {
  console.log("Deploying Deployer contract...");
  const [ owner, ] = await ethers.getSigners();
  const Deployer = await ethers.getContractFactory("Deployer");
  const deployer = await Deployer.connect(owner).deploy() as Deployer;
  await deployer.deployed();
  console.log("Deployer contract deployed to:", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
