import React from 'react';
import GetStartedPage from './pages/GetStartedPage';
import MainPage from './pages/MainPage';

interface IState {
  notFirstLaunch: boolean;
};

class App extends React.Component<{}, IState> {
  public state: IState = {
    notFirstLaunch: false
  };

  public constructor(props: {}) {
    super(props);
    this._StorageChangeListener = this._StorageChangeListener.bind(this);
  }

  public componentDidMount(): void {
    chrome.storage.onChanged.addListener(this._StorageChangeListener);

    chrome.storage.sync.get("start", (startObj: { [key: string]: any }) => {
      this.setState({ notFirstLaunch: startObj.start });
    });
  }

  public render(): JSX.Element {
    const { notFirstLaunch } = this.state;
    return (
      notFirstLaunch ?
        <MainPage />
         : <GetStartedPage />  
    );
  }

  private _StorageChangeListener(changes: { [key: string]: chrome.storage.StorageChange}, area: string): void {
    if (area === "sync" && changes.start) {
      this.setState({ notFirstLaunch: changes.start.newValue });
    }
  }
}

export default App;
