const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SplitPayment", function () {
  let crud;
  before(async () => {
    const EtherWallet = await ethers.getContractFactory("SplitPayment");
    crud = await EtherWallet.deploy();
  });

  it("Should create a SplitPayment", async () => {});
});
