// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract EtherWallet {
    function deposit() public payable {}

    function send(address to, uint256 amount) public {
        to.transfer(amount);
    }
}
