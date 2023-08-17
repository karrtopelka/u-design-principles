export type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ label, ...props }: ButtonProps) => <button {...props}>{label}</button>;
