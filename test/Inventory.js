const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Inventory", () => {
  let inventory;
  before(async () => {
    const Inventory = await ethers.getContractFactory("Inventory");
    inventory = await Inventory.deploy();
  });

  it("addItem(1, 10) should add item with id 1, quantity 10", async () => {
    await inventory.addItem(1, 10);
    assert.equal(
      await inventory.getQuantity(1),
      10,
      "quantity for id 1 should be 10"
    );
  });

  it("addItem(1, 10) should add item with id 1, quantity 10", async () => {
    const currentQuantity = await inventory.getQuantity(1);
    assert.equal(currentQuantity, 10);
    await inventory.addItem(1, 10);
    const result = await inventory.getQuantity(1);
    assert.equal(result, 20);
  });

  it("addItem(10, 100) should add item with id 10, quantity 100", async () => {
    await inventory.addItem(10, 100);
    assert.equal(
      await inventory.getQuantity(10),
      100,
      "quantity for id 10 should be 100"
    );
  });

  it("getQuantity should return -1 for non-existent item", async () => {
    assert.equal(
      await inventory.getQuantity(5),
      -1,
      "quantity fro id 5 should be -1"
    );
  });
});
