import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { ExtensionContainer } from '../../styles';
import {
  MainHeader,
  MainHeaderContent,
  ControlGroup,
  InputIndicatorSpan,
  PrimarySwitch,
  DetailSection,
  DetailText,
  DetailTextStrong,
  SettingsButtonStyles
} from './styles';
import NoVideoAsset from '../../assets/novideo.svg';
import SimonClapAsset from '../../assets/simon.gif';

interface IState {
  videoInput: boolean;
}

class MainPage extends React.Component<{}, IState> {

  public state: IState = {
    videoInput: false
  }

  constructor(props: {}) {
    super(props);
    this._ToggleVideoInput = this._ToggleVideoInput.bind(this);
    chrome.runtime.onMessage.addListener(function(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
      console.log(message);
    });
  }

  public componentDidMount(): void {
    chrome.storage.sync.get("video", (videoObject) => {
      this.setState({ videoInput: videoObject.video });
    }); 
  }

  public render(): JSX.Element {
    const { videoInput } = this.state;
    const inputIndicator = videoInput ? "On" : "Off";
    return (
      <ExtensionContainer padding={false}>
        <MainHeader>
          <MainHeaderContent>CHUIMUI</MainHeaderContent>
          <ControlGroup>
            <InputIndicatorSpan>{inputIndicator}</InputIndicatorSpan>
            <label>
              <PrimarySwitch
                checked={videoInput}
                onChange={this._ToggleVideoInput}
              />
            </label>
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              styles={SettingsButtonStyles}
            />
          </ControlGroup>
        </MainHeader>
        <DetailSection direction={ videoInput ? 'row' : 'column' }>
          { this._RenderDetailsSection() }
        </DetailSection>
      </ExtensionContainer>
    );
  }

  /**
   * 
   * @memberof MainPage
   * @description renders the main extension content
   * @returns The main content of the extension app
   */
  private _RenderDetailsSection(): JSX.Element {
    const { videoInput } = this.state;
    return !videoInput ? (
      <React.Fragment>
        <img src={NoVideoAsset} style={{ width: 47, height: 47, marginBottom: 9 }} alt="no video input" />
        <DetailText>ChuiMui is off. Remember to wash your hands frequenty and avoid touching your face.</DetailText>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <img src={SimonClapAsset} width = { 140 } height = "auto" style={{ marginRight: 12, borderRadius: 9  }} alt="clap"/>
        <DetailText>
          You haven’t touch your face yet. <DetailTextStrong>You’re doing great!</DetailTextStrong>
        </DetailText>
      </React.Fragment>
    )
  }

  /**
   * @memberof MainPage
   * @param event The onChange event of Switch
   * @description Sets the state for the toggle switch for video input
   */
  private _ToggleVideoInput(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ videoInput: event.target.checked }, () => {
      this.state.videoInput ?
        chrome.tabs.create({ url: chrome.extension.getURL("mediaPermission.html"), active: false, pinned: true })
          : chrome.tabs.query({ 
              url: chrome.extension.getURL("mediaPermission.html"), 
              pinned: true
            }, (result: chrome.tabs.Tab[]) => {
            const tabId = result[0].id as number;
            chrome.tabs.remove(tabId);
          });
    });
    chrome.storage.sync.set({ "video": event.target.checked }, () => {
      chrome.runtime.sendMessage(`video_input_changed`)
    });
  }
}

export default MainPage;