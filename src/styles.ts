import styled, { StyledProps } from './config/styled-components';

interface IExtensionContainerProps {
  padding?: boolean;
};

type ExtensionContainerProps = StyledProps<IExtensionContainerProps>;

export const ExtensionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 240px;
  width: 330px;
  justify-content: space-between;
  border-radius: 6px;
  padding: ${(props: ExtensionContainerProps) => props.padding ? '20px' : ' 0' };
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
  background: #6418C4;
`;