// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crud {
    struct User {
        uint256 id;
        string name;
    }
    User[] public users;
    uint256 public nextId = 1;

    function create(string memory name) public {
        users.push(User({id: nextId, name: name}));
        nextId++;
    }

    function read(uint256 id) public view returns (uint256, string memory) {
        uint256 index = find(id);
        return (users[index].id, users[index].name);
    }

    function update(uint256 id, string memory name) public {
        uint256 index = find(id);
        users[index].name = name;
    }

    function remove(uint256 id) public {
        uint256 index = find(id);
        delete users[index];
    }

    function find(uint256 id) internal view returns (uint256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                return i;
            }
        }
        revert("User does not exist!!");
    }
}
