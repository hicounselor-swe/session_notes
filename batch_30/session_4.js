/* Recursion is a programming technique where a problem can be divided into subproblems of itself;
a function will call a function of itself over again until it
reaches a base case and returns an output
*/

// Base case: the smallest possible answer that we definitely know
// Iterative step: the case where the function is divided into smaller problems and calls itself

function exponent(base, power) {
  // O(p) time where p is the power | O(p) space where p the power
  if (power === 0) return 1;
  return base * exponent(base, power - 1);
}

// console.log(exponent(2, 3));

// Given a number n, return the nth fibonacci number

// Fibonnacci sequence = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
//                       0  1  2  3  4  5  6  7   8   9  10

// Base case: 0, 1
// Iterative step: ?

function fibs(n) {
  // O(2^n) time | O(n) space
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibs(n - 2) + fibs(n - 1);
}

// console.log(fibs(4)); // => 3
// console.log(fibs(10)); // => 55
// console.log(fibs(9)); // => 34

// Reverse a string recursively

function reverseString(str) {
  // O(n) time where n is length of str | O(n) space where n is length of str
  if (str === "") return "";
  return reverseString(str.slice(1)) + str[0];
}

// console.log(reverseString("hello")); // => "olleh"

// There are N stairs that have to be climbed. A person can climb either 1
// step, 2 steps, or 3 steps at a time. Count the number of ways in which the
// person can climb up N stairs, starting from the bottom.

function tripleStep(n) {
  // O(3^n) time | O(n) space
  if (n < 0) return 0;
  if (n === 0) return 1;
  return tripleStep(n - 3) + tripleStep(n - 2) + tripleStep(n - 1);
}

// console.log(tripleStep(35));

const memo = {};

function fibsMemo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n in memo) {
    return memo[n];
  }
  const answer = fibsMemo(n - 1) + fibsMemo(n - 2);
  memo[n] = answer;
  return answer;
}

const tripleStepMemo = {};
function tripleStepWithMemo(n) {
  // O(n) time | O(n) space
  if (n < 0) return 0;
  if (n === 0) return 1;
  if (n in tripleStepMemo) {
    return tripleStepMemo[n];
  }
  const ans =
    tripleStepWithMemo(n - 3) +
    tripleStepWithMemo(n - 2) +
    tripleStepWithMemo(n - 1);
  tripleStepMemo[n] = ans;
  return ans;
}

// console.log(fibsMemo(67));

// console.log(tripleStepWithMemo(35));
// console.log(tripleStepMemo);

// Dynamic Programming

// memoization -> the act of caching function inputs and outputs so
// that future calls will have constant time access to it
// and save on compute

// tabulation -> the act of storing values "smartly" typically with an array

// nth fibbonaci number?
// [0, 1, 1, 2, 3, 5, 8]
//                 ^

function fibsTab(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  const tabs = [0, 1];
  for (let i = 2; i <= n; i++) {
    const oneBefore = tabs[i - 1];
    const twoBefore = tabs[i - 2];
    tabs.push(twoBefore + oneBefore);
  }
  return tabs.at(-1);
}

// console.log(fibsTab(6));
// console.log(fibsTab(5));

function tripleStepTab(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  const tabs = [1];
  for (let i = 1; i <= n; i++) {
    const oneBefore = tabs[i - 1] ?? 0;
    const twoBefore = tabs[i - 2] ?? 0;
    const threeBefore = tabs[i - 3] ?? 0;
    tabs.push(twoBefore + oneBefore + threeBefore);
  }
  return tabs.at(-1);
}

// console.log(tripleStepTab(4)); // => 7

/*
Given an array of distinct positive integers representing coin
denominations and a single non-negative integer n representing
a target amount of money, write a function that returns the number of ways to make
change for that target amount using the given coin denominations

Note that an unlimited amount of coins is at your disposal

Sample input
n = 6;
denoms = [1,5]

Sample output
2 // 1x1 + 1x5 and 6x1
*/

const numberOfWaysToMakeChange = (n, denoms) => {
  const ways = new Array(n + 1).fill(0);
  ways[0] = 1;
  for (let denom of denoms) {
    for (let amount = 0; amount < ways.length; amount++) {
      if (denom <= amount) {
        ways[amount] = ways[amount] + ways[amount - denom];
      }
    }
  }
  return ways.at(-1);
};

console.log(numberOfWaysToMakeChange(6, [1, 5]));
console.log(numberOfWaysToMakeChange(6, [1, 7]));
