import {CustomRangeInput} from "./UI/CustomRangeInput";
import styled from "styled-components";
import {useState} from "react";


export const PriceBlock = () => {

    const [value, setValue] = useState(0)

    return (
        <MainBlock>
            <CustomRangeInput value={value} onChange={e => {
                setValue(e.target.value)
            }}/>
            <TextBlock>
                <RangeValues>Цена: </RangeValues>
                <RangeValues weight={900} color={'#5C8D87'}> от: 0руб. - до: {value}руб.</RangeValues>
            </TextBlock>
        </MainBlock>
    )
}

const RangeValues = styled.span`
  color: ${props => props?.color ?? 'black'};
  font-weight: ${props => props?.weight ?? 400};
`

const TextBlock = styled.div`
  display: flex;
  margin-top: 19px;
`

const MainBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`