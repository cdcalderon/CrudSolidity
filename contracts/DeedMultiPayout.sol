// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

error Deed__InvalidAmount();
error Deed__NotCalledByLawyer(address caller);
error Deed__CalledTooEarly(uint256 calledTime, uint256 earliest);

contract DeedMultiPayout {
    address public lawyer;
    address payable public beneficiary;
    uint256 public earliest;
    uint256 public amount;
    uint256 public constant PAYOUTS = 10;
    uint256 public constant INTERVAL = 10;
    uint256 public paidPayouts;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint256 _fromNow
    ) payable {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = block.timestamp + _fromNow;
        amount = msg.value / PAYOUTS;
    }

    function withdraw() external {
        if (msg.sender != beneficiary) {
            revert Deed__NotCalledByLawyer(msg.sender);
        }

        if (block.timestamp < earliest) {
            revert Deed__CalledTooEarly(block.timestamp, earliest);
        }

        beneficiary.transfer(address(this).balance);
    }
}
