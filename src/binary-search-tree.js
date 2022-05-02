const {
  NotImplementedError
} = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


class BinarySearchTree {


  constructor() {
    this.ended = null;
  }

  root() {
    return this.ended;
  }

  add(data) {
    let newRoot = new Node(data);

    if (this.ended === null) {
      this.ended = newRoot;
    } else {
      this.addWithin(this.ended, newRoot);
    }

  }

  addWithin(node, newRoot) {
    if (newRoot.value < node.value) {
      if (node.left === null) {
        node.left = newRoot;
      } else {
        this.addWithin(node.left, newRoot);
      }
    } else {
      if (node.right === null) {
        node.right = newRoot;
      } else {
        this.addWithin(node.right, newRoot);
      }
    }
  }


  has(value) {
    return searchWithin(this.ended, value);

    function searchWithin(node, value) {
      if (!node) {
        return false;
      }

      if (node.value === value) {
        return true;
      }

      return value < node.value ?
        searchWithin(node.left, value) :
        searchWithin(node.right, value);
    }
  }

  find(data) {

    return searchIn(this.ended, data);

    function searchIn(node, data) {

      if (node === null) {
        return null;
      } else if (data < node.value) {
        return searchIn(node.left, data);
      } else if (data > node.value) {
        return searchIn(node.right, data);
      } else {
        return node.value;
      }

    }

    // return searchWithin(this.ended, value);

    // function searchWithin(node, value) {
    //   if (node === null) {
    //     return null;
    //   }

    //   if (node.value === value) {
    //     return node;
    //   }

    //   return value < node.value ?
    //     searchWithin(node.left, value) :
    //     searchWithin(node.right, value);
    // }

  }

  remove(value) {
    this.ended = removeNode(this.ended, value);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.value < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }

        // both children exists for this item
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.value = minFromRight.value;

        node.right = removeNode(node.right, minFromRight.value);

        return node;
      }
    }
  }

  min() {

    if (!this.ended) {
      return;
    }

    let node = this.ended;
    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  max() {
    if (!this.ended) {
      return;
    }

    let node = this.ended;
    while (node.right) {
      node = node.right;
    }

    return node.value;
  }
}

module.exports = {
  BinarySearchTree
};