class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  // # is the character in js to denote this is a private variable
  #top = null;

  pop() {
    // O(1) time | O(1) space
    if (this.#top === null) throw Error("Stack is empty");
    const item = this.#top.val;
    this.#top = this.#top.next;
    return item;
  }

  push(val) {
    // O(1) time | O(1) space
    const node = new ListNode(val);
    node.next = this.#top;
    this.#top = node;
  }

  peek() {
    // O(1) time | O(1) space
    if (this.#top === null) throw Error("Stack is empty");
    return this.#top.val;
  }

  isEmpty() {
    // O(1) time | O(1) space
    return this.#top === null;
  }
}

class MaxStack {
  // # is the character in js to denote this is a private variable
  #top = null;
  #maxStack = new Stack();

  getMax() {
    // O(1) time | O(1) space
    return this.#maxStack.peek();
  }

  pop() {
    // O(1) time | O(1) space
    if (this.#top === null) throw Error("Stack is empty");
    const item = this.#top.val;
    this.#top = this.#top.next;
    if (this.#maxStack.peek() === item) {
      this.#maxStack.pop();
    }
    return item;
  }

  push(val) {
    // O(1) time | O(1) space
    const node = new ListNode(val);
    node.next = this.#top;
    this.#top = node;

    if (this.#maxStack.isEmpty() || val > this.#maxStack.peek()) {
      this.#maxStack.push(val);
    }
  }

  peek() {
    // O(1) time | O(1) space
    if (this.#top === null) throw Error("Stack is empty");
    return this.#top.val;
  }

  isEmpty() {
    // O(1) time | O(1) space
    return this.#top === null;
  }
}

let maxStack = new MaxStack();
[5, 13, 27, 9, 3, 0, 33, 3].forEach((n) => maxStack.push(n));

// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());
// maxStack.pop();
// console.log(maxStack.getMax());

//HW

// Implement a data structure that is composed of several stacks and takes
// in a int capacity upon construction. When a stack exceeds the capacity,
// the data structure should create a new stack. The push, pop, peek,
// isEmpty operations should behave exactly the same as a stack. As a bonus,
// add a popAt(index) operation which performs a pop on a specific stack based
// on the index.

// Implement a queue using two stacks.

// hashmap

function hashFunc(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    hash = (hash << 5) + letter.charCodeAt(0);
    hash = hash & hash;
  }
  return hash;
}

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

  set(key, val) {
    const hash = hashFunc(key);
    const index = hash % this.capacity;
    let currentBucket = this.buckets[index];
    for (let el of currentBucket) {
      if (el[0] === key) {
        el[1] = val;
        return;
      }
    }
    currentBucket.push([key, val]);
    this.count++;

    if (this.count >= this.capacity) {
      this.resize();
    }
  }

  resize() {
    this.capacity *= 2;
    this.count = 0;
    const newBuckets = Array(this.capacity)
      .fill()
      .map(() => {
        return [];
      });
    let oldBuckets = this.buckets;
    this.buckets = newBuckets;
    for (let bucket of oldBuckets) {
      for (let el of bucket) {
        this.set(el[0], el[1]);
      }
    }
  }

  get(key) {
    const hash = hashFunc(key);
    const index = hash % this.capacity;
    const bucket = this.buckets[index];
    for (let el of bucket) {
      if (el[0] === key) {
        return el[1];
      }
    }
  }

  delete(key) {
    const hash = hashFunc(key);
    const index = hash % this.capacity;
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      let el = bucket[i];
      if (el[0] === key) {
        this.buckets[index] = [...bucket.slice(0, i), ...bucket.slice(i + 1)];
        this.count--;
        return;
      }
    }
  }
}

const map = new HashMap();
