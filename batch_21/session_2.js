// `
// Design a stack data structure that has an operation getMax()
//  that returns the highest value integer among the values in the stack.
//   The getMax() operation should operate in O(1) time.
// `

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
    if (this.#top === null) throw Error("stack is empty");
    const item = this.#top.val;
    this.#top = this.#top.next;
    return item;
  }

  push(val) {
    const node = new ListNode(val);
    node.next = this.#top;
    this.#top = node;
  }

  peek() {
    if (this.#top === null) throw Error("stack is empty");
    return this.#top.val;
  }

  isEmpty() {
    return this.#top === null;
  }
}

class MaxStack {
  #top = null;
  #maxStack = new Stack();

  pop() {
    if (this.#top === null) throw Error("stack is empty");
    const item = this.#top.val;
    this.#top = this.#top.next;

    if (this.#maxStack.peek() === item) {
      this.#maxStack.pop();
    }
    return item;
  }

  push(val) {
    const node = new ListNode(val);
    node.next = this.#top;
    this.#top = node;

    if (this.#maxStack.isEmpty() || val >= this.#maxStack.peek()) {
      this.#maxStack.push(val);
    }
  }

  peek() {
    if (this.#top === null) throw Error("stack is empty");
    return this.#top.val;
  }

  isEmpty() {
    return this.#top === null;
  }

  getMax() {
    // O(1) time
    return this.#maxStack.peek(); // O(1) time
  }
}

let nums = [5, 3, 12, 9, 42, 22, 1, 0];

let maxStack = new MaxStack();

for (let n of nums) {
  maxStack.push(n);
  const topValueOfMainStack = maxStack.peek();
  const topValueOfMaxStack = maxStack.getMax();
  // console.log({ topValueOfMainStack, topValueOfMaxStack });
}

for (let i = 0; i < 5; i++) {
  const topValueOfMainStack = maxStack.pop();
  const topValueOfMaxStack = maxStack.getMax();
  // console.log({ topValueOfMainStack, topValueOfMaxStack });
}

/// Queue

// A queue has the following operations:

// `enqueue(value)` aka `add(value)`: adds a value to the end of the queue

// `dequeue()` aka `remove()`: remove the first value in the queue

// `peek()`: return the first in the queue

// `isEmpty()`: return true if the queue is empty

class Queue {
  #first = null;
  #last = null;

  enqueue(val) {
    let node = new ListNode(val);
    if (this.#last !== null) {
      this.#last.next = node;
    }
    this.#last = node;
    if (this.isEmpty()) {
      this.#first = this.#last;
    }
  }

  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is Empty");
    let takenOut = this.#first;
    this.#first = this.#first.next;
    if (this.#first === null) {
      this.#last = null;
    }
    return takenOut.val;
  }

  isEmpty() {
    return this.#first === null;
  }

  peek() {
    if (this.isEmpty()) throw new Error("Queue is Empty");
    return this.#first.val;
  }
}

let people = ["SB", "KA", "DC", "LD", "BL", "JP", "NN", "JM"];
let queue = new Queue();
for (let peep of people) {
  queue.enqueue(peep);
}

// console.log(queue.peek());
// queue.dequeue();
// console.log(queue.peek());
// queue.dequeue();
// console.log(queue.peek());
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// console.log(queue.peek());
// queue.dequeue();
// queue.dequeue();
// console.log(queue.peek());

// `Implement a stack using two queues`

// `pop()`: removes the top value from the stack

// `push(value)`: adds the value to the top of the stack

// `peek()`: returns the top of the stack

// `isEmpty()`: returns true if the stack is empty

class StackTwoQueues {
  #q1 = new Queue(); // 'main' queue
  #q2 = new Queue(); // 'empty' queue

  push(val) {
    // O(n) time
    this.#q2.enqueue(val);
    while (!this.#q1.isEmpty()) {
      this.#q2.enqueue(this.#q1.dequeue());
    }
    // let temp = this.#q1;
    // this.#q1 = this.#q2;
    // this.#q2 = temp;
    [this.#q1, this.#q2] = [this.#q2, this.#q1];
  }

  pop() {
    // O(1) time
    if (this.#q1.isEmpty()) throw new Error("Stack is Empty");
    return this.#q1.dequeue();
  }

  peek() {
    if (this.#q1.isEmpty()) throw new Error("Stack is Empty");
    return this.#q1.peek();
  }

  isEmpty() {
    return this.#q1.isEmpty();
  }
}

let inputs = [5, 3, 12, 9, 42, 22, 1, 0];

let twoQueues = new StackTwoQueues();

for (let n of inputs) {
  twoQueues.push(n);
  const topValue = twoQueues.peek();
  console.log({ topValue });
}

for (let i = 0; i < 5; i++) {
  const topValue = twoQueues.pop();
  console.log({ topValue });
}

// Hashmap

// Implement a hashmap

function hashFunc(str, capacity) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    hash = (hash << 5) + letter.charCodeAt(0);
    hash = (hash & hash) % capacity;
  }
  return hash;
}
