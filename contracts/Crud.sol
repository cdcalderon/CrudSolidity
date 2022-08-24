// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crud {
    struct User {
        uint256 id;
        string name;
    }
    User[] public users;
    uint256 public nextId;

    function create(string memory name) public {
        users.push(User({id: nextId, name: name}));
        nextId++;
    }

    function read(uint256 id) public view returns (uint256, string memory) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                return (users[i].id, users[i].name);
            }
        }
        return (0, "");
    }

    function update(uint256 id, string memory name) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].name = name;
            }
        }
    }
}
