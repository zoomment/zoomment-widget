import styled from 'styled-components';

export const Profile = styled.div`
  width: 100%;
  line-height: 1;
  font-size: 11px;
  padding: 10px 10px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
  display: flex;
  align-items: center;
`;

export const Logout = styled.span`
  line-height: 1;
  font-size: 11px;
  font-weight: 700;
  color: #e33725;
  text-decoration: underline;
  cursor: pointer;
`;
