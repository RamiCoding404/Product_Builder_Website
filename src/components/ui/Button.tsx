import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprobs extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: string;
}

const Button = ({ children, className, width = "w-full", ...rest }: Iprobs) => {
  return (
    <button
      className={`${className} ${width} p-2 rounded-lg text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
