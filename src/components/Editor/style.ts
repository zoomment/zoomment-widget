import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { 
    transform: rotate(0); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0;
  appearance: none;
  position: relative;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const Textarea = styled.textarea`
  border: 0;
  margin: 0;
  width: 100%;
  height: auto;
  outline: none;
  font-size: 14px;
  min-width: 100%;
  max-width: 100%;
  min-height: 80px;
  box-shadow: none;
  line-height: 1.4;
  padding: 8px 10px;
  font-family: inherit;
  letter-spacing: 0.7px;
  box-sizing: border-box;
  border-radius: 5px 5px 0px 0px;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.inputBackground};
`;

export const Button = styled.button`
  border: none;
  margin: -1px;
  outline: none;
  font-size: 13px;
  cursor: pointer;
  appearance: none;
  box-shadow: none;
  font-weight: 700;
  font-family: inherit;
  min-width: 150px;
  font-weight: 500;
  line-height: 1.1;
  text-shadow: none;
  padding: 12px 25px;
  white-space: nowrap;
  letter-spacing: 0.5px;
  display: inline-block;
  transition: background 0.2s;
  border-radius: 0px 0px 6px 0px;
  color: ${props => props.theme.buttonColor};
  background: ${props => props.theme.buttonBackground};
  &:disabled {
    font-size: 0;
    position: relative;
    &:after {
      top: 26%;
      left: 43%;
      content: '';
      width: 15px;
      height: 15px;
      display: block;
      position: absolute;
      border-radius: 100%;
      animation: ${rotate} 1s linear infinite;
      border: 3px solid ${props => props.theme.buttonColor};
      border-top-color: transparent;
      border-bottom-color: transparent;
    }
  }
  &:hover {
    background: ${props => props.theme.buttonBackgroundHover};
  }
`;

export const Footer = styled.div`
  height: 36px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border-radius: 0 0 2px 2px;
  transition: opacity linear 0.2s;
  border-top: solid 1px ${props => props.theme.borderColor};
`;

export const Form = styled.form`
  font-size: 0;
  line-height: 0;
`;

export const Input = styled.input`
  flex: 1;
  height: auto;
  border: none;
  padding: 8px;
  outline: none;
  font-size: 13px;
  min-width: 10px;
  box-shadow: none;
  appearance: none;
  border-radius: 0;
  font-family: inherit;
  box-sizing: border-box;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.inputBackground};
  border-right: 1px solid ${props => props.theme.borderColor};
  &:first-child {
    border-radius: 0 0 0 5px;
  }
`;
