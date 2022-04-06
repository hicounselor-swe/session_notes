/*
Big O Notation - O(n), O(1), O(logn), O(nlogn) - the worst possible case of complexity

Time complexity - the amount of executions it takes to run an algorithm

Space complexity - the amount of memory it takes to run an algorithm
*/

function indexOf(array, element, offset = 0) {
  // split array in half
  const half = parseInt(array.length / 2);
  const current = array[half];
  if (current === element) {
    console.log("found!");
    return offset + half;
  } else if (element > current) {
    const right = array.slice(half); // n / 2 space
    console.log({ right });
    return indexOf(right, element, offset + half);
  } else {
    const left = array.slice(0, half); // n / 2 space
    console.log({ left });
    return indexOf(left, element, offset);
  }
}

// console.log(indexOf([3, 5, 7, 9, 10, 11, 30, 88], 11));

// indexOf([3, 5, 7, 9, 10, 11, 30, 88], 11);
// indexOf([10, 11, 30, 88], 11);
// indexOf([10, 11], 11);

// Time Complexity - O(log n) - Binary Search. As n increases, increase in (log n) is quite slow. Base is 2 here.
// Space Complexity - O(log n) - Function call stack due to recursion

function exponent(base, power) {
  if (power === 0) return 1;
  return 4 * 2;
}

// console.log(exponent(2, 3));

// Time complexity O(power)
// Space complexity O(power)

// https://leetcode.com/problems/spiral-matrix/

/*
```
Given an m x n matrix, return all elements of the matrix in spiral order.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```
*/

const input2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

// flags right down left and up, cycle through those, keep track of points we visited

// left = 1;
// right = 2;
// top = 1;
// bottom = 2;

// for (let i = left; i < right; i++) {
//   // do something
// }
// left += 1;

// for (let i = top; i < bottom; i++) {
//   // do something
// }
// bottom -= 1;

// for (let i = right; i >= left; i--) {
//   // do something
// }
// right -= 1;

// for (let i = bottom; i >= top; i--) {
//   // do something
// }
// top += 1;

function spiralOrder(matrix) {
  let result = [];
  let rowStart = 0;
  let rowEnd = matrix.length - 1;
  let colBegin = 0;
  let colEnd = matrix[0].length - 1;

  while (rowStart <= rowEnd && colBegin <= colEnd) {
    for (let i = colBegin; i <= colEnd; i++) {
      result.push(matrix[rowStart][i]);
    }
    rowStart++;
    for (let i = rowStart; i <= rowEnd; i++) {
      result.push(matrix[i][colEnd]);
    }
    colEnd -= 1;
    for (let i = colEnd; i >= colBegin; i--) {
      result.push(matrix[rowEnd][i]);
    }
    rowEnd -= 1;
    for (let i = rowEnd; i >= rowStart; i--) {
      result.push(matrix[i][colBegin]);
    }
    colBegin += 1;
  }

  return result;
}

// Time Complexity -> O(n) where n is the number of cells in the matrix // O(l * w)
// Space Complexity -> O(1) space

const input = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// console.log(spiralOrder(input));

// [
//   1, 2, 3, 3, 6,
//   9, 9, 8, 4, 1,
//   5, 5
// ]

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

// Linked Lists

class LinkedNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// class DoublyLinkedNode {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//     this.prev = null;
//   }
// }

// Detect whether or not if a linked list is corrupted. Return true if corrupted, false otherwise.

// slow = B; // A B C D E C D E C D E C D E
// fast = C; // A C E D C E D

const linkedListNodes = "ABCDE".split("").map((char) => new LinkedNode(char));
linkedListNodes.forEach((node, i, self) => {
  if (i + 1 === self.length) return;
  node.next = self[i + 1];
});

const root = linkedListNodes[0];

linkedListNodes.at(-1).next = linkedListNodes.at(-3);
// console.log(root);

function traverse(linkedListNode) {
  let curr = linkedListNode;
  while (curr !== null) {
    console.log(curr.val);
    curr = curr.next;
  }
}

// traverse(root);

function traverseWithSkip(linkedListNode) {
  let curr = linkedListNode;
  while (curr !== null) {
    console.log(curr.val);
    curr = curr?.next?.next;
  }
}

// traverseWithSkip(root);

function checkCorruption(linkedListNode) {
  let slow = null;
  let fast = linkedListNode;
  while (slow !== fast) {
    if (slow === null) {
      slow = linkedListNode;
    }
    if (fast === null || fast.next === null) return false;

    fast = fast.next.next;
    if (slow !== null) {
      slow = slow.next;
    }
  }
  return true;
}

// console.log(checkCorruption(root));

// A   -  B   - C    -   D
//                       |
//                   \   E

const linkedListNodes1 = "ABCDE".split("").map((char) => new LinkedNode(char));
linkedListNodes1.forEach((node, i, self) => {
  if (i + 1 === self.length) return;
  node.next = self[i + 1];
});

const root1 = linkedListNodes1[0];

// console.log(checkCorruption(root1));

// HOMEWORK
// 1. Given a Linked List and an integer, determine if the sum of all the values within
// the nodes is equal to the target number.
// 1. Reverse a singly Linked List
// 1. Merge together 2 linked lists
// 1. Find the Kth Node from the end of the Linked List.
// 1. Identify if a LinkedList is a Palindrome
// 1. With a Doubly Linked List Remove the kth node from the head.
// 1. In Java or C#, create a Linked List that is generic and is not specific to an integer value type.