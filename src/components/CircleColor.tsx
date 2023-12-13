import { HTMLAttributes } from "react";

interface Iprobs extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: Iprobs) => {
  return (
    <span
      className={`"block w-5 h-5  rounded-full cursor-pointer mb-1"`} //tailwind build time
      style={{ backgroundColor: color }} //react run time
      {...rest}
    />
  );
};

export default CircleColor;
