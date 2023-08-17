import { FontSize } from '@design-principles/foundation';

export interface TextProps {
  size?: keyof typeof FontSize;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const className = `dp-text dp-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;
