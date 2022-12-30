describe("Richest", async () => {
  let richest;
  accounts = await ethers.getSigners();
  const acc0 = accounts[1];
  const acc1 = accounts[2];
  before(async () => {
    const Richest = await ethers.getContractFactory("DebtTracking");
    richest = await Richest.deploy();
  });

  it("should have default richest address as 0 address", async () => {
    assert.equal(0, await instance.getRichest());
  });
});
