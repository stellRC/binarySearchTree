import Tree from "./tree.js";

const randomArray = () => {
  let randomArr;
  let set = new Set();
  while (set.size <= 11) {
    set.add((Math.random() * 100) | 0);
  }
  randomArr = [...new Set(set)];
  if (randomArr.includes(0)) {
    randomArray();
  } else {
    return randomArr;
  }
};

let treeArray = randomArray();
console.log("Original Array", treeArray);
//  [68, 77, 34, 27, 99, 4, 17, 64, 15, 11, 21, 37]

let binaryTree = new Tree(treeArray);

console.log("Insert Node:", binaryTree.insertNode(90));

console.log("Insert Node:", binaryTree.insertNode(100));

console.log("Remove Leaf Node:", binaryTree.removeNode(treeArray[2]));

console.log("Remove Node One Child:", binaryTree.removeNode(treeArray[4]));

console.log(
  "Remove Node with Two Children:",
  binaryTree.removeNode(treeArray[8])
);

// console.log("Find 50:", binaryTree.find(50))
// Number Not Found!

// console.log("Find 40:", binaryTree.find(40))
// Number Found!

console.log("Height", binaryTree.height());
// distance from root node to any given leaf node
// "Layers in a cake"
// 3

console.log("Depth", binaryTree.depth());
// 2

console.log("Balanced", binaryTree.isBalanced());
// True

console.log("reblance", binaryTree.rebalance());

console.log("Balanced", binaryTree.isBalanced());
// True

console.log("Inorder:", binaryTree.inorder());
// (Left, Root, Right)
// [4, 11, 17, 21, 27, 37, 64, 68, 77, 90, 100]

console.log("Preorder", binaryTree.preorder());
// (Root, Left, Right)
// [37, 4, 11, 17, 21, 27, 64, 68, 77, 90, 100]

console.log("Postorder", binaryTree.postorder());
// (Left, Right, Root)
//   [4, 11, 17, 21, 27, 64, 68, 77, 90, 100, 37]

console.log("Binary Tree", binaryTree);
