const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("DebtTracking", () => {
  let debtTracking, addr1, addr2, addr3;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    addr1 = accounts[0];
    addr2 = accounts[1];
    addr3 = accounts[2];

    const DebtTracking = await ethers.getContractFactory("DebtTracking");
    debtTracking = await DebtTracking.deploy();
  });

  it("should add debt between addr1 and addr2", async () => {
    let debtAmount = 10;
    console.log("addr1.address ", addr1.address);
    console.log("addr2.address ", addr2.address);
    debtTracking.addDebt(addr1.address, addr2.address, debtAmount);
    let currentDebt = await debtTracking.getDebt(addr1.address, addr2.address);
    console.log(currentDebt);
    assert.equal(currentDebt, debtAmount);
  });
});
