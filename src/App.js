import logo from './logo.svg';
import './App.css';
import MessageStream  from './components/MessageStream';
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
      </div>
      <div className="input">
        <textarea id="chatInput"></textarea>
        <MessageStream />
        <button id="submit-chat">Submit</button>
      </div>
    </div>
  );
}

export default App;
