/* eslint-disable react-refresh/only-export-components */
import CircleColor from "./CircleColor";
import Image from "./Image";
import { IProduct } from "./interfaces";
import Button from "./ui/Button";
import { txtSlicer } from "./utils/functions";
import { memo } from "react";

interface Iprobs {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditidx: (value: number) => void;
  idx: number;
  openConfirmModal: () => void;
}

const Productcard = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditidx,
  idx,
  openConfirmModal,
}: Iprobs) => {
  const { title, description, imageURL, price, colors, category } = product;
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditidx(idx);
  };
  const onRemove = () => {
    openConfirmModal();
    setProductToEdit(product);
  };
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col ">
      <Image
        imageUrl={imageURL}
        alt={"product name"}
        className="rounded-md h-52 w-full lg:object-cover "
      />

      <h3 className="font-bold text-2xl sm:text-xl mt-2">{title}</h3>
      <p className="font-semibold text-gray-500 text-sm">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center my-4 space-x-1 flex-wrap ">
        {renderProductColors}
      </div>

      <div className="flex flex-row items-center justify-between font-bold text-lg">
        <span>{price} $</span>

        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex flex-row item-center justify-around space-x-2 my-5">
        <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-800 ">
          Edit
        </Button>
        <Button onClick={onRemove} className="bg-red-600 ">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default memo(Productcard);
