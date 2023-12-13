interface Iprobs {
  imageUrl: string;
  alt: string;
  className: string;
}

const Image = ({ imageUrl, alt, className }: Iprobs) => {
  return <img src={imageUrl} className={className} alt={alt} />;
};

export default Image;
