import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/About/About';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Chat from './components/Chat/Chat';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={currentUser}
        setUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/dashboard" Component={() => <Dashboard userIdDb={currentUser._id} />} />
        <Route path="/about" Component={About} />
        <Route
          path="/login"
          Component={() => <LogIn setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/signup"
          Component={() => <SignUp setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}
        />
      </Routes>
      <Chat />
    </div>
  );
}

export default App;
