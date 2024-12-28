import React, { useState } from 'react';
import UserInfo from './user/UserInfo';
import './styles/Main.css';
import ChatList from './messanger/chat/ChatList';
import ChatSearch from './messanger/chat/ChatSearch';
import ChatWindow from './messanger/chat/ChatWindow';

function Main() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className='Appboxes'>
      <div>
        <div>
          <UserInfo />
          <div>
            <ChatSearch onSearch={handleSearch} />
          </div>
        </div>
        <div>
          <ChatList searchTerm={searchTerm} />
        </div>
      </div>
      <div id='messageBlock'>
        <ChatWindow />
      </div>
    </div>
  );
}

export default Main;