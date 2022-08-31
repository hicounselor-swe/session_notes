class MinHeap {
  #elements = [];

  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  leftChild = (childIdx) => this.#elements[this.getLeftChildIdx(childIdx)];
  rightChild = (childIdx) => this.#elements[this.getRightChildIdx(childIdx)];
  parent = (childIdx) => this.#elements[this.getParentIdx(childIdx)];

  peek = () => {
    if (this.#elements.length === 0) throw Error("No elements in MinHeap");
    return this.#elements[0];
  };

  poll = () => {
    // aka ExtractMin; O(logN) time | O(1) space
    if (this.#elements.length === 0) throw Error("No elements in MinHeap");
    let extracted = this.#elements[0];
    let popped = this.#elements.pop();
    this.#elements[0] = popped;
    this.#heapifyDown();

    return extracted;
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
      if (this.#elements[idx] > this.#elements[smallerChildIdx]) {
        [this.#elements[idx], this.#elements[smallerChildIdx]] = [
          this.#elements[smallerChildIdx],
          this.#elements[idx],
        ];
      } else {
        break;
      }
      idx = smallerChildIdx;
    }
  };

  insert = (value) => {
    this.#elements.push(value);
    this.#heapifyUp();
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

  get diagnostics() {
    return this.#elements;
  }
}

// const stuffToHeap = [3, 4, 5, 5, 12, 8, 18, 9, 8].reverse();
// const heap = new MinHeap();
// for (let num of stuffToHeap) {
//   heap.insert(num);
//   // console.log(heap.peek());
//   // console.log(heap.diagnostics);
// }

// heap.poll();
// console.log(heap.diagnostics);
// heap.poll();
// console.log(heap.diagnostics);
// heap.poll();
// console.log(heap.diagnostics);
// heap.poll();
// console.log(heap.diagnostics);

// heap.poll();
// console.log(heap.diagnostics);

// heap.poll();
// console.log(heap.diagnostics);

// heap.poll();
// console.log(heap.diagnostics);

class Trie {
  #root = {};

  insert(word) {
    // O(n) time where n is length of word | O(1) space
    if (word.length === 0) return;
    let node = this.#root;
    for (let char of word) {
      if (!(char in node)) {
        node[char] = {};
      }
      node = node[char];
    }
    node["*"] = {};
  }

  search(word) {
    // O(n) time where n is length of word | O(1) space
    let node = this.#root;
    for (let char of word) {
      if (!(char in node)) {
        return false;
      }
      node = node[char];
    }
    return "*" in node;
  }

  startsWith(prefix) {
    // O(n) time where n is length of word | O(1) space
    let node = this.#root;
    for (let char of prefix) {
      if (!(char in node)) {
        return false;
      }
      node = node[char];
    }
    return true;
  }

  get trie() {
    return JSON.stringify(this.#root, undefined, 2);
  }
}

const trie = new Trie();
["app", "apple", "beer", "add", "jam", "rental"].forEach((w) => trie.insert(w));
// console.log(trie.trie);
console.log(
  ["apps", "app", "ad", "applepie", "rest", "jan", "rent", "beer", "jam"].map(
    (w) => trie.search(w)
  )
);
console.log(
  ["apps", "app", "ad", "applepie", "rest", "jan", "rent", "beer", "jam"].map(
    (w) => trie.startsWith(w)
  )
);
