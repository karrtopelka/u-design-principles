type ButtonProps = {
  label: string;
};

const Button = ({ label, ...props }: ButtonProps) => (
  <button {...props} className='dse-button-container'>
    {label}
  </button>
);

export default Button;
