import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

export const Title = styled.div`
  line-height: 1;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0px;
  color: ${props => props.theme.textColor};
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SortButton = styled.button<{ $active?: boolean }>`
  padding: 2px 0;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: ${props => props.theme.textColor};
  transition: color 0.2s ease;
  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  ${props => props.$active && `
    color: ${props.theme.linkColor};
    border-bottom: 2px solid ${props.theme.linkColor};
  `}
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
  position: relative;
  // &:after {
  //   content: '';
  //   display: block;
  //   position absolute;
  //   top: 0;
  //   left: -25px;
  //   width: 1px;
  //   height: 80%;
  //   background-color: ${props => props.theme.borderColor};
  // }
`;

export const LoadMore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 16px;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 6px;
  background: transparent;
  color: ${props => props.theme.textColor};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.borderColor};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ShowReplies = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: ${props => props.theme.linkColor};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.linkColorHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
