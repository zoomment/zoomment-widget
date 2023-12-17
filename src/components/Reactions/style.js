import styled from 'styled-components';

export const ContentBubbleContainer = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentBubble = styled.button`
  border: none;
  cursor: pointer;
  padding: 6px;
  margin: 4px;
  border-radius: 10px;
  color: #555555;
  background: #f2f2f2;
  font-size: 20px;
  user-select: none;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    background: #cbe9ff;
  }

  ${props =>
    props.$selected &&
    `
      background: #56a7e1;
      color: white;
      &:hover {
        background: #56a7e1;
        color: white;
      }
  `}
`;

export const ContentBubbleCount = styled.span`
  padding-left: 4px;
  font-size: 16px;
`;
