const accountId = "A12345"; // changed to string for demonstration
let accountEmail = "hitesh@example.com";
let accountPassword = 987654; // changed to number for demonstration
// accountId=2
accountEmail = "omeh@example.com";
accountPassword = 123456;
console.table([{ accountId, accountEmail, accountPassword }]);
/*
dont use var functional scope
use let and const block scope
const value cannot be changed
let value can be changed
*/
