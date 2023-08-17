import React from 'react';
import { Spacing } from '@design-principles/foundation';

export interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  children?: React.ReactNode;
}

const MARGIN_DIRECTIONS: string[] = ['left', 'right', 'top', 'bottom'];

const Margin: React.FC<MarginProps> = ({ space = 'xxxs', children, left, right, top, bottom }) => {
  const classNames = MARGIN_DIRECTIONS.filter(
    (direction) => [left, right, top, bottom][MARGIN_DIRECTIONS.indexOf(direction)],
  )
    .map((direction) => `dp-margin-${direction}-${space}`)
    .join(' ');

  const defaultClassName = `dp-margin-${space}`;

  return <div className={classNames || defaultClassName}>{children}</div>;
};

export default Margin;
