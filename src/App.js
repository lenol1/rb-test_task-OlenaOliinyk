import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/access/Login.js";
import Main from './components/Main.js';
import { ChatProvider } from "./components/messanger/controllers/ChatContext.js";

function App() {
  return (
    <Router>
      <ChatProvider>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;