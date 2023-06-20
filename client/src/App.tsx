import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({ _id: "", email: "", name: "" });
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
