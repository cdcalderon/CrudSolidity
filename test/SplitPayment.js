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
    const addresses = recipients.map((acct) => acct.address);
    const amounts = [40, 20, 30];
    // get initial balances
    const initialBalances = await Promise.all(
      recipients.map((recipient) => {
        return recipient.getBalance();
      })
    );

    await splitPayment.connect(deployer).send(addresses, amounts, {
      from: deployer.address,
      value: 90,
    });

    // get final balances
    const finalBalances = await Promise.all(
      recipients.map((recipient) => {
        return recipient.getBalance();
      })
    );

    recipients.forEach((_item, i) => {
      const finalBalance = finalBalances[i];
      const initialBalance = initialBalances[i];

      // console.log("finalBalance ", finalBalance);
      // console.log("initialBalance ", initialBalance);
      // console.log("amount ", amounts[i]);
      expect(finalBalance.sub(initialBalance) === amounts[i]);
    });
  });

  it("Should not split payment if array length mismatch", async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const addresses = recipients.map((acct) => acct.address);
    const amounts = [40, 20]; // mismatch

    await expect(
      splitPayment.connect(deployer).send(addresses, amounts, {
        from: deployer.address,
        value: 90,
      })
    ).to.be.reverted;
  });

  it("Should not split payment if caller is not owner", async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const addresses = recipients.map((acct) => acct.address);
    const amounts = [40, 20, 30];

    await expect(
      splitPayment.connect(deployer).send(addresses, amounts, {
        from: accounts[5].address,
        value: 90,
      })
    ).to.be.reverted;
  });
});
