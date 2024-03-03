import styled from 'styled-components';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

export const ErrorMessage = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  position: relative;
  background: #e33725;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  padding: 5px 30px 5px 10px;
`;

export const Close = styled(CloseOutlined)`
  position: absolute;
  right: 12px;
  top: 9px;
`;
