pragma solidity >=0.8.4;

import "hardhat/console.sol";

// We're using solidity > 0.8, so no need for safemath any more.
/* abstract contract ERC20Interface { */
/*   function totalSupply() public view returns (uint); */
/*   function balanceOf(address tokenOwner) public view returns (uint balance); */
/*   function allowance(address tokenOwner, address spender) public view returns (uint remaining); */
/*   function transfer(address to, uint tokens) public returns (bool success); */
/*   function approve(address spender, uint tokens) public returns (bool success); */
/*   function transferFrom(address from, address to, uint tokens) public returns (bool success); */

/*   event Transfer(address indexed from, address indexed to, uint tokens); */
/*   event Approval(address indexed tokenOwner, address indexed spender, uint tokens); */
/* } */

//Actual token contract
contract SimpleToken {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;

    // Stores balances
    mapping(address => uint) balances;
    // delegate -> address -> allowance
    mapping(address => mapping(address => uint)) allowed;

   event Transfer(address indexed from, address indexed to, uint tokens);
   event Approval(address indexed tokenOwner, address indexed spender, uint tokens);


    constructor() {
      symbol = "STT";
      name = "Simple Token";
      decimals = 2;
      _totalSupply = 1000000;
      balances[msg.sender] = _totalSupply;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
      return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
      require( tokens <= balances[msg.sender] );
      balances[msg.sender] -= tokens;
      balances[to] += tokens;
      emit Transfer(msg.sender, to, tokens);
      return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
      allowed[msg.sender][spender] = tokens;
      emit Approval(msg.sender, spender, tokens );
      return true;
    }

    function allowance(address tokenOwner, address spender) public view returns(uint remaining) {
      return allowed[tokenOwner][spender];
    }

    function transferFrom
        (address from, address to, uint tokens) public returns (bool success) {
      require(tokens <= balances[from]);
      require(tokens <= allowed[from][msg.sender]);
      balances[from] -= tokens;
      allowed[from][msg.sender] -= tokens;
      balances[to] += tokens;
      emit Transfer(from, to, tokens);
      return true;
    }
}
