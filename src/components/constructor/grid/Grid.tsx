import React from 'react';
import { GridProps } from './types';
import styles from './Grid.module.scss';

const Grid: React.FC<GridProps> = ({
  columns = 4,
  gap = '24px',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  style,
  children,
}) => {
  const childrenWithIndex = React.Children.map(children, (child, index) =>
    React.cloneElement(child as React.ReactElement, {
      style: { ...(child as any).props?.style, '--i': index } as React.CSSProperties,
    })
  );

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        alignItems,
        justifyItems,
        ...style,
      }}
    >
      {childrenWithIndex}
    </div>
  );
};

export default Grid;
