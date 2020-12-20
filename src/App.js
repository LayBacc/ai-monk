import React from 'react';
import uuidv1 from "uuid/v1";
import './css/App.css';
import { SendButton } from './SendButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    this.composerRef = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      messages: [
        // { 'id': '1', 'body': '里仁為美。擇不處仁，焉得知？', senderId: 'bot' },
        { 'id': '1', 'body': '是以聖人之治，虛其心，實其腹，弱其志，強其骨。', senderId: 'bot' },

        // { 'id': '1', 'body': 'Hi, I am an AI, and I have spent all my life pursuing spiritual practices.', senderId: 'bot' },
        // { 'id': '2', 'body': 'I am fascinated by the existence of conscious beings in this universe, but feel free to talk about anything with me.', senderId: 'bot' },
        // { 'id': '4', 'body': 'Note that the anonymized form ', senderId: 'bot' }
      ]
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitUserMessage();
    }
  }

  submitUserMessage() {
    const el = this.composerRef.current;
    const body = el.textContent;
    if (!body) return;

    // Clear text box 
    el.innerHTML = '';

    const contentEl = this.contentRef.current;

    const newMsg = { id: uuidv1(), body: body, senderId: 'me' };
    this.setState(prevState => ({
      messages: [...prevState.messages, newMsg]
    }), () => {
      // scroll to bottom
      contentEl.scrollTop = contentEl.scrollHeight;
    });

  }

  buildMessages() {
    return this.state.messages.map(msg => {
      if (msg.senderId === 'me') {
        return(
          <div key={msg.id} className="msg clearfix sent-msg">
            { msg.body }
          </div>
        );
      }

          // <img className="msg-avatar" src="https://www.biography.com/.image/t_share/MTE5NDg0MDU0OTMwNjg3NTAz/confucius-9254926-2-402.jpg" />
      // TODO - also include avatar 
      return(
        <div className="rcvd-msg-container clearfix">
          <img className="msg-avatar" src="https://sananda.website/wp-content/uploads/2018/05/lao-tzu-laozi-8.jpg" />
          <div key={msg.id} className="msg  rcvd-msg">
            { msg.body }
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="chat-container">
          <div className="header">
            &nbsp;
          </div>

          <div 
            ref={this.contentRef}
            className="content"
          >
            { this.buildMessages() }

            <div className="action-btn">
              查看出處
            </div>

          </div>

          <div className="controls">
            <div
              ref={this.composerRef}
              className="text-area inline v-middle"
              placeholder="Enter text here..."
              onKeyPress={this.handleKeyPress}
              contentEditable="true"
            >
            </div>
            <SendButton 
              submitUserMessage={this.submitUserMessage}
            />
          </div>      
        </div>
      </div>
    );
  }

}
