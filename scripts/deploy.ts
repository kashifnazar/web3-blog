import { ethers } from "hardhat";
import fs from "fs"

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  const Blog = await ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("New Blog");

  await blog.deployed();

  console.log("Blog with 1 ETH deployed to:", blog.address);

  blog.signer.getAddress().then(signerAddress =>
  fs.writeFileSync('./config.js', `
    export const contractAddress = "${blog.address}"
    export const ownerAddress = "${signerAddress}"
  `)
  )

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
