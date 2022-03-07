// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract SplitPayment {
    function send(address payable[] memory to, uint256[] memory amount)
        public
        payable
    {
        require(to.length == amount.length);

        for (uint256 i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]);
        }
    }
}
