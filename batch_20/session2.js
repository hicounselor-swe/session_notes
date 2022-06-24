// // 1. Given a Linked List and an integer, determine if the sum of all the values within
// // the nodes is equal to the target number.

// const linkedListNodes2 = "56129128123712"
//   .split("")
//   .map((char) => new ListNode(Number(char)));
// linkedListNodes2.forEach((node, i, self) => {
//   if (i + 1 === self.length) return;
//   node.next = self[i + 1];
// });

// const root2 = linkedListNodes2.at(0);

// // 5 -> 6 -> 1 -> 2

// function doesTargetMatchSumOfLinkedList(listNode, target) {
//   let sum = 0;
//   if (listNode === null) return false;
//   let curr = listNode;
//   while (curr) {
//     sum += curr.val;
//     curr = curr.next;
//   }
//   return sum === target;
// }

// // console.log(doesTargetMatchSumOfLinkedList(root, 14)); // true
// // console.log(doesTargetMatchSumOfLinkedList(root, 99)); // false
// // console.log(doesTargetMatchSumOfLinkedList(null, 0)); // false

// // const expected = "56129128123712"
// //   .split("")
// //   .map((n) => Number(n))
// //   .reduce((a, b) => a + b);
// // console.log(doesTargetMatchSumOfLinkedList(root2, expected));

// // 1. Reverse a singly Linked List

const linkedListNodes1 = "ABBC"
  .split("")
  .map((char) => new ListNode(Number(char)));
linkedListNodes1.forEach((node, i, self) => {
  if (i + 1 === self.length) return;
  node.next = self[i + 1];
});
const root = linkedListNodes1.at(0);

// // null  5 -> 6 -> 1 -> 2 -> null
// //   ^   ^    ^
// // prev curr next

// // next = 6

// // null <-5    6 -> 1 -> 2 -> null
// //   ^    ^    ^
// // prev curr next

// // curr.next = prev

// // null <-5 <- 6    1 -> 2 -> null
// //   ^    ^    ^
// // prev curr next

// // prev = curr;
// // curr = next;

// // next = curr.next;

// // return prev

const reverseLinkedList = (head) => {
  if (!head) return head;
  let prev = null;
  let curr = head;
  let next = curr.next;
  while (curr) {
    next = curr.next;

    curr.next = prev;
    // move sliding window over
    prev = curr;
    curr = next;
  }
  return prev;
};

// let answer = reverseLinkedList(root);
// let curr = answer;
// while (curr) {
//   console.log(curr.val);
//   curr = curr.next;
// }

// Design a stack data structure that has an operation getMax() that returns the highest value integer
// among the values in the stack. The getMax() operation should operate in O(1) time.

// A stack has the following operations:

// `pop()`: removes the top value from the stack - O(1) time | O(1) space

// `push(value)`: adds the value to the top of the stack - O(1) time | O(1) space

// `peek()`: returns the top of the stack - O(1) time | O(1) space

// `isEmpty()`: returns true if the stack is empty - O(1) time | O(1) space

// getMax();

class MaxStack {
  get isEmpty() {
    return this.stack.length === 0;
  }

  constructor() {
    this.stack = [];
    this.maxStack = new Stack();
  }

  pop() {
    let popped = this.stack.pop();
    if (this.maxStack.peek() === popped) {
      this.maxStack.pop();
    }
    return popped;
  }

  push(val) {
    this.stack.push(val);
    if (this.maxStack.peek() <= val || this.maxStack.isEmpty) {
      this.maxStack.push(val);
    }
  }

  peek() {
    return this.stack.at(-1);
  }

  getMax() {
    return this.maxStack.peek();
  }
}

class Stack {
  get isEmpty() {
    return this.stack.length === 0;
  }

  constructor() {
    this.stack = [];
  }

  pop() {
    return this.stack.pop();
  }

  push(val) {
    this.stack.push(val);
  }

  peek() {
    if (this.isEmpty) return null;
    return this.stack.at(-1);
  }
}

// let maxStack = new MaxStack();
// let nums = [5, 9, 11, 22, 22, 22, 22];

// for (let n of nums) {
//   maxStack.push(n);
// }

// // console.log(maxStack.getMax()); // 22

// // outer stack that holds all numbers
// console.log(maxStack.stack);

// // inner stack that stores only the max values
// console.log(maxStack.maxStack);

// console.log(maxStack.getMax()); // 22
// maxStack.pop();
// console.log(maxStack.getMax()); // 22
// maxStack.pop();
// console.log(maxStack.getMax()); // 22
// maxStack.pop();
// console.log(maxStack.getMax()); // 22
// maxStack.pop();
// console.log(maxStack.getMax()); // 11
// maxStack.pop();
// console.log(maxStack.getMax()); // 9
// maxStack.pop();
// console.log(maxStack.getMax()); // 5

// Implement a stack using two queues

// A queue organizes data in a FIFO order. aka a line at a ticket stand.
// A queue can effectively be implemented witha  linkedlist, so long as elements
// are added and removed from opposite sides.

// A queue has the following operations:

// `enqueue(value)` aka `add(value)`: adds a value to the end of the queue

// `dequeue()` aka `remove()`: remove the first value in the queue

// `peek()`: return the first in the queue

// `isEmpty()`: return true if the queue is empty

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  get isEmpty() {
    return this.first === null;
  }

  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(val) {
    const node = new ListNode(val);
    if (this.isEmpty) {
      this.first = node;
      this.last = node;
    }
    this.last.next = node;
    this.last = node;
  }

  dequeue() {
    if (this.isEmpty) {
      return null;
    }
    let dequeued = this.first;
    this.first = this.first.next;
    dequeued.next = null;
    return dequeued;
  }

  peek() {
    return this.first;
  }
}

let queue = new Queue();
let names = ["Foo", "Bar", "Baz", "David"];

for (let n of names) {
  queue.enqueue(n);
}

// console.log(queue.dequeue());
// console.log(queue.peek());

// Push operation expesive O(N)
class StackTwoQueues {
  get isEmpty() {
    return this.q1.isEmpty;
  }
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
  }

  push(val) {
    // O(N) time
    this.q2.enqueue(val);
    while (!this.q1.isEmpty) {
      this.q2.enqueue(this.q1.dequeue());
    }
    let temp = this.q1;
    this.q1 = this.q2;
    this.q2 = temp;
  }

  pop() {
    // O(1)
    if (this.q1.isEmpty) return null;
    return this.q1.dequeue();
  }

  peek() {
    // O(1)
    if (this.q1.isEmpty) return null;
    return this.q1.peek();
  }
}

// Foo Bar Baz

//
//
//          Foo                        Baz
//          Bar                        Bar
//          Baz                        Foo
//   q1      q2                      stack

//           ^ main queue to run methods on

// HashMaps
// Design a hashMap class

// set()

// get()

// delete()

class HashMap {
  constructor() {
    this.capacity = 4;
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => {
        return [];
      });
    this.count = 0;
  }

  set(key, value) {
    // average O(1) time, worst case O(N)
    const hash = myHashFunc(key);
    const index = hash % this.capacity;
    const currentBucket = this.buckets[index];

    let isReplacement = false;
    for (let i = 0; i < currentBucket.length; i++) {
      let [k, v] = currentBucket[i];
      if (k === key) {
        currentBucket[i] = [key, value];
        isReplacement = true;
      }
    }

    if (isReplacement === false) {
      currentBucket.push([key, value]);
      this.count++;
    }

    if (this.count >= this.capacity) {
      this.resize(); // O(N)
    }
  }

  get() {}
  delete() {}

  resize() {
    this.capacity *= 2;
    this.count = 0;
    const newBuckets = Array(this.capacity)
      .fill()
      .map(() => {
        return [];
      });
    const oldBuckets = this.buckets;
    this.buckets = newBuckets;
    for (let bucket of oldBuckets) {
      for (let pairs of bucket) {
        let [key, value] = pairs;
        this.set(key, value);
      }
    }
  }
}

function myHashFunc(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    hash = (hash << 5) + letter.charCodeAt(0);
    hash = hash & hash;
  }
  return hash;
}

let map = new HashMap();
map.set("a", "hello");
map.set("b", "david");
map.set("c", "foo");
map.set("e", "bar");
map.set("d", "baz");
map.set("a", "qux");

console.log(map.buckets);

//  Homework
//  https://leetcode.com/problems/valid-parentheses/

//  Implement a hashmap

//  Implement a queue using two stacks.

