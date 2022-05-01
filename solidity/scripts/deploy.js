async function main() {
    let owner = await ethers.getSigner("0x2546bcd3c84621e976d8185a91a922ae77ecec30");
    const SimpleToken = await ethers.getContractFactory("SimpleToken",owner);
    const simpletoken = await SimpleToken.deploy();
    let provider = ethers.getDefaultProvider();
    console.log(owner.address);
    await simpletoken.deployed();
    console.log("Simple token deployed to:", simpletoken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
