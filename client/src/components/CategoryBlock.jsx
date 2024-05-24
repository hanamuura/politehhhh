import styled from "styled-components";
import {CategoryComponent} from "./CategoryComponent";
import {CustomRangeInput} from "./UI/CustomRangeInput";
import {PriceBlock} from "./PriceBlock";
import {DogAgeBlock} from "./DogAgeBlock";


export const CategoryBlock = ({categories, values}) => {
    return(
        <MainBlock>
            <Title>Категории</Title>
            {categories.map(category =>
                <CategoryComponent
                    key={category.name}
                    categoryName={category.name}
                    options={category.options}
                    counter={category.counter}
                />
            )}
            <Title>Цена</Title>
            <PriceBlock/>
            <Block>
                <Title>Возраст собаки</Title>
                <DogAgeBlock values={values}/>
            </Block>
        </MainBlock>
    )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 66px;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  border-radius: 5px;
`

const Title = styled.h3`
  text-decoration: underline;
  margin-top: 8px;
  margin-left: 39px;
  margin-bottom: 23px;
`