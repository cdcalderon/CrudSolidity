// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

error Deed__InvalidAmount();

contract Deed {
    address public lawyer;
    address payable public beneficiary;
    uint256 public amount;
    uint256 public earliest;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint256 _amount,
        uint256 _fromNow
    ) payable {
        if (amount != msg.value) {
            revert Deed__InvalidAmount();
        }

        lawyer = _lawyer;
        beneficiary = _beneficiary;
        amount = _amount;
        _fromNow = _fromNow;
    }
}
