import styled from 'styled-components';
import { HeartFilled } from '@ant-design/icons';

export const Container = styled.div`
  width: 100%;
  font-size: 11px;
  padding: 8px 0;
  text-align: right;
  letter-spacing: 0px;
  letter-spacing: 0.5px;
  font-family: sans-serif;
  color: ${(props) => props.theme.textColorSecondary};
`;

export const Link = styled.a`
  padding: 0 5px;
  color: #4c85f2;
  font-weight: 500;
  text-decoration: underline;
`;

export const Heart = styled(HeartFilled)`
  color: #f42d2d;
`;
