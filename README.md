# Binary Search Tree

Take a group of data item sand turn them into a tree full of nodes. EAch left node is "lower" than each right node. The root node starts the tree and any node with no children is called a "leaf node". 

1. buildTree() 
Accepts an array and returns a balanced binary tree full of Nodes 

2. insertNode()
Accepts a value and inserts it 

3. removeNode()
Removes a leaf Node, a Node with One Child, or a Node with Two Children depending on the given value

4. find()
Accepts value and returns "Number found" or "Number Not Found"

5. levelOrder()
aka visit() traverses the tree in breadth-first level order and provides each nodeas the argument to the provided function

6. height()
Accepts a node and returns its height
// distance from root node to any given leaf node
// "Layers in a cake"

7. depth()
Accepts a node and returns its depth 

8. isBalanced()
Checks if tree is balanced (the difference between ehights of left and right subtrees of every node is not more than 1)

9. rebalance()
If tree fails previous test, this will help put it back in order