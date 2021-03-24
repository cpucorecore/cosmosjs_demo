pragma solidity ^0.5.17;

contract T {
    address public admin;
    mapping(address=>uint256) public amounts;

    constructor(address _admin) public {
        admin = _admin;
        amounts[admin] = 1000000000000000000000;
    }

    function transfer(address to, uint256 amount) public {
        require(amounts[msg.sender] >= amount, "");
        amounts[msg.sender] -= amount;
        amounts[to] += amount;
    }

    function grant(address to, uint256 amount) public {
        require(msg.sender == admin, "must admin");
        require(amounts[msg.sender] >= amount, "");
        amounts[msg.sender] -= amount;
        amounts[to] += amount;
    }
}
