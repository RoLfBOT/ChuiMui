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
    this._HandleChange = this._HandleChange.bind(this);
  }

  private _HandleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ videoInput: event.target.checked });
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
                onChange={this._HandleChange}
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

  private _RenderDetailsSection(): JSX.Element {
    const { videoInput } = this.state;
    return !videoInput ? (
      <React.Fragment>
        <img src={NoVideoAsset} style={{ width: 47, height: 47, marginBottom: 9 }} alt="no video input" />
        <DetailText>ChuiMui is off. Remember to wash your hands frequenty and avoid touching your face.</DetailText>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <img src={SimonClapAsset} style={{ width: 140, height: 120, marginRight: 12, borderRadius: 9  }} alt="clap"/>
        <DetailText>
          You haven’t touch your face yet. <DetailTextStrong>You’re doing great!</DetailTextStrong>
        </DetailText>
      </React.Fragment>
    )
  }
}

export default MainPage;