import styled from 'styled-components';

export const ContentBubbleContainer = styled.div`
  min-height: 50px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContentBubble = styled.button<{ $selected: boolean }>`
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: 4px;
  min-height: 36px;
  min-width: 36px;
  border-radius: 4px;
  font-size: 20px;
  user-select: none;
  line-height: 1;
  display: flex;
  align-items: center;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.inputBackground};

  &:hover {
    color: ${props => props.theme.buttonColor};
    background: ${props => props.theme.buttonBackgroundHover};
  }

  ${props =>
    props.$selected &&
    `
      background: ${props.theme.buttonBackground};
      color: ${props.theme.buttonColor};
  `}
`;

export const ContentBubbleCount = styled.span`
  padding-left: 4px;
  font-size: 16px;
`;
