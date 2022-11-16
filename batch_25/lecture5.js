class MinHeap {
  #elements = [];

  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);

  getLeftChild = (i) => this.#elements[this.getLeftChildIdx(i)];
  getRightChild = (i) => this.#elements[this.getRightChildIdx(i)];
  getParent = (i) => this.#elements[this.getParentIdx(i)];

  peek = () => {
    return this.#elements.at(0);
  };

  poll = () => {
    let root = this.#elements.at(0);
    this.#elements[0] = this.#elements.pop();

    this.#heapifyDown();

    return root;
  };

  insert = (val) => {
    this.#elements.push(val);
    this.#heapifyUp();
  };

  #heapifyDown = () => {
    // O(logN) time | O(1) space;
    let idx = 0;
    while (this.getLeftChildIdx(idx) < this.#elements.length) {
      let smallerChildIdx = this.getLeftChildIdx(idx);
      if (
        this.getRightChildIdx(idx) < this.#elements.length &&
        this.getRightChild(idx) < this.getLeftChild(idx)
      ) {
        smallerChildIdx = this.getRightChild(idx);
      }

      if (this.#elements.at(idx) < this.#elements[smallerChildIdx]) {
        break;
      } else {
        [this.#elements[idx], this.#elements[smallerChildIdx]] = [
          this.#elements[smallerChildIdx],
          this.#elements[idx],
        ];
      }
      idx = smallerChildIdx;
    }
  };

  #heapifyUp = () => {
    // O(logN) time | O(1) space
    let idx = this.#elements.length - 1;
    while (
      this.getParentIdx(idx) >= 0 &&
      this.getParent(idx) > this.#elements.at(idx)
    ) {
      const parentIdx = this.getParentIdx(idx);
      [this.#elements[idx], this.#elements[parentIdx]] = [
        this.#elements[parentIdx],
        this.#elements[idx],
      ];
      idx = parentIdx;
    }
  };

  print = () => {
    console.log(this.#elements);
  };
}

// const heap = new MinHeap();
// [8, 12, 7, 6, 18, 9, 2, 3].forEach((n) => heap.insert(n));
// heap.print();
// console.log(heap.poll());
// heap.print();

class MaxHeap {
  #elements = [];

  // helpers
  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  leftChild = (idx) => this.#elements[this.getLeftChildIdx(idx)];
  rightChild = (idx) => this.#elements[this.getRightChildIdx(idx)];
  parent = (idx) => this.#elements[this.getParentIdx(idx)];

  get size() {
    return this.#elements.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  peek = () => {
    if (this.isEmpty) throw Error("No elements in MaxHeap");
    return this.#elements.at(0);
  };

  poll = () => {
    // aka extractMax; O(logN) time | O(1) space
    if (this.isEmpty) throw Error("No elements in MaxHeap");
    let root = this.#elements.at(0);
    let popped = this.#elements.pop();
    // if condition below handles case not to add to array if array length is 0 after popping
    if (this.#elements.length > 0) {
      // take the bottom, rightmost element and add it to the root
      this.#elements[0] = popped;
    }
    this.#heapifyDown(); // bubble down the new root element to maintain heap order
    return root;
  };

  insert = (value) => {
    // O(logN) time | O(1) space
    this.#elements.push(value);
    this.#heapifyUp(); // bubble up the new element to maintain heap order
  };

  #heapifyUp = () => {
    let idx = this.#elements.length - 1;
    while (
      this.getParentIdx(idx) >= 0 &&
      this.parent(idx) < this.#elements[idx]
    ) {
      const parentIdx = this.getParentIdx(idx);
      // swap the parent with the child until each node is smaller than its children
      [this.#elements[idx], this.#elements[parentIdx]] = [
        this.#elements[parentIdx],
        this.#elements[idx],
      ];
      idx = parentIdx;
    }
  };

  #heapifyDown = () => {
    // start off at root element
    let idx = 0;
    // as long as there is a child, keep walking down
    // if there's no left child, then there is definitely no right child)
    while (this.getLeftChildIdx(idx) < this.#elements.length) {
      let biggerChildIdx = this.getLeftChildIdx(idx);
      // if there is a right child and the right child is smaller than the left child
      if (
        this.getRightChildIdx(idx) < this.#elements.length &&
        this.rightChild(idx) > this.leftChild(idx)
      ) {
        biggerChildIdx = this.getRightChildIdx(idx);
      }

      // we are done heapifyDown once parent is bigger than both its children
      if (this.#elements[idx] > this.#elements[biggerChildIdx]) {
        break;
      } else {
        // else swap the parent with the smaller child
        [this.#elements[idx], this.#elements[biggerChildIdx]] = [
          this.#elements[biggerChildIdx],
          this.#elements[idx],
        ];
      }
      idx = biggerChildIdx;
    }
  };
}

class Trie {
  #root = {};

  get print() {
    return JSON.stringify(this.#root, undefined, 2);
  }

  insert(word) {
    if (word.length === 0) return;
    let charNode = this.#root;
    for (let char of word) {
      if (!(char in charNode)) {
        charNode[char] = {};
      }
      charNode = charNode[char];
    }
    charNode["*"] = {};
  }

  search(word) {
    let tree = this.#root;
    for (let char of word) {
      if (!(char in tree)) {
        return false;
      }
      tree = tree[char];
    }
    return "*" in tree;
  }

  startsWith(prefix) {
    let tree = this.#root;
    for (let char of prefix) {
      if (!(char in tree)) {
        return false;
      }
      tree = tree[char];
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("it");
trie.insert("cat");
trie.insert("catnap");
trie.insert("itself");
trie.insert("sand");
console.log(trie.print);
// console.log(trie.search("cat")); // true
// console.log(trie.search("itself")); // true
// console.log(trie.search("its")); // false
// console.log(trie.search("hello")); // false

console.log(trie.startsWith("cat")); // true
console.log(trie.startsWith("itself")); // true
console.log(trie.startsWith("its")); // true
console.log(trie.startsWith("hello")); // false
