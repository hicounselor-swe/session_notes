// // Complexity Analysis

// // Big O notation - a measure of the WORST possible scenario of an algorithm

// // Time complexity - is the time taken for an algorithm to complete its operation as a
// // function of its data input size

// // Space complexity - is the amount of space required for an algorithm to complete its operation
// // as a function of its data input size

// function loopThings(n) {
//   for (let i = 0; i < n; i++) {
//     console.log(i);
//   }
// }

// // O(n) time
// // O(1) space

// // O(1), O(n), O(n^2), O(n logn), O(logn), O(n!), O(2^n)

// // ```cpp
// // public void searchForValue(int valueToFind, int[] arr, int sizeOfArray) {
// //         for (int it = 0; it < sizeOfArray ; it++) {
// //             if (arr[it] == valueToFind) {
// //                 System.out.println("Success");
// //                 break;
// //             }
// //         }
// //         if (it == sizeOfArray)
// //             System.out.println("Failure");
// //         return;
// // }
// // ```

// // Time Complexity - O(n) where n is the size of array
// // Space Complexity - O(1)

// // ```cpp
// // n == 1000000
// // m == 10
// // for(int i = 0; i < 1000000; i++){
// //     for(int j = 0; j < 10; j++){
// //        Matrix[i][j] = i+j;
// //   }
// // }
// // ```

// // Time Complexity - O(nm) where n is # of iterations in outer loop and
// // m is # of iterations in inner loop
// // Space Complexity - O(1)

// function indexOf(array, element, offset = 0) { // synonym for binary search
//   // split array in half
//   const half = parseInt(array.length / 2);
//   const current = array[half];
//   if (current === element) {
//     return offset + half;
//   } else if (element > current) {
//     const right = array.slice(half);
//     return indexOf(right, element, offset + half);
//   } else {
//     const left = array.slice(0, half);
//     return indexOf(left, element, offset);
//   }
// }

// // Time complexity - O(logN) where N is # of elements in array
// // Space complexity - O(logN) where N is # of elements in array

// //  https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock
and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction.
If you cannot achieve any profit, return 0.


Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.


Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
*/

// notes:
// have a var for storing currentMaxProfit
// return 0 by default. initialize currentMaxProfit as 0

// naive approach:
// for loop over prices
// if price increases, calculate the difference with the prev value & current value

// naive
function maxProfit(prices) {
  let currentMaxProfit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      currentMaxProfit = Math.max(currentMaxProfit, prices[j] - prices[i]);
    }
  }
  return currentMaxProfit;
}

const prices = [7, 1, 5, 3, 6, 4];
// expect maxProfit(prices) to be 5

// console.log(maxProfit(prices));
// O(n^2) time where n is length of prices
// O(1) space

// best approach
function maxProfit(prices) {
  let currentMaxProfit = 0;
  let buy = null;
  let sell = null;
  for (let i = 0; i < prices.length; i++) {
    let currentPrice = prices[i]; // 5
    if (buy === null || currentPrice < buy) {
      buy = currentPrice;
      sell = null;
      continue;
    }
    if (sell === null || currentPrice > sell) {
      sell = currentPrice;
      const localProfit = sell - buy;
      currentMaxProfit = Math.max(currentMaxProfit, localProfit);
    }
  }

  return currentMaxProfit;
}

// O(n) time where n is prices.length
// O(1) space

// LinkedList

// A data structure that consists of nodes that are "linked" together. A linked list, unlike an array,
// can dynamically grow in size and does not depend on the data being saved consecutively in memory.
// Each node within a linked has its own location in memory, meaning that the data with a linked list
// is in non consecutive ordering and the ordering of the data primarily depends on how each node references
// the next

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// let a = new ListNode("A");
// let b = new ListNode("B");

// a.next = b;

// let root = a;

// class LinkedList {
//   head = null;

//   get head() { // O(1)
//     return this.head.val;
//   }

//   insert(val) { // O(n) time where n is length of linkedlist
//     // adds a node to the very end of linked list
//   }

//   find(val) { // O(n) time where n is length of linkedlist
//     // find a node in the linkedlist
//   }

//   remove(val) { // O(n) time where n is length of linkedlist
//     // remove a node in the linkedlist
//   }
// }

// Write an algorithm to check if a LinkedList is corrupted

let a = new ListNode("A");
let b = new ListNode("B");
let c = new ListNode("c");
let d = new ListNode("d");
let e = new ListNode("e");
let f = new ListNode("f");
let g = new ListNode("g");

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;
g.next = c;

let root = a;

function hasCycle(rootNode) {
  let visited = new Set();
  let curr = rootNode;
  while (curr !== null) {
    if (visited.has(curr)) {
      return true;
    }
    visited.add(curr);
    curr = curr.next;
  }
  return false;
}
// O(n) time where n is number of nodes in linkedlist
// O(n) space where n is size of visited set

function hasCycle(rootNode) {
  let slow = rootNode;
  let fast = rootNode;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}

console.log(hasCycle(root)); // true
g.next = null;
console.log(hasCycle(root)); // false

// O(n) time where n is number of nodes in linkedlist
// O(1) space


// 1. Given a Linked List and an integer, determine if the sum of all the values within the nodes is equal to the target number
// 1. Reverse a singly Linked List
// 1. Merge together 2 Linked lists
// 1. Find the Kth Node from the end of the Linked List
// 1. Identify if a Linked List is a Palindrome
// 1. With a Doubly Linked List Remove the kth node from the head
// 1. In Java or C#, create a Linked List that is generic and is not specific to an integer value type.