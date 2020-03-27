import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import {
  MainContainer,
  MainHeader,
  MainHeaderContent,
  ControlGroup,
  InputIndicatorSpan,
  PrimarySwitch,
  DetailSection,
  DetailText
} from './styles';

interface IState {
  videoInputToggle: boolean;
}

class MainPage extends React.Component<{}, IState> {

  public state: IState = {
    videoInputToggle: false
  }

  constructor(props: {}) {
    super(props);
    this._HandleChange = this._HandleChange.bind(this);
  }

  private _HandleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ videoInputToggle: event.target.checked });
  }

  public render(): JSX.Element {
    const { videoInputToggle } = this.state;
    const inputIndicator = videoInputToggle ? "On" : "Off";
    return (
      <MainContainer>
        <MainHeader>
          <MainHeaderContent>Touch me not</MainHeaderContent>
          <ControlGroup>
            <InputIndicatorSpan>{inputIndicator}</InputIndicatorSpan>
            <label>
              <PrimarySwitch
                checked={videoInputToggle}
                onChange={this._HandleChange}
              />
            </label>
            <IconButton iconProps={{ iconName: 'Settings' }} />
          </ControlGroup>
        </MainHeader>
        <DetailSection>
          <DetailText>You touched your face 6 times today</DetailText>
        </DetailSection>
      </MainContainer>
    );
  }
}

export default MainPage;