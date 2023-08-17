type ButtonProps = {
  label: string;
};

const Button = ({ label, ...props }: ButtonProps) => <button {...props}>{label}</button>;

export default Button;
