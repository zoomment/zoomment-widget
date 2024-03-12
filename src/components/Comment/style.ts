import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  flex-shrink: 0;
  height: 40px;
  border-radius: 4px;
  margin: 0 10px 0 0 !important;
`;

export const Head = styled.div`
  display: flex;
  font-size: 8px;
  line-height: 1;
  margin-bottom: 4px;
  align-items: center;
  flex-direction: row;
  color: ${props => props.theme.textColorSecondary};
`;

export const Username = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
  letter-spacing: 0.5px;
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

export const Date = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  letter-spacing: 0px;
  text-decoration: none;
  color: ${props => props.theme.textColorSecondary};
`;

export const Action = styled.button`
  font-size: 13px;
  margin-top: 4px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
  text-decoration: underline;
  color: ${props => props.theme.buttonBackground};
  &:hover,
  &:visited,
  &:focus {
    color: ${props => props.theme.buttonBackgroundHover};
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const Content = styled.div`
  overflow: hidden;
  width: 100%;
`;
