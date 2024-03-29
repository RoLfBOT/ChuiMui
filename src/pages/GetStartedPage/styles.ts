import styled from '../../config/styled-components';

export const AppHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

export const AppHeaderContent = styled.h1`
  font-family: Ubuntu;
  font-size: 14px;
  line-height: 15px;
  color: #fff;
  font-weight: bold;
`;

export const AppContent = styled.div`
  padding: 16px;
  flex: 1;
  width: 160px;
  box-sizing: border-box;
`;

export const AppDescription = styled.p`
  font-family: Space Mono;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  width: 160px;
`;

export const PrimaryButton = styled.button`
  width: 110px;
  height: 27px;
  margin-bottom: 24px;
  border: none;
  font-family: Space Mono;
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  background-color: #FFCD69;
  color: #6418C3;
  cursor: pointer;
  border-radius: 29px;
`;

export const MainImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;