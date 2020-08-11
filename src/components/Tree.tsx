import React, { useState } from 'react';
import Node, { INode, createNode } from './ Node';

enum TraverseMode {
  ITERATIVE = 'iterative',
  RECURSIVE = 'recursive',
}

interface TreeProps {
  rootKey: string,
  mode: TraverseMode,
}

const Tree = ({rootKey, mode}: TreeProps) => {
  const [root, setTree] = useState(createNode(rootKey));
  const result: any[] = [];

  const onUpdate = (node: INode) => (childNode: INode) => {
    node.children.push(childNode);
    setTree({...node});
    renderRecursively();
  }

  const renderRecursively = () => {
    const traverse = (node: INode, visitFn: Function, depth: number) => {
      visitFn(node, depth);
  
      if (node.children.length) {
        node.children.forEach(n => traverse(n, visitFn, depth + 1));
      }
    };
  
    const addToResult = (node: INode, depth: number) => {
      result.push(<Node onUpdate={onUpdate(node)} key={node.key} name={node.key} depth={depth} />)
    }
  
    traverse(root, addToResult, 0);

    return <>
      {result}
    </>;
  }

  if (mode === TraverseMode.RECURSIVE) {
    return renderRecursively();
  } else {
    return null;
  }
}

Tree.defaultProps = {
  mode: 'recursive'
}

export default Tree;