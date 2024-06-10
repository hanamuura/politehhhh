import { useEffect, useState } from 'react'
import styled from "styled-components";
import dog from "../recources/images/Prelude_to_Reality-removebg-preview 1.png"
import CustomButton from "../components/UI/CustomButton";
import { CategoryBlock } from "../components/CategoryBlock";
import { ProductsContainer } from "../components/ProductsContainer";
import i1 from "../recources/images/products/Снимок_экрана_2023-12-17_190838-removebg-preview (1) 1.png"
import i2 from "../recources/images/products/Снимок_экрана_2023-12-17_191800-removebg-preview 1.png"
import i3 from "../recources/images/products/Снимок_экрана_2023-12-17_192137-removebg-preview 1.png"
import i4 from "../recources/images/products/Снимок_экрана_2023-12-17_193028-removebg-preview 1.png"
import i5 from "../recources/images/products/Снимок_экрана_2023-12-17_193550-removebg-preview 1.png"
import i6 from "../recources/images/products/Снимок_экрана_2023-12-17_194131-removebg-preview 1.png"
import { Paginator } from "../components/Paginator";
import DeliveryPost from "../components/DeliveryPost";
import delivery1 from "../recources/images/delivery/logi57n 1.png"
import { DeliveryPostsContainer } from "../components/DeliveryPostsContainer";
import { baseUrl } from '../constants';

export function StartPage() {
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])


  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    async function fetchData() {
      try {
        const products = await fetch(`${baseUrl}/v1/products`, {
          signal: signal
        });
        const categories = await fetch(`${baseUrl}/admin/categories`)

        const productsJsonData = await products.json();
        const categoriesJsonData = await categories.json()
        setData(productsJsonData.sort((a, b) => a.id - b.id))
        setCategory(categoriesJsonData.sort((a, b) => a.id - b.id))
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    return () => {
      abortController.abort()
    }
  }, []);

  return (
    <Main>
      <PreviewContainer>
        <TextContainer>
          <ZooShop>
            ЗООМАГАЗИН
          </ZooShop>
          <Mozy>
            MOZZY
          </Mozy>
          <Container>
            <Rectangle />
            <Description>Товары для вашего питомца</Description>
          </Container>
        </TextContainer>
        <Dog src={dog} />
      </PreviewContainer>
      <CategoryContainer>
        {/* <CategoryBlock categories={categories} values={values} /> */}
        <ProductsContainer categories={category} products={data} />
      </CategoryContainer>
      {/* <Paginator /> */}
    </Main>
  )
}

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 62px;
`

const StyledButton = styled(CustomButton)`
  align-self: center;
`

const Description = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  margin-left: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Rectangle = styled.div`
  width: 80px;
  height: 1.5px;
  background-color: black;
  margin-left: 15px;
`

const Mozy = styled.h1`
  font-weight: 400;
  font-size: 180px;
`

const ZooShop = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  margin-left: 15px;
`

const TextContainer = styled.div`
  margin-top: 138px;
  display: flex;
  flex-direction: column;

`

const Dog = styled.img`

  @media (max-width: 768px) {
    display: none !important;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: rgba(181, 178, 208, 1);
  border-radius: 20px;
  margin: 0 20px;
`

const Main = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`