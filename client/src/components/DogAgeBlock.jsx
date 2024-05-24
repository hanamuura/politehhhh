import Checkbox from "./UI/CustomCheckBox";
import styled from "styled-components";


export const DogAgeBlock = ({values}) => {
    return(
        <MainBlock>
            {values.map(value => <Checkbox key={value.label} label={value.label}/>)}
        </MainBlock>
    )
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 71px;
`