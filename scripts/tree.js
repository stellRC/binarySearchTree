import NodeObject from "./node.js";

let levelOrder = [];

export default class Tree {
  constructor(array) {
    const sortedArray = [...array].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(treeArray) {
    if (treeArray.length === 0) return null;

    let middle = Math.floor(treeArray.length / 2);
    let newNode = new NodeObject(treeArray[middle]);

    let leftChildNum = treeArray.slice(0, middle);
    let rightChildNum = treeArray.slice(middle + 1);

    newNode.leftChild = this.buildTree(leftChildNum);
    newNode.rightChild = this.buildTree(rightChildNum);

    return newNode;
  }

  insertNode(value) {
    let root = this.root;
    let newNode = new NodeObject(value);

    if (root.data === value) return;

    this.addNode(value);

    return newNode;
  }

  addNode(newNode, root = this.root) {
    if (root === null) return new NodeObject(newNode);

    if (newNode < root.data) {
      if (root.rightChild === null) {
        root.rightChild = new NodeObject(newNode);
      } else {
        root.leftChild = this.addNode(newNode, root.leftChild);
      }
    } else if (newNode > root.data) {
      root.rightChild = this.addNode(newNode, root.rightChild);
    }
    return root;
  }

  // Node with no leafs
  removeNode(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.leftChild = this.removeNode(value, root.leftChild);
    } else if (value > root.data) {
      root.rightChild = this.removeNode(value, root.rightChild);
    } else {
      if (root.leftChild === null) return root.rightChild;
      else if (root.rightChild === null) return root.leftChild;

      root = this.removeNodeChildren(root, root.rightChild);
    }

    return root;
  }

  // Node with leafs
  removeNodeChildren(root) {
    if (root.leftChild && root.rightChild) {
      const successorRoot = this.successor(root.rightChild);
      root.data = successorRoot.data;
      root.rightChild = this.removeNode(successorRoot.data, root.rightChild);
      return root;
    }
  }

  successor(root) {
    let currentNode = root;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }

    return currentNode;
  }

  find(value, root = this.root) {
    if (root === null) {
      console.log("Number Not Found!");
      return;
    }
    if (root.data === value) {
      console.log("Found!");
      return root;
    } else if (value < root.data) {
      root.leftChild = this.find(value, root.leftChild);
    } else if (value > root.data) {
      root.rightChild = this.find(value, root.rightChild);
    }
    return root;
  }

  visit(root, arr = []) {
    if (root.leftChild != null) {
      this.visit(root.leftChild);
    }

    arr = [root.data];

    while (arr.length === 1) {
      const node = arr.pop(0);

      levelOrder.push(node);
    }

    if (root.rightChild != null) {
      this.visit(root.rightChild);
    }

    return [...levelOrder];
  }

  inorder(root = this.root, arr = []) {
    if (root == null) return;

    arr = this.visit(root.leftChild);
    arr = this.visit(root.rightChild);
    let middle = arr.length / 2;
    arr.splice(middle + 1);

    return arr;
  }

  preorder(root = this.root, arr = []) {
    if (root == null) return;

    const callback = () => {
      if (root.leftChild != null) {
        this.visit(root.leftChild);
      }

      arr = [root.data];

      while (arr.length === 1) {
        const node = arr.pop(0);

        levelOrder.push(node);
      }

      if (root.rightChild != null) {
        this.visit(root.rightChild);
      }

      return [...levelOrder];
    };

    arr = callback(root.leftChild);
    arr = callback(root.rightChild);
    let middle = arr.length / 4;
    arr.splice(middle + 1);
    arr = arr.filter((item) => item !== root.data);
    arr.splice(0, 0, root.data);

    return arr;
  }

  postorder(root = this.root, arr = []) {
    if (root == null) return;

    const callback = () => {
      if (root.leftChild != null) {
        this.visit(root.leftChild);
      }
      arr = [root.data];
      while (arr.length === 1) {
        const node = arr.pop(0);

        levelOrder.push(node);
      }
      if (root.rightChild != null) {
        this.visit(root.rightChild);
      }
      return [...levelOrder];
    };

    arr = callback(root.leftChild);
    arr = callback(root.rightChild);
    let middle = arr.length / 6;
    arr.splice(middle + 1);
    arr = arr.filter((item) => item !== root.data);
    arr.push(root.data);

    return arr;
  }

  isBalanced() {
    return this.depth() >= this.height() - 1;
  }

  depth(root = this.root) {
    if (root === null) return -1;
    let leftDepth = this.depth(root.leftChild);
    let rightDepth = this.depth(root.rightChild);
    if (leftDepth < rightDepth) return leftDepth + 1;
    return rightDepth + 1;
  }

  height(root = this.root) {
    if (root === null) return -1;
    let leftDepth = this.height(root.leftChild);
    let rightDepth = this.height(root.rightChild);
    if (leftDepth > rightDepth) return leftDepth + 1;
    return rightDepth + 1;
  }

  traverse(root, arr = []) {
    if (root.leftChild != null) {
      this.visit(root.leftChild);
    }

    arr = [root.data];

    while (arr.length === 1) {
      const node = arr.pop(0);

      levelOrder.push(node);
    }

    if (root.rightChild != null) {
      this.visit(root.rightChild);
    }

    return [...levelOrder];
  }

  rebalance(root = this.root, arr = []) {
    arr = this.traverse(root);
    let arrCopy = arr;
    root = this.buildTree(arrCopy);

    return root;
  }
}
