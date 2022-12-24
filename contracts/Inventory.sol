// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Inventory {
    mapping(uint256 => int256) quantities;

    function addItem(uint256 itemId, int256 quantity) public {
        quantities[itemId] += quantity;
    }

    function getQuantity(uint256 itemId) public view returns (int256) {
        return quantities[itemId] != 0 ? int256(quantities[itemId]) : -1;
    }
}
