import styled from 'styled-components';
import DeleteTwoTone from '@ant-design/icons/DeleteTwoTone';

export const Title = styled.div`
  width: 100%;
  line-height: 1;
  font-size: 15px;
  padding: 12px 0;
  font-weight: 700;
  letter-spacing: 0px;
  color: ${props => props.theme.textColor};
  border-bottom: 2px solid ${props => props.theme.borderColor};
`;

export const Delete = styled(DeleteTwoTone)`
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

export const Container = styled.div`
  margin-top: 20px;
`;

export const List = styled.div`
  padding: 20px 10px;
`;

export const Item = styled.div`
  clear: both;
  margin-bottom: 24px;
`;

export const Avatar = styled.img`
  width: 50px;
  float: left;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
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
  font-size: 15px;
  font-weight: 400;
  min-height: 24px;
  line-height: 24px;
  letter-spacing: 0.3px;
  white-space: break-spaces;
  color: ${props => props.theme.textColor};
`;

export const Date = styled.a`
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  letter-spacing: 0px;
  text-decoration: none;
  color: ${props => props.theme.textColorSecondary};
  &:hover {
    color: inherit;
    text-decoration: underline;
  }
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
