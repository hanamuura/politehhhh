import styled from "styled-components";

export const CustomButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}

const Button = styled.button`
  width: ${props => props?.width ?? '100px'};
  height: ${props => props?.height ?? '35px'};
  border: none;
  border-radius: 5px;
  background: #5C8D87;
  color: #FFFFFF;
  cursor: pointer;
  margin: ${props => props?.margintop ?? '0'} ${props => props?.marginright ?? '0'} ${props => props?.marginbottom ?? '0'} ${props => props.marginleft};
`