// // https://github.com/hicounselor-swe/session_notes

// // Complexity Analysis

// // Time complexity - is the time taken for an algorithm to complete its operation as a function of its data input size
// // Space complexity - the amount of space required for an algorithm to complete its operation as a function its data input size

// // O(1), O(n), O(n^2), O(n logn), etc.

// // Big O Notation - a measure of the WORST possible scenario of an algorithm

// // https://miro.medium.com/max/1200/1*5ZLci3SuR0zM_QlZOADv8Q.jpeg

// ```cpp
// public void searchForValue(int valueToFind, int[] arr, int sizeOfArray) {
//         for (int it = 0; it < sizeOfArray ; it++) {
//             if (arr[it] == valueToFind) {
//                 System.out.println("Success");
//                 break;
//             }
//         }
//         if (it == sizeOfArray)
//             System.out.println("Failure");
//         return;
// }
// ```

// // Time Complexity - O(n) where n is the size of the array
// // Space Complexity - O(1)

// ```cpp
// for(int i = 0; i < n; i++){
//     for(int j = 0; j < m; j++){
//        Matrix[i][j] = i+j;
//   }
// }
// ```
// // Time complexity O(nm)
// // Space complexity O(1)

// ```cpp
// function indexOf(array, element, offset = 0) {
//  // split array in half
//  const half = parseInt(array.length / 2);
//  const current = array[half];
//  if(current === element) {
//    return offset + half;
//  } else if(element > current) {
//    const right = array.slice(half);
//    return indexOf(right, element, offset + half);
//  } else {
//    const left = array.slice(0, half)
//    return indexOf(left, element, offset);
//  }
// }
// ```

// // Binary search
// // Time Complexity - O(logN) where N is the length of the array
// // Space Complexity - O(logN)

//  https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

// Linked List

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// const A = new ListNode('A');
// const C = new ListNode('C');
// const J = new ListNode('J');
// const S = new ListNode('S');
// const T = new ListNode('T');
// const Z = new ListNode('Z');

// A.next = C
// C.next = J
// J.next = S
// S.next = T
// T.next = Z

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(val) {
    const node = new ListNode(val);
    if (this.head === null) {
      this.head = node;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = node;
  }
}

let myLinkedList = new LinkedList();

myLinkedList.insert("A");
console.log(myLinkedList.head);
myLinkedList.insert("B");
console.log(myLinkedList.head);

// Given a linked list, determine if the linked list is corrupted



// Homework:
// - https://leetcode.com/problems/spiral-matrix/
