import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendChatToOpenAI } from './openAI';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am CloneGPT, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const response = await sendChatToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: response, isBot: true }
    ]);
  }

  const handleEnterKey = async (e) => {
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery= async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const response = await sendChatToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: response, isBot: true }
    ]);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="logo" className="logo" /><span className="brand">CloneGPT</span></div>
            <button className="midBtn" onClick={() => {window.location.reload}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
            <div className="upperSideBottom">
              <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="query" />What is Programming?</button>
              <button className="query" onClick={handleQuery} value={"How to use and API?"}><img src={msgIcon} alt="query" />How to use an API?</button>
            </div>
          </div>
          <div className="lowerSide">
            <div className="listItems"><img src={home} alt="home" className="listitemsImg" />Home</div>
            <div className="listItems"><img src={saved} alt="saved" className="listitemsImg" />Saved</div>
            <div className="listItems"><img src={rocket} alt="upgrade" className="listitemsImg" />Upgrade to Pro</div>
          </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot?"chat bot":"chat"}>
              <img className="chatImg" src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{ message.text }</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="input">
            <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnterKey} onChange={(e) => {setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
          <p>CloneGPT may produce inaccurate information about people, places, or facts. CloneGPT August 20 version.</p>
        </div>
      </div>
    </div>
  )
}

export default App