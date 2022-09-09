const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet", function () {
  let crud;
  before(async () => {
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    crud = await EtherWallet.deploy();
  });

  it("Should create a wallet", async () => {});
});
