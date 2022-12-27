const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("DebtTracking", async () => {
  let debtTracking, addr1, addr2, addr3;
  accounts = await ethers.getSigners();
  addr1 = accounts[0];
  addr2 = accounts[1];
  addr3 = accounts[2];
  beforeEach(async () => {
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

  it("should add debt between addr1 and addr3", async () => {
    await debtTracking.addDebt(addr1.address, addr3.address, 15);
    assert.equal(
      await debtTracking.getDebt(addr1.address, addr3.address),
      15,
      "addr3 should owe addr1 15 ether"
    );
  });

  it("should add more debt between addr1 and addr2", async () => {
    await debtTracking.addDebt(addr1.address, addr2.address, 15);
    assert.equal(
      (await debtTracking.getDebt(addr1.address, addr2.address)).toNumber(),
      25,
      "addr2 should owe addr1 25 ether"
    );
  });

  it("addr3 can pay back addr1", async () => {
    await debtTracking.payDebt(addr1.address, addr3.address, 10);
    assert.equal(
      (await debtTracking.getDebt(addr1.address, addr3.address)).toNumber(),
      5,
      "addr3 should owe addr1 5 ether"
    );
  });

  it("addr3 can pay back addr1 again", async () => {
    await debtTracking.payDebt(addr1.address, addr3.address, 5);
    assert.equal(
      await debtTracking.getDebt(addr1.address, addr3.address),
      0,
      "addr3 should owe addr1 0 ether"
    );
  });

  it("addr2 can pay back addr1 again", async () => {
    await debtTracking.payDebt(addr1.address, addr2.address, 10);
    assert.equal(
      await debtTracking.getDebt(addr1.address, addr2.address),
      15,
      "addr2 should owe addr1 15 ether"
    );
  });
});
