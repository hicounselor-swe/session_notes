// // 1. Reverse a singly Linked List

// // A -> B -> C -> D
// // A <- B <- C <- D

// // class ListNode {
// //   constructor(val) {
// //     this.val = val;
// //     this.next = null;
// //   }
// // }

// const linkedListNodes1 = "ABCD".split("").map((char) => new ListNode(char));
// linkedListNodes1.forEach((node, i, self) => {
//   if (i + 1 === self.length) return;
//   node.next = self[i + 1];
// });
// const root = linkedListNodes1.at(0);

// //    <- A <- B <- C <- D
// //                      ^    ^
// //                     prev curr

// function reverseLinkedList(head) {
//   if (!head) return head;
//   let prev = null;
//   let curr = head;
//   let next = null;
//   while (curr) {
//     next = curr.next;
//     curr.next = prev;

//     prev = curr;
//     curr = next;
//   }
//   return prev;
// }

// console.log(reverseLinkedList(root));
// const reversed = reverseLinkedList(root);
// let curr = reversed;
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

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  #top = null;

  pop() {
    if (this.isEmpty()) throw Error("Stack is empty");
    const popped = this.#top.val;
    this.#top = this.#top.next;
    return popped;
  }

  push(value) {
    const node = new ListNode(value);
    node.next = this.#top;
    this.#top = node;
  }

  peek() {
    return this.#top;
  }

  isEmpty() {
    return this.#top === null;
  }
}

class MaxStack {
  #top = null;
  #maxStack = new Stack();

  pop() {
    if (this.isEmpty()) throw Error("Stack is empty");
    const popped = this.#top.val;
    this.#top = this.#top.next;

    if (this.#maxStack.peek().val === popped) {
      this.#maxStack.pop();
    }

    return popped;
  }

  push(value) {
    const node = new ListNode(value);
    node.next = this.#top;
    this.#top = node;
    if (this.#maxStack.isEmpty() || value >= this.#maxStack.peek().val) {
      this.#maxStack.push(value);
    }
  }

  peek() {
    return this.#top;
  }

  isEmpty() {
    return this.#top === null;
  }

  getMax() {
    // O(1) time | O(1) space
    return this.#maxStack.peek();
  }
}

const stack = new MaxStack();
stack.push(10); // stack is [10], max is 10
// console.log(stack.getMax().val);
stack.push(11); // stack is [10, 11], max is 11
// console.log(stack.getMax().val);
stack.push(6); // stack is [10, 11, 6], max is 11
// console.log(stack.getMax().val);
stack.push(0); // stack is [10, 11, 6, 0], max is 11
// console.log(stack.getMax().val);
stack.pop(); // pops 0, stack is [10, 11, 6], max is 11
// console.log(stack.getMax().val);
stack.pop(); // pops 6, stack is [10, 11], max is 11
// console.log(stack.getMax().val);
stack.pop(); // pops 11, stack is [10], max is 10
// console.log(stack.getMax().val);
stack.pop();

// `Implement a stack using two queues`

// A queue has the following operations:

// `enqueue(value)` aka `add(value)`: adds a value to the end of the queue

// `dequeue()` aka `remove()`: remove the first value in the queue

// `peek()`: return the first in the queue

// `isEmpty()`: return true if the queue is empty

class Queue {
  #first = null;
  #last = null;

  enqueue(value) {
    let newNode = new ListNode(value);
    if (this.isEmpty()) {
      this.#first = newNode;
      this.#last = newNode;
    }

    if (!this.isEmpty()) {
      this.#last.next = newNode;
      this.#last = newNode;
    }
  }

  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is Empty");
    let dequeued = this.#first;
    this.#first = this.#first.next;
    dequeued.next = null;
    return dequeued.val;
  }

  peek() {
    return this.#first;
  }

  isEmpty() {
    return this.#first === null;
  }
}

let queue = new Queue();
let names = ["Foo", "Bar", "Baz", "David"];

for (let n of names) {
  queue.enqueue(n);
}

// console.log(queue.dequeue());
// console.log(queue.peek());

// `Implement a stack using two queues`

// Push operation expensive O(N)
class StackTwoQueues {
  #q1 = null;
  #q2 = null;
  constructor() {
    this.#q1 = new Queue();
    this.#q2 = new Queue();
  }

  push(val) {
    // O(N) time
    this.#q2.enqueue(val);
    while (!this.#q1.isEmpty()) {
      this.#q2.enqueue(this.#q1.dequeue());
    }
    let temp = this.#q1;
    this.#q1 = this.#q2;
    this.#q2 = temp;
  }

  pop() {
    if (this.#q1.isEmpty()) return null;
    return this.#q1.dequeue();
  }

  peek() {
    if (this.#q1.isEmpty()) return null;
    return this.#q1.peek();
  }

  isEmpty() {
    return this.#q1.isEmpty();
  }
}

const myStack = new StackTwoQueues();

myStack.push("Foo");
// console.log(myStack.peek());
myStack.push("Bar");
// console.log(myStack.peek());
myStack.push("Baz");
// console.log(myStack.peek());

/// HOMEWORK
// Given a hashing function below, reverse engineer a hashmap

// function hashFunc(str) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     let letter = str[i];
//     hash = (hash << 5) + letter.charCodeAt(0);
//     hash = hash & hash;
//   }
//   return hash;
// }
