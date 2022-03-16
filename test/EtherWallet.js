const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet", function () {
  let deployer;
  let etherWallet;
  before(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    etherWallet = await EtherWallet.deploy(deployer.address);
  });

  it("Should set accounts[0] as owner", async () => {
    const owner = await etherWallet.owner();

    expect(owner).to.equal(deployer.address);
  });

  it("Should deposit ether to etherWallet", async () => {
    const sendAmount = 100;
    await etherWallet.connect(deployer).deposit({
      from: deployer.address,
      value: 100,
    });

    const balance = await ethers.provider.getBalance(etherWallet.address);

    expect(balance).to.equal(sendAmount);
  });
});
