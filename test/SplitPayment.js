const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SplitPayment", function () {
  let splitPayment, accounts, deployer;

  before(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const SplitPayment = await ethers.getContractFactory("SplitPayment");
    console.log("deployer address: ", deployer.address);
    splitPayment = await SplitPayment.deploy(deployer.address);
  });

  it("Should create a SplitPayment", async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];

    const addresses = [
      accounts[1].address,
      accounts[2].address,
      accounts[3].address,
    ];

    const amounts = [40, 20, 30];
    const initialBalances = await Promise.all(
      recipients.map((recipient) => {
        return recipient.getBalance();
      })
    );

    await splitPayment.connect(deployer).send(addresses, amounts, {
      from: deployer.address,
      value: 90,
    });

    const finalBalances = await Promise.all(
      recipients.map((recipient) => {
        return recipient.getBalance();
      })
    );

    recipients.forEach((_item, i) => {
      const finalBalance = finalBalances[i];
      const initialBalance = initialBalances[i];

      console.log("finalBalance ", finalBalance);
      console.log("initialBalance ", initialBalance);
      console.log("amount ", amounts[i]);
      expect(finalBalance.sub(initialBalance) === amounts[i]);
    });
  });
});
