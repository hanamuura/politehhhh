import styled from "styled-components";


export const CategoryComponent = ({categoryName, options, counter}) => {
    return(
        <MainBlock>
            <MainCategoryContainer>
                <Text marginleft={'54px'}>{categoryName}</Text>
                <Text marginright={'13px'}>({counter})</Text>
            </MainCategoryContainer>
            <OptionsContainer>
                {options.map(el =>
                    <CategoryText key={el} marginleft={'71px'} margintop={'9px'}>{el}</CategoryText>
                )}
            </OptionsContainer>
        </MainBlock>
    )
}

const CategoryText = styled.span`
  width: fit-content;
  margin: ${props => props?.margintop ?? '0'} ${props => props?.marginright ?? '0'} ${props => props?.marginbottom ?? '0'} ${props => props.marginleft};
  cursor: pointer;
  transition: .2s;

  &:hover{
    color: #5C8D87;
    transition: .2s;
  }
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`

const Text = styled.h4`
  margin: ${props => props?.margintop ?? '0'} ${props => props?.marginright ?? '0'} ${props => props?.marginbottom ?? '0'} ${props => props.marginleft};
  
  font-weight: 900;
  

`

const MainCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  transition: .2s;
  cursor: pointer;

  &:hover{
    color: #5C8D87;
    transition: .2s;
  }
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 389px;
  margin: 10px 0;
`