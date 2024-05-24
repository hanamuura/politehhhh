import styled from "styled-components";


export const CustomRangeInput = ({...props}) => {
  return (
      <CustomInput {...props} min="0" max="100"/>
  )
}

const CustomInput = styled.input.attrs({type: 'range'})`
  width: 285px;
  height: 5px;
  appearance: none;
  background-color: lightgray;
  outline: none;
  border-radius: 5px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background-color: #5C8D87;
    border-radius: 50%;
    border: 1px solid white;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background-color: #5C8D87;
    border-radius: 50%;
    border: 1px solid white;
  }
`