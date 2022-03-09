// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

error SplitPayment__InvalidArguments();
error SplitPayment__OnlyOwner();

contract SplitPayment {
    address public owner;

    modifier onlyOwner() {
        if (msg.sender != owner) revert SplitPayment__OnlyOwner();
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function send(address payable[] memory to, uint256[] memory amount)
        public
        payable
    {
        if (to.length != amount.length) revert SplitPayment__InvalidArguments();
        //require(to.length == amount.length);

        for (uint256 i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]);
        }
    }
}
