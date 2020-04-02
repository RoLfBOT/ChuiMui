import React from 'react';
import GetStartedPage from './pages/GetStartedPage';
import MainPage from './pages/MainPage';

interface IState {
  mediaPermission: boolean;
};

class App extends React.Component<{}, IState> {
  public state: IState = {
    mediaPermission: false
  };

  public componentDidMount(): void {
    chrome.storage.sync.get("media", (mediaPermission: { [key: string]: any }) => {
      this.setState({ mediaPermission: mediaPermission.media });
    });
  }

  public render(): JSX.Element {
    const { mediaPermission } = this.state;
    return (
      mediaPermission ?
        <MainPage />
         : <GetStartedPage />  
    );
  }
}

export default App;
