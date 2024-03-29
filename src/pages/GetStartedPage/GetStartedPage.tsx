/*global chrome*/

import * as React from 'react';
import { ExtensionContainer } from '../../styles';
import {
  AppHeaderContent,
  AppDescription,
  PrimaryButton,
  MainImg
} from './styles';
import Illustration from '../../assets/art.svg';

class GetStartedPage extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
    this._handleGetStarted = this._handleGetStarted.bind(this);
  }

  public render(): JSX.Element {
    return (
      <ExtensionContainer padding={true}>
        <AppHeaderContent>CHUIMUI</AppHeaderContent>
        <AppDescription>
          Touch your face too much and dont realize it? Allow ChuiMui to use your WebCam to alert you when you do.
        </AppDescription>
        <PrimaryButton
          onClick={ this._handleGetStarted }
        >
          Get Started
        </PrimaryButton>
        <MainImg src={Illustration} />
      </ExtensionContainer>
    );
  }

  private _handleGetStarted(): void {
    
    chrome.storage.sync.set({"counter": 0});
    chrome.storage.sync.set({ "start": true });
  }
}

export default GetStartedPage;