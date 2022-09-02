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

  it("Should update a user", async () => {
    await crud.update(1, "Carlos");
    user = await crud.read(1);

    expect(user[0].toNumber() === 1);
    expect(user[1] === "Carlos");
  });

  it("Should NOT update a non-existing user", async () => {
    await expect(crud.update(3, "UpdateMe")).to.be.reverted;
  });

  it("Should destroy a user", async () => {
    crud.destroy(1);
    await expect(crud.read(1)).to.be.reverted;
  });
});
