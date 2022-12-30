const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Richest", async function () {
  let richest, deployer, acc1, acc2;

  before(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    acc0 = accounts[1];
    acc1 = accounts[2];
    const Richest = await ethers.getContractFactory("Richest");
    richest = await Richest.deploy();
  });

  it("Should create a new user", async () => {
    console.log(await richest.getRichest());
    assert.equal(0, await richest.getRichest());
  });

  it("account0 can become the richest", async () => {
    console.log(acc0);
    await richest
      .connect(acc0)
      .becomeRichest({ from: acc0.address, value: 1e3 });
    const richestAddress = await richest.getRichest();
    assert.equal(acc0.address, richestAddress);
  });

  it("richest address cannot withdraw", async () => {
    const balance = await ethers.provider.getBalance(deployer.address);
    await richest.connect(acc0).withdraw({ from: acc0.address });
    const newBalance = await ethers.provider.getBalance(deployer.address);

    //console.log(balance.toString(), newBalance.toString());
    assert.equal(newBalance.toString(), balance.toString());
  });
});
