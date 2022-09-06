// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract EtherWallet {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function deposit() public payable {}

    function send(address payable to, uint256 amount) public {
        to.transfer(amount);
    }
}
