const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SplitPayment", function () {
  let splitPayment;
  let accounts;
  let deployer;
  before(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[1];
    const SplitPayment = await ethers.getContractFactory("SplitPayment");

    console.log(deployer.address);

    splitPayment = await SplitPayment.deploy(accounts[1].address);
  });

  it("Should create a SplitPayment", async () => {
    // const recipients = [accounts[1], accounts[2], accounts[3]];
    // const amounts = [40, 20, 30];
    // const initialBalances = await Promise.all(
    //   recipients.map((recipient) => {
    //     return web3.eth.getBalance(recipient);
    //   })
    // );
    // await splitPayments.send(recipients, amounts, {
    //   from: accounts[0],
    //   value: 90,
    // });
    // const finalBalances = await Promise.all(
    //   recipients.map((recipient) => {
    //     return web3.eth.getBalance(recipient);
    //   })
    // );
    // recipients.forEach((_item, i) => {
    //   const finalBalance = web.utils.toBN(finalBalances[i]);
    //   const initialBalance = web.utils.toBN(initialBalances[i]);
    //   expect(finalBalance, sub(initialBalance).toNumber() === amounts[i]);
    // });
  });
});
