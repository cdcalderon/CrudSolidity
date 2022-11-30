// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

error DeedMultiPayout__InvalidAmount();
error DeedMultiPayout__NotCalledByLawyer(address caller);
error DeedMultiPayout__CalledTooEarly(uint256 calledTime, uint256 earliest);
error DeedMultiPayout__InvalidPayouts();

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
            revert DeedMultiPayout__NotCalledByLawyer(msg.sender);
        }

        if (block.timestamp < earliest) {
            revert DeedMultiPayout__CalledTooEarly(block.timestamp, earliest);
        }

        if (paidPayouts >= PAYOUTS) {
            revert DeedMultiPayout__InvalidPayouts();
        }

        uint256 elligiblePayouts = (block.timestamp - earliest) / INTERVAL;
        uint256 duePayouts = elligiblePayouts - paidPayouts;
        duePayouts = duePayouts + paidPayouts <= PAYOUTS
            ? PAYOUTS - paidPayouts
            : duePayouts;
        paidPayouts += duePayouts;
        beneficiary.transfer(duePayouts * amount);
    }
}
