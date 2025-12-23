import styled from 'styled-components';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

const Message = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  position: relative;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  padding: 5px 30px 5px 10px;
`;

export const ErrorMessage = styled(Message)`
  background: ${props => props.theme.errorColor};
`;

export const SuccessMessage = styled(Message)`
  background: ${props => props.theme.successColor};
`;

export const Close = styled(CloseOutlined)`
  position: absolute;
  right: 12px;
  top: 9px;
  cursor: pointer;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;
