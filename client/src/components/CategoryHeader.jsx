import styled from "styled-components";


export const CategoryHeader = ({categories}) => {

    return (
        <CategoryBlock>
            {categories.map(el =>
                <Category key={el.id}>{el.name}</Category>
            )}
        </CategoryBlock>
    )
}

const Category = styled.div`

  text-decoration: none;
  color: black;
  position: relative;
  cursor: pointer;

  &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: rgba(181, 178, 208, 1);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: rgba(181, 178, 208, 1);
  }

  &:hover::after,
  &.active::after {
    transform: scaleX(1);
  }

  &:visited::after ,
  &.active:visited::after {
    transform: scaleX(1);
  }
`

const CategoryBlock = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1000px;
  border-bottom: 1px solid rgba(181, 178, 208, 1);
  height: 20px;
`