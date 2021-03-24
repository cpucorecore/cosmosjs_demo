pragma solidity ^0.5.17;

contract T {
    int256 public sum;
    function PlusOne() public {
        sum = sum + 1;
    }

    function PlusX(int256 x) public {
        sum = sum + x;
    }

    function PlusXY(int256 x, int256 y) public {
        sum = sum + (x + y);
    }

    function PlusArray(int256[] memory ns) public {
        for(uint256 i=0; i<ns.length;i++) {
            sum = sum + ns[i];
        }
    }
}
