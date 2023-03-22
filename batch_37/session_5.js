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
