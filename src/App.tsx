import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Productcard from "./components/Productcard";
import {
  categories,
  colors,
  formInputsList,
  productList,
} from "./components/data";
import Modal from "./components/ui/Model";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { ProductNameTypes } from "./components/types";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultProductOpj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductOpj);
  const [producttoEdit, setProductToEdit] =
    useState<IProduct>(defaultProductOpj);
  const [producttoEditIdx, setProductToEditidx] = useState<number>(0);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const [tempColors, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeEditModal = () => {
    setIsOpenModel(false);
  };
  const openEditModal = useCallback(() => {
    setIsOpenModel(true);
  }, []);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);
  const [isOpenEditModal, setIsOpenModel] = useState(false);
  const [selectedCatgory, setSelectedCategory] = useState(categories[0]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setProduct((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...producttoEdit,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };
  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== producttoEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, price, imageURL } = product;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selectedCatgory },
      ...prev,
    ]);
    setProduct(defaultProductOpj);
    setTempColor([]);
    closeModal();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, price, imageURL } = producttoEdit;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[producttoEditIdx] = {
      ...producttoEdit,
      colors: tempColors.concat(producttoEdit.colors),
    };

    //dah le update products
    setProducts(updatedProducts);
    setProductToEdit(defaultProductOpj);
    setTempColor([]);
    closeEditModal();
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const onCancel = () => {
    setProduct(defaultProductOpj);
    closeModal();
  };
  const renderProductList = products.map((product, idx) => (
    <Productcard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditidx={setProductToEditidx}
      openConfirmModal={openConfirmModal}
    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item != color)); //delete color enter
          return;
        }
        if (producttoEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item != color)); //delete color enter
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={producttoEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };
  return (
    <main className="container">
      <h1 className="flex tex-center justify-center mx-auto my-10 px-10 font-bold text-2xl md:text-3xl ">
        Product Builder
      </h1>
      <Button
        className="block mx-auto my-10 px-10 font-medium bg-blue-600 hover:bg-blue-700 "
        onClick={openModal}
        width="w-fit"
      >
        Build Product
      </Button>
      <div className="  m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* add product  */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCatgory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {tempColors.map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {renderProductColors}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="bg-blue-600 hover:bg-blue-800  ">Submit</Button>
            <Button
              className="bg-gray-500 hover:bg-gray-800  "
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* edit product  */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image Url",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={producttoEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...producttoEdit, category: value })
            }
          />
          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {tempColors.concat(producttoEdit.colors).map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center my-4 space-x-1 flex-wrap">
            {renderProductColors}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="bg-blue-600 hover:bg-blue-800  ">Submit</Button>
            <Button
              className="bg-gray-500 hover:bg-gray-800  "
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* delete product  */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            onClick={removeProductHandler}
            className="bg-[#c2344d] hover:bg-red-800"
          >
            Yes, remove
          </Button>
          <Button
            className="bg-gray-500 hover:bg-gray-800 "
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
};

export default App;
