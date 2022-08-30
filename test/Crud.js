const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crud", function () {
  let crud;
  before(async () => {
    const Crud = await ethers.getContractFactory("Crud");
    crud = await Crud.deploy();
  });

  it("Should create a new user", async () => {
    await crud.create("Myself");
    const user = await crud.read(1);

    expect(user[0].toNumber() === 1);
    expect(user[1] === "Myself");
  });
});
