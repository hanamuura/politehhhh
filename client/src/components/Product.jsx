import CustomButton from "./UI/CustomButton";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import { routes } from "../routes";
import Cookie from 'js-cookie'

export const Product = ({ product }) => {
  return (
    <MainBlock>
      <Link
        to={`${product.id}`}
      >
        <ImageContainer>
          <Image src={product?.image} />
        </ImageContainer>
        <TextContainer>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product?.price} руб.</ProductPrice>
          {/* <ProductCategories>
                    {product.categories.map(el =>
                        <ProductCategory key={el.name}>
                            {el.name}
                        </ProductCategory>)}
                </ProductCategories> */}
        </TextContainer>
      </Link>
      <CustomButton
        onClick={() => {
          const userID = JSON.parse(Cookie.get('user')).id
          const request = { user_id: userID, product_id: product.id }
          const fetchData = () => {
            fetch('http://localhost:8080/api/v1/products', {
              method: "POST",
              body: JSON.stringify(request)
            })
          }
          fetchData()
        }}
      >
        В корзину
      </CustomButton>
    </MainBlock>
  )
}

const ProductCategories = styled.div`
  display: flex;

`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 313px;
  background-color: #F7F7F7;
`

const Image = styled.image`
  width: 222px;
  height: 239px;
`

const ProductCategory = styled.label``

const ProductDescription = styled.span``

const ProductName = styled.label``

const ProductPrice = styled.h4``

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 455px;
`