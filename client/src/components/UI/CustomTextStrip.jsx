import styled from "styled-components";


export const CustomTextStrip = ({children}) => {
    return(
        <MainBlock>
            <Line/>
            <Text>{children}</Text>
            <Line/>
        </MainBlock>
    )
}

const Text = styled.h2`
  margin: 0 12px;
`

const Line = styled.div`
  height: 1px;
  background-color: black;
  width: 100%;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`