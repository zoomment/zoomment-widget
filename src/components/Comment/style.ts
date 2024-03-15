import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 4px;
  margin: 0 10px 0 0 !important;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  line-height: 1;
  margin-bottom: 4px;
  align-items: center;
  flex-direction: row;
  color: ${props => props.theme.textColorSecondary};
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.textColorSecondary};
  svg {
    color: green;
  }
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  letter-spacing: 0px;
  text-decoration: none;
  color: ${props => props.theme.textColorSecondary};
`;

export const Body = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.3px;
  white-space: break-spaces;
  color: ${props => props.theme.textColor};
`;

export const Action = styled.button`
  font-size: 13px;
  padding: 4px 0px;
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  text-decoration: none;
  border-radius: 6px;
`;

export const Reply = styled(Action)`
  color: ${props => props.theme.buttonBackground};
  &:hover,
  &:visited,
  &:focus {
    color: ${props => props.theme.buttonBackgroundHover};
  }
`;

export const Delete = styled(Action)`
  color: ${props => props.theme.textColorSecondary};
  padding-top: 0;
  padding-bottom: 0;
  &:hover,
  &:visited,
  &:focus {
    color: ${props => props.theme.textColor};
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const Content = styled.div`
  width: 100%;
`;
