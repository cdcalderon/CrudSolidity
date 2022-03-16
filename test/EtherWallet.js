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
  // it("Should create a wallet", async () => {
  //   const sendAmount = 1;
  // await etherWallet.connect(deployer).send(accounts[1].address, );
  // });
});
