import React, { useState, SyntheticEvent } from 'react';

export interface INode {
  children: INode[],
  key: string,
  addChild: Function,
}

export const createNode = (key: string): INode => {
  const children: any = [];

  return {
    children,
    key,
    addChild(childKey: string) {
      const childNode: any = createNode(childKey);
      children.push(childNode);
      return childNode;
    }
  }
}

interface NodeProps {
  name: string,
  depth: number;
  onUpdate: Function;
}

const Node = ({name, depth, onUpdate}: NodeProps) => {
  const [key, setKey] = useState<string>('');
  const [children, setChildren] = useState<INode[]>();

  const node = createNode(name);

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();

    setKey(event.currentTarget.value);
  };

  const onAddChild = () => {
    onUpdate(node.addChild(key));
    setChildren(node.children);
    setKey('');
  };

  return (
    <div>
      {name} {depth}
      <input value={key} onChange={onChange} type="text"/>
      <button onClick={onAddChild}>+</button>
    </div>
  )
}

export default Node;