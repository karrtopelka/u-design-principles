import { Spacing } from '@design-principles/foundation';

interface ColorProps {
  hexCode: string;
  width: keyof typeof Spacing;
  height: keyof typeof Spacing;
}

const Color: React.FC<ColorProps> = ({ hexCode, width = Spacing.sm, height = Spacing.sm }) => {
  const className = `dp-width-${width} dp-height-${height}`;

  return (
    <div
      className={className}
      style={{
        backgroundColor: hexCode,
      }}
    />
  );
};

export default Color;
