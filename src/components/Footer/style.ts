import styled from 'styled-components';
import HeartFilled from '@ant-design/icons/HeartFilled';

export const Container = styled.div`
  width: 100%;
  line-height: 1;
  font-size: 11px;
  padding: 8px 10px;
  text-align: right;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  color: ${props => props.theme.textMuted};
`;

export const Link = styled.a`
  padding: 0 5px;
  color: ${props => props.theme.linkColor};
  font-weight: 500;
  text-decoration: underline;
`;

export const Heart = styled(HeartFilled)`
  color: ${props => props.theme.errorColor};
`;
