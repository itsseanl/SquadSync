import logo from "./logo.svg";
import "./App.css";
import MessageStream from "./components/MessageStream";
import MessageBox from "./components/MessageBox";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
        <LoginButton />
        <LogoutButton />
      </header>
      <div className="wrapper">
        {isAuthenticated ? (
          <div className="authed">
            <div className="chatbox">
              <MessageStream />
            </div>
            <MessageBox />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
