const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Richest", async function () {
  let richest, deployer, acc1, acc2;
  const account0DepositAmount = 1e3;
  const account1DepositAmount = 2e7;

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
      .becomeRichest({ from: acc0.address, value: account0DepositAmount });
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

  it("account1 can become richest", async () => {
    await richest
      .connect(acc1)
      .becomeRichest({ from: acc1.address, value: account1DepositAmount });
    const richestAddress = await richest.getRichest();
    assert.equal(acc1.address, richestAddress);
  });

  it("account1 cannot withdraw", async () => {
    const balance = await ethers.provider.getBalance(richest.address);
    await richest.connect(acc1).withdraw({ from: acc1.address });
    const newBalance = await ethers.provider.getBalance(richest.address);
    assert.equal(newBalance.toString(), balance.toString());
  });

  it("account0 can withdraw old richest funds", async () => {
    const balance = await ethers.provider.getBalance(richest.address);
    await richest.connect(acc0).withdraw({ from: acc0.address });
    const newBalance = await ethers.provider.getBalance(richest.address);
    assert.equal(
      newBalance.toString(),
      (balance - account0DepositAmount).toString()
    );
  });
});
