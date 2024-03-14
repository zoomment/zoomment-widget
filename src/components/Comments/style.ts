import styled from 'styled-components';

export const Title = styled.div`
  width: 100%;
  line-height: 1;
  font-size: 15px;
  padding: 12px 0;
  font-weight: 700;
  letter-spacing: 0px;
  color: ${props => props.theme.textColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

export const Container = styled.div`
  margin-top: 20px;
`;

export const List = styled.div`
  padding: 20px 10px;
`;

export const NoResult = styled.div`
  opacity: 0.6;
  width: 100%;
  display: flex;
  height: 200px;
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  letter-spacing: 0px;
  justify-content: center;
  color: ${props => props.theme.textColor};
`;

export const Nested = styled.div`
  margin-top: 12px;
`;
