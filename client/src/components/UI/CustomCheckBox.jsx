import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 13px;
`;

const CheckboxInput = styled.input.attrs({
    type: 'checkbox',
})`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 3px;
  margin-right: 8px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #5C8D87;
    border-color: #5C8D87;
  }

  &:checked::after {
    content: '';
    display: block;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-left: 4px;
  }
`;

const CheckboxText = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 900;
`;

const Checkbox = ({ label, checked, onChange }) => {
    return (
        <CheckboxWrapper>
            <CheckboxInput checked={checked} onChange={onChange} />
            <CheckboxText>{label}</CheckboxText>
        </CheckboxWrapper>
    );
};

export default Checkbox;