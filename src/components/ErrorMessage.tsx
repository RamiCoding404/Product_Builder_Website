interface Iprobs {
  msg: string;
}

const ErrorMessage = ({ msg }: Iprobs) => {
  return msg ? (
    <span className="block text-red-700 font-semibold text-sm">{msg}</span>
  ) : null;
};

export default ErrorMessage;
