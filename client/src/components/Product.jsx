import CustomButton from "./UI/CustomButton";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import { routes } from "../routes";
import Cookie from 'js-cookie'
import { baseUrl, staticImagePath } from "../constants";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Product = ({ product }) => {
  const handleAddToFavorite = () => {
    const userID = JSON.parse(Cookie.get('user')).id;
    const request = { user_id: userID, product_id: product.id };
    const fetchData = () => {
      fetch(`${baseUrl}/v1/products`, {
        method: "POST",
        body: JSON.stringify(request)
      })
        .then(() => {
          toast.success('Товар добавлен в избранное', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(() => {
          toast.error('Failed to add product to favorites.', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
    fetchData();
  };

  return (
    <MainBlock>
      <CiCirclePlus
        className="self-end mr-4 cursor-pointer w-6 h-6"
        onClick={handleAddToFavorite}
      />
      <Link
        to={`products/${product.id}`}
      >
        {product.image ? <img className="w-[230px] h-[285px]" src={`${staticImagePath}${product.image}`} alt={product.image} /> : <MdOutlineImageNotSupported className="w-[230px] h-[285px]" />}
        <TextContainer>
          <ProductName>{product.name.length > 30 ? `${product.name.slice(0, 20)}...` : product.name}</ProductName>
          <ProductPrice>{product?.price} руб.</ProductPrice>
        </TextContainer>
      </Link>
      <ToastContainer />
    </MainBlock>
  )
}

// Rest of the component code

const ProductCategories = styled.div`
  display: flex;

`
const Image = styled.image`
  width: 222px;
  height: 239px;
`

const ProductCategory = styled.label``

const ProductDescription = styled.span``

const ProductName = styled.label`
  font-weight: 800;
  font-size: 15px;

`

const ProductPrice = styled.h4``

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  align-items: center;
  justify-content: center;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b5b2d051;
  width: fit-content;
  padding: 30px;
  border-radius: 50px;
  gap: 20px;
  justify-content: center;
  align-items: center;
`