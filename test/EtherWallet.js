const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet", function () {
  let deployer;
  let crud;
  before(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[1];
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    crud = await EtherWallet.deploy(deployer.address);
  });

  it("Should create a wallet", async () => {});
});
