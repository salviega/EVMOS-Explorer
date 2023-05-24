// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloEVMOS {
    string public greeter;

    constructor() {
        greeter = "Hello, World!";
    }

    function setMessage(string memory _newGreeter) public {
        greeter = _newGreeter;
    }
}
