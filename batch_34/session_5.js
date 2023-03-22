// Suppose you are given this problem:
// https://leetcode.com/problems/last-stone-weight/

// ```
// You are given an array of integers stones where stones[i] is the weight of the ith stone.

// We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the smallest possible weight of the left stone. If there are no stones left, return 0.

class MinHeap {
  #elements = [];

  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  leftChild = (idx) => this.#elements[this.getLeftChildIdx(idx)];
  rightChild = (idx) => this.#elements[this.getRightChildIdx(idx)];
  parent = (idx) => this.#elements[this.getParentIdx(idx)];

  poll() {
    // O(log N) time | O(1) space
    const root = this.#elements[0];
    const last = this.#elements.pop();
    if (this.#elements.length === 0) {
      return root;
    }
    this.#elements[0] = last;

    this.#heapifyDown();
    return root;
  }

  insert(val) {
    // O(log N) time | O(1) space
    this.#elements.push(val);
    this.#heapifyUp();
  }

  #heapifyDown = () => {
    let idx = 0;

    while (this.getLeftChildIdx(idx) < this.#elements.length) {
      let smallerChildIdx = this.getLeftChildIdx(idx);
      if (
        this.getRightChildIdx(idx) < this.#elements.length &&
        this.rightChild(idx) < this.leftChild(idx)
      ) {
        smallerChildIdx = this.getRightChildIdx(idx);
      }

      if (this.#elements[idx] < this.#elements[smallerChildIdx]) {
        break;
      } else {
        [this.#elements[idx], this.#elements[smallerChildIdx]] = [
          this.#elements[smallerChildIdx],
          this.#elements[idx],
        ];
      }
    }
  };

  #heapifyUp = () => {
    let idx = this.#elements.length - 1;
    while (
      this.getParentIdx(idx) >= 0 &&
      this.parent(idx) > this.#elements[idx]
    ) {
      const parentIdx = this.getParentIdx(idx);
      [this.#elements[idx], this.#elements[parentIdx]] = [
        this.#elements[parentIdx],
        this.#elements[idx],
      ];
      idx = parentIdx;
    }
  };

  printElements = () => {
    console.log(this.#elements);
  };
}

const nums = [8, 36, 3, 49, 77, 89];

const myHeap = new MinHeap();
for (let num of nums) {
  myHeap.insert(num);
}

// myHeap.insert(2);

// myHeap.poll(); // 2
// myHeap.printElements();
// myHeap.poll(); // 3
// myHeap.printElements();
// myHeap.poll(); // 8
// myHeap.printElements();
// myHeap.poll(); // 36
// myHeap.printElements();
// myHeap.poll(); // 49
// myHeap.printElements();
// myHeap.poll(); // 77
// myHeap.printElements();
// myHeap.poll(); // 89
// myHeap.printElements();
// myHeap.poll(); // 89
// myHeap.printElements();

class Trie {
  #root = {};

  print = () => {
    console.log(JSON.stringify(this.#root, undefined, 2));
  };

  insert = (word) => {
    // O(n) time | O(n) space where n is length of word
    if (word.length === 0) return;
    let currentCharNode = this.#root;
    for (let char of word) {
      if (!(char in currentCharNode)) {
        currentCharNode[char] = {};
      }
      currentCharNode = currentCharNode[char];
    }
    currentCharNode.isEnd = true;
  };

  search = (word) => {
    if (word.length === 0) return true;
    let currentCharNode = this.#root;
    for (let char of word) {
      if (!(char in currentCharNode)) {
        return false;
      }
      currentCharNode = currentCharNode[char];
    }
    return !!currentCharNode.isEnd;
  };

  startsWith = (prefix) => {
    if (prefix.length === 0) return true;
    let currentCharNode = this.#root;
    for (let char of prefix) {
      if (!(char in currentCharNode)) {
        return false;
      }
      currentCharNode = currentCharNode[char];
    }
    return true;
  };
}

const trie = new Trie();
trie.insert("dog");
trie.insert("dogma");
trie.insert("sand");
trie.insert("sandman");

trie.print();
// console.log(trie.search("dog"));
// console.log(trie.search("dogm"));
// console.log(trie.search("dogma"));
console.log(trie.search("go"));

console.log(trie.startsWith("dog"));
console.log(trie.startsWith("dogm"));
console.log(trie.startsWith("dogma"));

console.log(trie.startsWith("go"));
