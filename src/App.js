import logo from './logo.svg';
import './App.css';
import MessageStream  from './components/MessageStream';
import MessageBox from './components/MessageBox';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          squadsync
        </a>
      </header>
      <div className="chatbox">
        <MessageStream />
      </div>
     <MessageBox />
    </div>
  );
}

export default App;
