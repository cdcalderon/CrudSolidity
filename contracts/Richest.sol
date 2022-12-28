// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Richest {
    mapping(address => uint256) pendingWithdrawls;
    uint256 mostSent;
    address richest;

    function becomeRichest() external payable returns (bool) {
        if (msg.value <= mostSent) {
            return false;
        }

        pendingWithdrawls[richest] += mostSent;
        richest = msg.sender;
        mostSent = msg.value;
        return true;
    }

    function withdraw() external {
        uint256 amount = pendingWithdrawls[msg.sender];
        pendingWithdrawls[msg.sender] = 0;

        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent);
    }

    function getRichest() public view returns (address) {
        return richest;
    }
}
