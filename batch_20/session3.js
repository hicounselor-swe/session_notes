// Trees
/*
  A collection of nodes connected by directed (or undirected) edges
  Each tree have a root node which points to its left and right nodes, and which recursively maintain pointers to its' children
  Each node can carry integer, string or any other data type
  Every node is connected by a directed edge from exactly one other node
  Nodes without children are called leaf nodes
*/

class TreeNode {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

// ```java
// class TreeNode<T> {
//     public T val;
//     public TreeNode<T> left;
//     public TreeNode<T> right;

//     public TreeNode(T x) {
//         val = x;
//         left = null;
//         right = null;
//     }
// }
// ```

// Tree traversal

// In-order
function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.val);
  inOrderTraversal(node.right);
}

// Pre-order
function preOrderTraversal(node) {
  if (node === null) return;
  console.log(node.val);
  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
}

// Post-order
function postOrderTraversal(node) {
  if (node === null) return;
  postOrderTraversal(node.left);
  postOrderTraversal(node.right);
  console.log(node.val);
}

// const one = new TreeNode(1);
// const two = new TreeNode(2);
// const three = new TreeNode(3);
// const four = new TreeNode(4);
// const sixtysix = new TreeNode(66);

// let root = three;
// root.left = two;
// root.right = four;
// root.left.left = one;
// root.right.right = sixtysix;
// root.right.right.left = new TreeNode(55);
// root.right.right.right = new TreeNode(11);
// root.right.right.left.left = new TreeNode(9);
// root.right.right.left.right = new TreeNode(10);
// root.right.right.right.right = new TreeNode(42);

// console.log(inOrderTraversal(root));

//
//    3
//   /  \
//  2   4
// /     \
// 1     66
//      / \
//     55  11
//    / \   \
//   9  10  42

// Given a binary tree and a target,
// return the previous in-order successor of the target

// console.log(inOrderSuccessor(sixtysix)); // returns 10 node

// Depth First Search
// A tree search algorithm that exhaustively searches a node to
// its leaf before taking another path

function dfs(root, target) {
  // O(n) time | O(n) space where n is the number of nodes in tree
  if (root === null) return null;
  if (root.val === target) return root;
  return dfs(root.left, target) || dfs(root.right, target);
}

// console.log(dfs(root, 55));
// console.log(dfs(root, 42));
// console.log(dfs(root, 3));
// console.log(dfs(root, -99));

// Breadth First Search
// A tree search algorithm that exhaustively searches a node
// and its immediate children before searching its children's children

function bfs(root, target) {
  // O(n) time | O(n) space
  let queue = [];
  if (root === null) return null;
  queue.push(root);
  while (queue.length !== 0) {
    let curr = queue.shift();
    if (curr.val === target) {
      return curr;
    }
    if (curr.left !== null) {
      queue.push(curr.left);
    }
    if (curr.right !== null) {
      queue.push(curr.right);
    }
  }
  return null;
}

// console.log(bfs(root, 55));
// console.log(bfs(root, 42));
// console.log(bfs(root, 3));
// console.log(bfs(root, -99));

// Given a binary tree, return the height of the binary tree

//    3           5
//   /  \
//  2   4         4
// /     \
// 1     66       3
//      / \
//     55  11     2
//    / \   \
//   9  10  42    1

function getHeight(root) {
  // O(n) time | O(n) space
  let queue = [];
  let level = 0;
  if (root === null) return null;
  queue.push(root);
  while (queue.length !== 0) {
    let newQueue = [];
    for (let n of queue) {
      if (n.left) {
        newQueue.push(n.left);
      }
      if (n.right) {
        newQueue.push(n.right);
      }
    }
    queue = newQueue;
    level++;
  }
  return level;
}

function dfsGetHeight(root) {
  // O(n) time | O(n) space
  if (root === null) return 0;
  return Math.max(dfsGetHeight(root.left), dfsGetHeight(root.right)) + 1;
}
// console.log(getHeight(root)); // 5
// console.log(dfsGetHeight(root)); // 5

function topDownGetHeight(root, level = 0) {
  // O(n) time | O(n) space
  if (root === null) return level;
  let left = topDownGetHeight(root.left, level + 1);
  let right = topDownGetHeight(root.right, level + 1);
  return Math.max(left, right);
}

// Directed Graph
// A graph with clear direction

// Undirected Graph
// A graph with bi-directional edges

class Graph {
  constructor(collection) {
    this.collection = collection;
  }
}

class GraphNode {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.visited = false;
  }
}

const adjacencyList = {
  a: ["b", "c,", "d"],
  b: ["e", "f", "g"],
  g: ["x", "y"],
  y: ["z"],
  p: [],
};

// dfs traversal for graphs
// visit unvisited nodes until an unvisited node has no children

function dfs(graph, target) {
  // O(n + e) time | O(n) space
  for (let root of graph.collection) {
    let searched = helper(root, target);
    if (searched) {
      return searched;
    }
  }
  return null;
}

function helper(node, target) {
  if (node === null) return null;
  if (node.val === target) return node;
  if (node.visited) return null;
  node.visited = true;
  for (let child of node.children) {
    let searched = helper(child, target);
    if (searched) {
      return searched;
    }
  }
  return null;
}

// 0 -> 1 <- 2    88
// | \    \  ^    ^
// v  v    v |    |
// 5   4 <- 3     99

let [zero, one, two, three, four, five, eighteight, ninenine] = [
  new GraphNode(0),
  new GraphNode(1),
  new GraphNode(2),
  new GraphNode(3),
  new GraphNode(4),
  new GraphNode(5),
  new GraphNode(88),
  new GraphNode(99),
];

zero.children.push(one, four, five);
one.children.push(three, four);
three.children.push(two, four);
two.children.push(one);
ninenine.children.push(eighteight);

const testGraph = new Graph([zero, ninenine]);

// console.log(dfs(testGraph, 99));
// console.log(dfs(testGraph, 1));
// console.log(dfs(testGraph, -42));

function bfs(graph, target) {
  // O(n + e) time | O(n) space
  for (let root of graph.collection) {
    let searched = _bfsHelper(root, target);
    if (searched) {
      return searched;
    }
  }
  return null;
}

function _bfsHelper(node, target) {
  let queue = [];
  if (node === null) return null;
  queue.push(node);
  while (queue.length !== 0) {
    let curr = queue.shift();
    curr.visited = true;
    if (curr.val === target) {
      return curr;
    }
    for (let child of curr.children) {
      if (!child.visited) {
        queue.push(child);
      }
    }
  }
  return null;
}

// console.log(bfs(testGraph, 99));
// console.log(bfs(testGraph, 4));
// console.log(bfs(testGraph, 3));
// console.log(bfs(testGraph, -42));

// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

// Homework
// https://leetcode.com/problems/binary-tree-inorder-traversal
// https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree 236
// Medium 314
// Medium 366
// Medium 654
// Medium 687
// Medium 814
// Medium 951
// Medium 1038
// Medium 1110
// Medium 1214
// Medium 1302
// Medium 1315
// Medium 1339
// Medium 1379
// Medium 1490
// Medium 1522
// Medium 1609
