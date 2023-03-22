class MinHeap {
  #elements = [];

  // helpers
  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  leftChild = (parentIdx) => this.#elements[this.getLeftChildIdx(parentIdx)];
  rightChild = (parentIdx) => this.#elements[this.getRightChildIdx(parentIdx)];
  parent = (childIdx) => this.#elements[this.getParentIdx(childIdx)];

  // methods

  poll = () => {
    let root = this.#elements[0];
    let popped = this.#elements.pop();
    this.#elements[0] = popped;
    this.#heapifyDown();
    return root;
  };

  insert = (val) => {
    this.#elements.push(val);
    this.#heapifyUp();
  };

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
      idx = smallerChildIdx;
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
}


class Trie {
  #root = {};

  insert(word) {
    // O(n) space & time where n is length of word
    if (word.length === 0) {
      return;
    }

    let currentNode = this.#root;
    for (let char of word) {
      if (!(char in currentNode)) {
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }
    currentNode["*"] = {};
  }

  search(word) {
    // O(n) time | O(1) space where n is length of word
    if (word.length === 0) {
      return false;
    }
    let currentNode = this.#root;
    for (let char of word) {
      if (!(char in currentNode)) {
        return false;
      }
      currentNode = currentNode[char];
    }
    return "*" in currentNode;
  }

  startsWith(prefix) {
    // O(n) time | O(1) space where n is length of word
    if (prefix.length === 0) {
      return true;
    }
    let currentNode = this.#root;
    for (let char of prefix) {
      if (!(char in currentNode)) {
        return false;
      }
      currentNode = currentNode[char];
    }
    return true;
  }

  get root() {
    return this.#root;
  }
}


// Homework

// Heap problems
// - Top K Frequent Words. (https://leetcode.com/problems/top-k-frequent-words/)
// - K Closest Points to Origin. (https://leetcode.com/problems/k-closest-points-to-origin)
// - Write an algorithm `isMinHeap(array)` that checks if a given array represents a MinHeap.
// - Implement a `MedianHeap` class to keep track of the median of a given set of integers. The API should have the following three functions:
//     - `insert(int)` in `O(log n)`
//     - `peekMedian()` in `O(1)`
//     - `deleteMedian()` in `O(log n)`
// - Implement Heapsort. (https://en.wikipedia.org/wiki/Heapsort)

// Trie Problems
// - Simple Regex Searcher. (https://leetcode.com/problems/design-add-and-search-words-data-structure/)
// - Word Search. (https://leetcode.com/problems/word-search-ii/)
// - Magic Dictionary. (https://leetcode.com/problems/implement-magic-dictionary/)
// - Simple Word Break. (https://leetcode.com/problems/word-break/)