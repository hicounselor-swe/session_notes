class MinHeap {
  #elements = [];

  // helpers
  getLeftChildIdx = (parentIdx) => 2 * parentIdx + 1;
  getRightChildIdx = (parentIdx) => 2 * parentIdx + 2;
  getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  leftChild = (idx) => this.#elements[this.getLeftChildIdx(idx)];
  rightChild = (idx) => this.#elements[this.getRightChildIdx(idx)];
  parent = (idx) => this.#elements[this.getParentIdx(idx)];

  get elements() {
    return this.#elements;
  }

  peek = () => {
    if (this.#elements.length === 0) throw Error("no elements in min heap");
    return this.#elements.at(0);
  };

  insert(value) {
    // O(logN) time
    this.#elements.push(value);
    this.#swapUp();
  }

  poll() {
    // O(logN) time
    // aka Extract Min
    if (this.#elements.length === 0) throw Error("no elements to poll in heap");
    let root = this.#elements.at(0);
    let popped = this.#elements.pop();
    if (this.#elements.length > 0) {
      this.#elements[0] = popped;
    }
    this.#swapDown();
    return root;
  }

  #swapUp() {
    let currentIdx = this.#elements.length - 1;
    while (
      this.getParentIdx(currentIdx) >= 0 &&
      this.parent(currentIdx) > this.#elements[currentIdx]
    ) {
      const parentIdx = this.getParentIdx(currentIdx);
      [this.#elements[currentIdx], this.#elements[parentIdx]] = [
        this.#elements[parentIdx],
        this.#elements[currentIdx],
      ];
      currentIdx = parentIdx;
    }
  }

  #swapDown() {
    let idx = 0;

    // as long as there is a child, keep walking down
    // if there's no left child, then there definitely is no right child
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
  }
}

let minHeap = new MinHeap();
// minHeap.insert(6);
// minHeap.insert(8);
// minHeap.insert(12);
// minHeap.insert(4);
// minHeap.insert(2);
// minHeap.insert(3);
// minHeap.insert(9);
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);
// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());
// console.log(minHeap.elements);

// console.log("polling out:", minHeap.poll());

// Tries

// {
// 	a: {
// 		p: {
// 			p: {
// 				l: {
// 					e: {
// 						isEnd: true,
// 						p: {
// 							e: {
// 								n: {
// 									isEnd: true
// 								}
// 							}
// 						}
// 					}
// 				}
// 			},
// 		},
// 	},
// 	p: {
// 		e: {
// 			n: {
// 				isEnd: true
// 			},
// 		},
// 		i: {
// 			n: {
// 				e: {
// 					isEnd: true,
// 					a: {
// 						p: {
// 							p: {
// 								l: {
// 									e: {
// 										isEnd: true
// 									}
// 								}
// 							}
// 						}
// 					}
// 				},
// 			},
// 		},
// 	},

class Trie {
  root = {};
  insert(word) {
    // O(n) time | O(n) space where n is the length of the word
    if (word.length === 0) return;
    let charNode = this.root;
    for (let char of word) {
      if (!(char in charNode)) {
        charNode[char] = {};
      }
      charNode = charNode[char];
    }
    // set null node in the end
    charNode["*"] = {};
  }

  search(word) {
    // O(n) time | O(1) space where n is the length of the word
    let prefixTree = this.root;
    for (let char of word) {
      if (!(char in prefixTree)) {
        return false;
      }
      prefixTree = prefixTree[char];
    }
    return "*" in prefixTree;
  }

  startsWith(prefix) {
    // O(n) time | O(1) space where n is the length of the word
    let prefixTree = this.root;
    for (let char of prefix) {
      if (!(char in prefixTree)) {
        return false;
      }
      prefixTree = prefixTree[char];
    }
    return true;
  }
}

let trie = new Trie();
trie.insert("dog");
trie.insert("done");
trie.insert("doodoo");
console.log(JSON.stringify(trie.root, undefined, 2));
// console.log(trie.search("do")); // false
// console.log(trie.search("dog")); // true
// console.log(trie.search("abba")); // false
// console.log(trie.search("don")); //false

// console.log(trie.startsWith("do")); // true
// console.log(trie.startsWith("dog")); // true
// console.log(trie.startsWith("abba")); // false
// console.log(trie.startsWith("don")); //true

// Homework
// - Write an algorithm `isMinHeap(array)` that checks if an array represents a MinHeap
// - Implement a `MedianHeap` class to keep track of the median of a given set of integers. The API should have the following three functions:
//    1. `insert(int)` - should take O(logN)
//    1. `peekMedian()` - will be the topmost element of the heap. O(1)
//    1. `deleteMedian()` - should take O(logN)
// 1. https://leetcode.com/problems/implement-trie-prefix-tree/
// 2. https://leetcode.com/problems/word-break/
// 3. https://leetcode.com/problems/word-search-ii/
// 4. https://leetcode.com/problems/implement-magic-dictionary/

// - Implement Heapsort (https://en.wikipedia.org/wiki/Heapsort)
