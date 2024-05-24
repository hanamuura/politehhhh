//pod zamenu zaglushka


import styled from "styled-components";

export const Paginator = () => {
    return(
        <MainBlock>
            <BlockContainer background={"#5C8D87"} color={"white"} shadow={"box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.4);\n" +
                "\n" +
                "box-shadow: 1px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;\n"}
                border={"none"}
            >1</BlockContainer>
            <BlockContainer>2</BlockContainer>
            <BlockContainer>3</BlockContainer>
            <BlockContainer>4</BlockContainer>
            <BlockContainer>&gt;</BlockContainer>
        </MainBlock>
    )
}

const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props?.background ?? "#FFFFFF"};
  border: ${props => props?.border ?? "1px solid #5C8D87"};
  border-radius: 5px;
  box-shadow: ${props => props?.shadow ?? "2px 2px 4px 0 rgba(0, 0, 0, 0.25) inset"};
  margin: 0 12px;
  cursor: pointer;
  color: ${props => props?.color ?? "black"};
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 40%;
  margin-top: 54px;
`