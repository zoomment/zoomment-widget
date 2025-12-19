import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  background: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
  font-size: 14px;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const Count = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

export const Label = styled.span`
  font-weight: 400;
  opacity: 0.8;
`;

