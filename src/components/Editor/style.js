import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0;
  appearance: none;
  position: relative;
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid ${props => props.theme.borderColor};
`;

export const Textarea = styled.textarea`
  border: 0;
  margin: 0;
  width: 100%;
  outline: none;
  font-size: 14px;
  min-width: 100%;
  max-width: 100%;
  min-height: 80px;
  box-shadow: none;
  line-height: 1.4;
  padding: 8px 10px;
  letter-spacing: 0.7px;
  box-sizing: border-box;
  font-family: monospace;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.inputBackground};
`;

export const Button = styled.button`
  border: none;
  margin: -2px;
  outline: none;
  font-size: 13px;
  cursor: pointer;
  appearance: none;
  box-shadow: none;
  font-weight: 700;
  min-width: 150px;
  font-weight: 500;
  line-height: 1.1;
  text-shadow: none;
  border-radius: 3px;
  padding: 12px 30px;
  white-space: nowrap;
  letter-spacing: 1px;
  display: inline-block;
  border-radius: 0 0 3px;
  font-family: sans-serif;
  transition: background 0.2s;
  color: ${props => props.theme.buttonColor};
  background: ${props => props.theme.buttonBackground};
`;

export const Footer = styled.div`
  height: 36px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border-radius: 0 0 2px 2px;
  transition: opacity linear 0.2s;
  border-top: solid 2px ${props => props.theme.borderColor};
`;

export const Form = styled.form`
  font-size: 0;
  line-height: 0;
`;

export const Input = styled.input`
  flex: 1;
  font-size: 13px;
  border: none;
  padding: 8px;
  outline: none;
  min-width: 10px;
  box-shadow: none;
  appearance: none;
  border-radius: 0;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  font-family: sans-serif;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.inputBackground};
  border-right: 2px solid ${props => props.theme.borderColor};
`;
