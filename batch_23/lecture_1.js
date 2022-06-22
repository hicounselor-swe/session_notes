// // Complexity Analysis

// // Big O notation - a measure of the WORST possible scenario of an algorithm

// // Time complexity - the time taken for an algorithm to complete its operations
// // as a function of its data input size

// // Space complexity - the amount of space required for an algorithm to complete its operations
// // as a function if its data input size

// function loopThings(n) {
//   // O(n) time where n is the input and O(1) space as we are not using any additional space
//   for (let i = 0; i < n; i++) {
//     console.log(i);
//   }
// }

// // loopThings(10);
// // loopThings(10000);

// // for(int i = 0; i < n; i++){
// //   for(int j = 0; j < m; j++){
// //     Matrix[i][j] = i+j;
// //   }
// // }
// // O(n * m) time
// // O(1) space

// function binarySearch(sortedArray, element, offset = 0) {
//   // split sortedArray in half
//   console.log(JSON.stringify(sortedArray));
//   const half = parseInt(sortedArray.length / 2);
//   const current = sortedArray[half];
//   if (current === element) {
//     return offset + half;
//   } else if (element > current) {
//     const right = sortedArray.slice(half);
//     return binarySearch(right, element, offset + half);
//   } else {
//     const left = sortedArray.slice(0, half);
//     return binarySearch(left, element, offset);
//   }
// }

// binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 1);
// // O(logN) time, where N is the length of the array
// // O(logN) space where logN is the max height of the recursive call stack

// // log2(8) = 3

// ## Problem 1: Best Time to Buy and Sell Stock
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// ```
// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.
// ```

//  [7, 1, 5, 3, 6, 4]
//                    ^

// let buy = 1;
// let sell = 4;
// let max_profit = 5;
// let current_profit = 3;

// function maxProfit(prices) {
//   let buy = null;
//   let sell = null;
//   let maxProfit = 0;
//   let currentProfit = null;
//   for (let price of prices) {
//     // 7
//     if (buy === null || price < buy) {
//       buy = price;
//       sell = null;
//       continue;
//     }
//     if (sell === null || price > sell) {
//       // sell = null
//       sell = price; // sell = 12
//       currentProfit = sell - buy; // 12
//     }
//     if (currentProfit > maxProfit) {
//       maxProfit = currentProfit; // 12
//     }
//   }
//   return maxProfit;
// }

// O(n) time where n is the length of prices
// O(1) space

// Linked Lists

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const a = new ListNode("a");
const b = new ListNode("b");
const c = new ListNode("c");

a.next = b;
b.next = c;

// console.log(a);

const head = a;

// Traversing a linkedlist

function traverseLLRecursive(node) {
  if (node === null) return;
  console.log(node.val);
  traverseLLRecursive(node.next);
}

function traverseLLIterative(node) {
  if (node === null) return;
  let curr = node;
  while (curr) {
    console.log(curr.val);
    curr = curr.next;
  }
}

// traverseLLRecursive(head);
// console.log("---");
// traverseLLIterative(head);

let nodes = [5, 3, 2, 512, 612, 6, 4, 6, 16, 14, 64].map(
  (n) => new ListNode(n)
);
for (let i = 0; i < nodes.length - 1; i++) {
  let curr = nodes[i];
  curr.next = nodes[i + 1];
}

// Given a LinkedList<int> list, sum up all of the values in the list and return it

// class ListNode {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

let headNode = nodes[0];

// console.log(headNode);

//  5 -> 3 -> 2 -> 512 -> 612 -> 6 -> 4 -> 6 -> 16 -> 14 -> 64 -> null
//  ^
// head

function sumLinkedList(node) {
  let sum = 0;
  if (node === null) return 0;
  let curr = node;
  while (curr) {
    sum += curr.val;
    curr = curr.next;
  }
  return sum;
}

// console.log(sumLinkedList(headNode));

let input2 = [1, 2, 3].map((n) => new ListNode(n));
for (let i = 0; i < input2.length - 1; i++) {
  let curr = input2[i];
  curr.next = input2[i + 1];
}

let head2 = input2[0];

// console.log(sumLinkedList(head2));

// Write a function that checks if a Linked List is corrupted

//   Z -> A ->  B   -> C
//              ^      |
//              |      v
//              E   <- D

// Z A B C D E B C D E B C D E B C D E B C D E B C D E B

// turtle = Z A B C D
// rabbit = Z B D B D

function checkLinkedListCycle(linkedList) {
  // O(n) time | O(1) space
  if (linkedList === null) {
    return false;
  }
  let turtle = linkedList;
  let rabbit = linkedList;
  while (rabbit.next && rabbit.next.next) {
    turtle = turtle.next;
    rabbit = rabbit.next.next;
    console.log({ turtle: turtle.val, rabbit: rabbit.val });
    if (turtle === rabbit) {
      return true;
    }
  }
  return false;
}

let example = "ZABCDE".split("").map((n) => new ListNode(n));
for (let i = 0; i < example.length - 1; i++) {
  let curr = example[i];
  curr.next = example[i + 1];
}
let input = example[0];
example[5].next = example[2];

// traverseLLIterative(input);

// console.log(checkLinkedListCycle(input));
// console.log(checkLinkedListCycle(headNode));

// HOME WORK
// 1. Reverse a singly Linked List
// 1. Merge together 2 Linked lists
// 1. Find the Kth Node from the end of the Linked List
// 1. Identify if a Linked List is a Palindrome
