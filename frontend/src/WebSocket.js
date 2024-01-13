import React, { useState, useEffect, useRef } from 'react';

const WebSocketComponent = (props) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  const token = localStorage.getItem('token');

  // 채팅이 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    // WebSocket 연결 시 헤더에 Authorization 토큰 추가
    socketRef.current = new WebSocket(`ws://${window.location.hostname}/ws`);

    socketRef.current.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });

    socketRef.current.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.error === undefined) {
        setChat((prevChat) => [...prevChat, receivedMessage]);
      } else {
        setMessage('로그인 후 이용해 주세요.');
      }
    });

    socketRef.current.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

    // 에러 처리
    socketRef.current.addEventListener('error', (event) => {
      console.log('WebSocket error:', event);
      // 여기에서 에러 처리 로직을 추가하면 됩니다.
    });

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const newMessage = {
        user: props.user.userName,
        content: message,
        token: `Bearer ${token}`,
      };
      socketRef.current.send(JSON.stringify(newMessage));
      setMessage('');
    }
  };

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-8'>
          <div className='card'>
            <div
              className='card-body overflow-auto'
              ref={chatContainerRef}
              style={{
                height: '300px',
                maxHeight: '300px',
              }}
            >
              {chat.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.user}:</strong> {msg.content}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-8'>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='메시지 입력하기...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='btn btn-primary mx-3' onClick={sendMessage}>
              보내기
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => window.location.reload()}
            >
              새로 고침
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
