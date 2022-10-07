// // Recursion is a method where the solution to a problem depends on solutions to smaller instances
// //of the same problem. A method can call itself in order to solve the problem.

// // Base case - the case the for which the solution is guaranteed to the answer

// // Recursive step - The case of which the solution is expressed in terms of the smaller version of itself

// // 1! = 1

// // 5! = 5 * 4 * 3 * 2 * 1
// // 4! = 4 * 3 * 2 * 1

// // 5! = 5 * 4!
// // 4! = 4 * 3!

// // 3! = 3 * 2 * 1

// // 1! = 1 * 0!
// // 0! = 1

// // n! = n * (n-1)!

// function factorial(n) {
//   // O(n) time complexity | O(n) space complexity
//   if (n === 0) return 1; // base case
//   return n * factorial(n - 1);
// }

// // console.log([5, 4, 3, 2, 1, 0].map(factorial));

// // Fibonacci Sequence
// /*
// A sequence where every number in the series is the sum of the previous two numbers except the first two numbers.
// The first and second number in the sequence is given as 0, 1.
// */

// // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// function fibs(n) {
//   // O(2^n) time complexity || O(n) space complexity
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   return fibs(n - 1) + fibs(n - 2);
// }

// // 8 = 5 + 3
// // 5 = 3 + 2
// // 3 = 2 + 1
// // 2 = 1 + 1
// // 1 = 1 + 0
// // 1 = 1 // base
// // 0 = 0 // base

// // fibs(n) = fibs(n - 1) + fibs(n - 2)

// // console.log(fibs(4)); // 3
// // console.log(fibs(5)); // 5
// // console.log(fibs(6)); // 8

// // There are N stairs that have to be climbed. A person can climb
// // either 1 step, 2 steps, or 3 steps at a time.
// // Count the number of ways in which the person can climb up
// // the N stairs, starting from the bottom.
// // If N is 0, then there is only 1 way to climb up those stairs.'

// function fibs(n) {
//   // O(2^n) time complexity | O(n) space complexity
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   return fibs(n - 1) + fibs(n - 2);
// }

// function tripleStep(n) {
//   // O(3^n) time complexity | O(n) space complexity
//   if (n < 0) return 0;
//   if (n === 0) return 1;
//   return tripleStep(n - 1) + tripleStep(n - 2) + tripleStep(n - 3);
// }

// // console.log(tripleStep(4));
// // console.log(tripleStep(3));
// // console.log(tripleStep(2));

// // Given a binary tree, return the
// // maximum height of the tree

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = this.right = null;
//   }
// }

// function getHeight(node) {
//   if (node == null) return 0;
//   return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
// }

// //    3
// //   /  \
// //  2   4
// // /     \
// // 1     66
// //      / \
// //     55  11
// //    / \   \
// //   9  10  42

// function getHeightV2(node, height = 0) {
//   if (node === null) return height;
//   return Math.max(
//     getHeightV2(node.left, height + 1),
//     getHeightV2(node.right, height + 1)
//   );
// }

// // Both solutions: O(n) time complexity | O(n) space complexity

// const one = new Node(1);
// const two = new Node(2);
// const three = new Node(3);
// const four = new Node(4);

// let root = three;
// root.left = two;
// root.right = four;
// root.left.left = one;
// root.right.right = new Node(66);
// root.right.right.left = new Node(55);
// root.right.right.right = new Node(11);
// root.right.right.left.left = new Node(9);
// root.right.right.left.right = new Node(10);
// root.right.right.right.right = new Node(42);

// console.log(getHeightV2(root)); // 5

// Dynamic Programming

/*
Dynamic Programming (DP) is a method of solving a bigger problem
 by breaking it down into smaller subproblems (similar to recursion).
There are a 2 techniques that we will talk about in
this session: <b>Memoization</b> and <b>Tabulation</b>
*/

// Memoization

function fibs(n) {
  // O(2^n) time complexity | O(n) space complexity
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibs(n - 1) + fibs(n - 2);
}

function fibsMemo(n, memo = {}) {
  // O(n) time | O(n) space complexity
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n in memo) return memo[n];
  let answer = fibsMemo(n - 1, memo) + fibsMemo(n - 2, memo);
  memo[n] = answer;
  return answer;
}

// console.log(fibsMemo(45));

// Tabulation

// [0, 1, 1, 2, 3, 5, 8]

function fibsTab(n) {
  // O(n) time complexity | O(n) space
  if (n === 0) return 0;
  if (n === 1) return 1;
  let tab = [0, 1];
  for (let i = 2; i <= n; i++) {
    let oneBefore = tab[i - 1];
    let twoBefore = tab[i - 2];
    tab.push(oneBefore + twoBefore);
  }
  return tab[tab.length - 1];
}

// console.log(fibsTab(45));

/*
Given an array of distinct positive integers representing coin denominations
and a single non-negative integer n representing
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
    for (let amount = 0; amount < ways.length; amount += 1) {
      if (denom <= amount) {
        ways[amount] = ways[amount] + ways[amount - denom];
      }
    }
  }
  return ways[ways.length - 1];
};

console.log(numberOfWaysToMakeChange(6, [1, 5])); // 2
console.log(numberOfWaysToMakeChange(124, [1, 5, 10, 25])); // 382
console.log(numberOfWaysToMakeChange(10, [1, 5, 10, 25])); // 4
