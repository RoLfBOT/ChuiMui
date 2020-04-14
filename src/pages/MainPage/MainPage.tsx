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
import FaceAsset from '../../assets/face1.gif';

interface IState {
  videoInput: boolean;
  counter: number;
}

class MainPage extends React.Component<{}, IState> {

  public state: IState = {
    videoInput: false,
    counter: 100
  }

  constructor(props: {}) {
    super(props);
    this._ToggleVideoInput = this._ToggleVideoInput.bind(this);
    chrome.runtime.onMessage.addListener(function(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
    });
    this._StorageChangeListener = this._StorageChangeListener.bind(this);
  }

  public componentDidMount(): void {
    chrome.storage.onChanged.addListener(this._StorageChangeListener);
    chrome.storage.sync.get("video", (videoObject) => {
      chrome.storage.sync.get("counter", (counterObject) => {
        this.setState({ counter: counterObject.counter,
                        videoInput: videoObject.video 
        });
      }); 
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
    ) : (this.state.counter === 0) ? (
      <React.Fragment>
        <img src={SimonClapAsset} width = { 140 } height = "auto" style={{ marginRight: 12, borderRadius: 9  }} alt="clap"/>
        <DetailText>
    You haven’t touch your face yet. <DetailTextStrong>You’re doing great! {this.state.counter}</DetailTextStrong>
        </DetailText>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <img src={FaceAsset} width = { 140 } height = "auto" style={{ marginRight: 12, borderRadius: 9  }} alt="clap"/>
        <DetailText>
   You've touched Your face <DetailTextStrong> {this.state.counter} times</DetailTextStrong> today. <br></br>
        <DetailTextStrong>Stop touching your face!</DetailTextStrong>
        </DetailText>
      </React.Fragment>
    )
  }
  private _StorageChangeListener(changes: { [key: string]: chrome.storage.StorageChange}, area: string): void {
    if (area === "sync" && changes.counter) {
      this.setState({ counter: changes.counter.newValue });
    }
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