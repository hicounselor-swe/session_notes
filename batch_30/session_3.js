// Tree is a collection of nodes connected by directed edges
// Each tree has a root, which points to its left and right nodes,
// and which recursively maintain pointers to its' children
// Each node can have any data type
// Every node is connected by a directed edge from exactly one other node
// Nodes without children are called leaf nodes

class TreeNode {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

// ```java```
// class TreeNode<T> {
//   public T val;
//   public TreeNode<T> left;
//   public TreeNode<T> right;

//   public TreeNode(T x) {
//       val = x;
//       left = null;
//       right = null;
//   }
// }

//      5
//    /   \
//   3     6
//  / \     \
// 1   4     8
//          / \
//         7  11

let root = new TreeNode(5);
root.left = new TreeNode(3);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(4);
root.right = new TreeNode(6);
root.right.right = new TreeNode(8);
root.right.right.left = new TreeNode(7);
root.right.right.right = new TreeNode(11);

function inOrderTraversal(node) {
  // O(N) time | O(N) space
  if (node == null) return;
  inOrderTraversal(node.left);
  console.log(node.val);
  inOrderTraversal(node.right);
}

// inOrderTraversal(root);

function preOrderTraversal(node) {
  // O(N) time | O(N) space
  if (node == null) return;
  console.log(node.val);
  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
}

// preOrderTraversal(root);

function postOrderTraversal(node) {
  // O(N) time | O(N) space
  if (node == null) return;
  postOrderTraversal(node.left);
  postOrderTraversal(node.right);
  console.log(node.val);
}

// postOrderTraversal(root);

function DFS(node, target) {
  // O(n) time | O(n) space
  if (node == null) {
    return null;
  }
  if (node.val === target) {
    return node;
  }
  const left = DFS(node.left, target);
  const right = DFS(node.right, target);
  return left || right;
}

// console.log(DFS(root, 6));

function BFS(node, target) {
  // O(n) time | O(n) space
  if (node == null) return null;
  const queue = [];
  queue.push(node);
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.val === target) {
      return current;
    }
    if (current.left != null) {
      queue.push(current.left);
    }
    if (current.right != null) {
      queue.push(current.right);
    }
  }
  return null;
}

// console.log(BFS(root, 11));
// console.log(BFS(root, 42));
// console.log(BFS(root, 3));

// Given a binary tree, return a 2d array where each index of the array represents
// an array that has the level of all of nodes at that height

function createLevel(node) {
  if (node == null) return [];
  const result = [];
  let queue = [];
  queue.push(node);
  while (queue.length > 0) {
    let newQueue = [];
    let list = [];
    for (let n of queue) {
      list.push(n);
    }
    for (let n of list) {
      if (n.left) {
        newQueue.push(n.left);
      }
      if (n.right) {
        newQueue.push(n.right);
      }
    }
    result.push(list);
    queue = newQueue;
    newQueue = [];
  }
  return result;
}

// console.log(createLevel(root)); // => [[5], [3,6], [1,4,8], [7,11]]

// Given a binary tree, return the height of the binary tree

function getHeight(node) {
  if (node === null) return 0;
  let left = getHeight(node.left);
  let right = getHeight(node.right);
  return Math.max(left, right) + 1;
}

// console.log(getHeight(root)); // 4

// Graphs

// Directed Graph = a graph where edges have a direction
// Undirected Graph = a graph where edges are bidirectional

// Cyclic graph = a graph with cycles
// Acyclic graph = a graph with no cycles

const adjacencyList = {
  a: ["b", "c,", "d"],
  d: ["y"],
  b: ["e", "f", "g"],
  g: ["x", "y"],
  y: ["z"],
  p: [],
  z: ["e"],
};

class GraphNode {
  constructor(val) {
    this.children = [];
    this.val = val;
    this.visited = false;
  }
}

let [zero, one, two, three, four, five] = [
  new GraphNode(0),
  new GraphNode(1),
  new GraphNode(2),
  new GraphNode(3),
  new GraphNode(4),
  new GraphNode(5),
];

zero.children.push(one, four, five);
one.children.push(three);
three.children.push(two, four);
two.children.push(one);

// crappy drawing of the graph;
// 0 -> 1 <- 2
// | \    \  ^
// v  v    v |
// 5   4 <- 3
function graphBFS(node, target) {
  // O(v + e) time | O(v) space
  // where v is number of vertices (aka nodes) and e is number of edges
  if (node == null) return null;
  let queue = [];
  queue.push(node);
  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr.val === target) {
      return curr;
    }
    curr.visited = true;
    for (let child of curr.children) {
      if (!child.visited) {
        queue.push(child);
      }
    }
  }
  return null;
}

// console.log(graphBFS(zero, 2)); // => 2

function graphDFS(node, target) {
  // O(v + e) time | O(v) space
  // where v is number of vertices (aka nodes) and e is number of edges
  if (node == null) return null;
  if (node.val === target) return node;
  if (node.visited) return null;
  node.visited = true;
  let searched;
  for (let child of node.children) {
    searched = graphDFS(child, target);
    if (searched != null) {
      return searched;
    }
  }
  return null;
}

console.log(graphDFS(zero, 3));
console.log(graphDFS(zero, 99));

// HOMEWORK
// - Mirror a given binary tree. https://leetcode.com/problems/invert-binary-tree/
// - Find the Kth Smallest element in a BST https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// - Snake and Ladder Problem | https://leetcode.com/problems/snakes-and-ladders/
// - Find the correct ordering : CourseSchedule (Topological Sorting) | https://leetcode.com/problems/course-schedule/
