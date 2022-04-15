// Intro to recursion

// We are solving smaller subproblems in order to
// solve the bigger problem

// We have identify 2 conditions:
// 1. base case -> the case where we absolutely know what the answer is
// 2. recursive step -> the pattern that can be used to cover rest of all subproblems

function power(base, expo) {
  // base case
  if (expo === 0) return 1;

  // recursive step
  return power(base, expo - 1) * base;
}

// console.log(power(2, 3)); //8
// O(expo) time
// O(expo) space

// Fibonacci Sequence:
// A sequence where every number in the series is the sum of the previous two numbers except the first two numbers.
// The first and second number in the sequence is given as 0, 1.

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// Write a function that takes in a number n and returns the nth fibonnaci sequence
function fibs(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibs(n - 1) + fibs(n - 2);
}

// console.log(fibs(2)); // 1
// console.log(fibs(3)); // 2
// console.log(fibs(4)); // 3
// console.log(fibs(5)); // 5
// console.log(fibs(8)); // 21
// console.log(fibs(45));

// O(2^n) time
// O(n) space

// Memoization -> a dp technique that saves computed answers

function fibsWithMemo(n, memo = {}) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n in memo) {
    return memo[n];
  }
  let answer = fibsWithMemo(n - 1, memo) + fibsWithMemo(n - 2, memo);
  memo[n] = answer;
  return answer;
}

// console.log(fibsWithMemo(45));

// DP

// memoization -> we just did this
// tabulation -> we use an array/hashmap to perform a bottoms up approach to solve smaller sub problems to get to our larger problem

function pow(base, power) {
  let tab = Array(power + 1);
  tab[0] = 1;
  for (let i = 1; i < tab.length; i++) {
    tab[i] = tab[i - 1] * base;
  }
  return tab.at(-1);
}

// pow(2,3)

// [1,2,4,8]
//        ^

/*
Given an array of distinct positive integers representing coin denominations and a single non-negative integer n representing
a target amount of money, write a function that returns the number of ways to make
change for that target amount using the given coin denominations

Note that an unlimited amount of coins is at your disposal

Sample input
n = 6;
denoms = [1,5]

Sample output
2 // 1x1 + 1x5 and 6x1
*/

// base case = n === 0, then answer is 1

// tab = [1,1,1,1,1,1,1]
//        0 1 2 3 4 5 6

// when denoms[0]  (aka 1)
// tab = [1,1,1,1,1,1,1]

// when denoms[1] (aka 5)
// tab = [1,1,1,1,1,2,2];
//        0 1 2 3 4 5 6

// const arr = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 4];
//              0  1  2  3  4  5  6  7  8  9 10

function numberOfWaysToMakeChange(n, denoms) {
  const tabs = new Array(n + 1).fill(0);
  tabs[0] = 1;
  for (let denom of denoms) {
    console.log("--------");
    console.log({ denom });
    for (let i = denom; i < tabs.length; i++) {
      if (denom <= i) {
        let prior = tabs[i - denom];
        tabs[i] += prior;
        console.log(tabs);
      }
    }
  }
  return tabs.at(-1);
}

// console.log(numberOfWaysToMakeChange(6, [1, 5])); // 2
console.log(numberOfWaysToMakeChange(10, [1, 5, 10, 25])); // 4

// O(dn) where d === denom.length and n is n
// O(n) bc of tabs size
