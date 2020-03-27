import * as React from 'react';
import {
  GetStartedContainer,
  AppHeader,
  AppHeaderContent,
  AppContent,
  AppDescription,
  PrimaryButton,
  MainImg
} from './styles';
import Illustration from '../../assets/art.svg';

class GetStartedPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <GetStartedContainer>
        <AppHeaderContent>ChuiMui</AppHeaderContent>
        <AppDescription>
          Touch your face too much and dont realize it? Allow ChuiMui to use your WebCam to alert you when you do.
        </AppDescription>
        <PrimaryButton>Get Started</PrimaryButton>
        <MainImg src={Illustration} />
      </GetStartedContainer>
    );
  }
}

export default GetStartedPage;