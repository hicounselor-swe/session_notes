class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

// In-order traversal
function inOrderTraversal(root) {
  // O(n) time | O(n) space
  if (root == null) return;
  inOrderTraversal(root.left);
  console.log(root.val);
  inOrderTraversal(root.right);
}

// Pre-order traversal
function preOrderTraversal(root) {
  // O(n) time | O(n) space
  if (root == null) return;
  console.log(root.val);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
}

// Post-order traversal
function postOrderTraversal(root) {
  // O(n) time | O(n) space
  if (root == null) return;
  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(root.val);
}

const [one, two, three, four, seven, eight, nine] = [1, 2, 3, 4, 7, 8, 9].map(
  (n) => new TreeNode(n)
);
let root = one;
root.left = two;
root.right = three;
root.left.left = four;
root.left.right = seven;
root.left.left.right = nine;
root.right.right = eight;

// inOrderTraversal(root);
// preOrderTraversal(root);
// postOrderTraversal(root);

function dfs(root, target) {
  // O(n) time | O(n) space
  if (root == null) return null;
  if (root.val === target) {
    return root;
  }
  let left = dfs(root.left, target);
  let right = dfs(root.right, target);
  return left || right;
}

// console.log(dfs(root, 1));

function bfs(root, target) {
  // O(n) time | O(n) space
  if (root == null) return null;
  let queue = [root];
  while (queue.length > 0) {
    let curr = queue.shift();
    // console.log({ q: queue.map((n) => n.val), currVal: curr.val });
    if (curr.val == target) {
      return curr;
    }
    if (curr.left != null) {
      queue.push(curr.left);
    }
    if (curr.right != null) {
      queue.push(curr.right);
    }
  }
  return null;
}

// console.log(bfs(root, 9));

// We can represent graphs in 3 days

// edge list

// [from, to]
const edgeList = [
  [1, 5],
  [1, 3],
  [1, 4],
  [3, 4],
  [3, 7],
  [7, 9],
  [9, 3],
  [99, 42],
  [42, 13],
  [42, 15],
  [13, 15],
];

// adjacency list

const adjacencyList = {
  1: [5, 4, 3],
  5: [],
  4: [],
  3: [4, 7],
  7: [9],
  9: [3],
  99: [42],
  42: [13, 15],
  13: [15],
};

// matrix

const matrix = [
  [0, 1, 1, 7, 0, 0],
  [0, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 9, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 1, 2, 0, 0],
];

// class
class Vertex {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.visited = false;
  }
}

class UnconnectedGraph {
  constructor(...vertices) {

    this.graph = vertices;
  }
}

class ConnectedGraph {
  constructor(root) {
    this.graph = root;
  }
}

function bfsGraph(graph, target) {
  // O(v + e) time | O(v) space
  for (let root of graph) {
    let search = graphBfs(root, target);
    if (search != null) {
      return search;
    }
  }
  return null;
}

function graphBfs(root, target) {
  if (root == null) return null;
  let queue = [root];
  while (queue.length > 0) {
    let curr = queue.shift();
    curr.visited = true;
    if (curr.val === target) return curr;
    queue.push(...curr.children.filter((n) => !n.visited));
  }
  return null;
}

const [uno, tres, cuatro, cinco, siete, nueve] = [1, 3, 4, 5, 7, 9].map(
  (n) => new Vertex(n)
);
let root1 = uno;
uno.children = [tres, cuatro, cinco];
tres.children = [cuatro, siete];
siete.children = [nueve];
nueve.children = [tres];

const [ninenine, fourtwo, onethree, onefive] = [99, 42, 13, 15].map(
  (n) => new Vertex(n)
);
let root2 = ninenine;
ninenine.children = [fourtwo];
fourtwo.children = [onethree, onefive];
onethree.children = [onefive];

const exampleGraph = new UnconnectedGraph(root1, root2);

// console.log(bfsGraph(exampleGraph.graph, 15));

const dfsGraph = (graph, target) => {
  for (let root of graph) {
    let searched = graphDfs(root, target);
    if (searched != null) {
      return searched;
    }
  }
  return null;
};

const graphDfs = (root, target) => {
  if (root == null) return null;
  if (root.val === target) return root;
  if (root.visited) return null;
  root.visited = true;
  for (let child of root.children) {
    let searched = graphDfs(child, target);
    if (searched != null) {
      return searched;
    }
  }
  return null;
};

console.log(dfsGraph(exampleGraph.graph, 13));
