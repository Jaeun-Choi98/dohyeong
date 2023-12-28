import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Nav from './Navigation';
import Home from './Home';
import BookContainer from './Book';
import BoardContainer, { BoardDetail } from './Board';
import ErrorNotFoundPage from './ErrorNotFoundPage';
import { SignInModalWindow } from './modalwindows';

export default function App() {
  // 사용자 로그인 및 로그아웃을 위한 스테이트 및 함수
  // admin: 관리자를 위한 속성
  const _user = { loggedIn: 0 };
  const [user, setUser] = useState(_user);
  const signIn = (object) => {
    object.loggedIn === 1
      ? console.log('로그인 중')
      : console.log('회원가입 성공');

    const newUser = {
      userId: object.userId,
      userName: object.userName,
      loggedIn: object.loggedIn,
      admin: object.admin,
    };
    setUser(newUser);
    toggleSignInModalWindow();
  };

  const logOut = () => {
    console.log('로그아웃 중');
    const newUser = { loggedIn: 0 };
    setUser(newUser);
  };

  // 모달의 열고 닫기를 위한 스테이트 및 함수
  const [showSignIn, setShowSignIn] = useState(false);
  const showSignInModalWindow = () => {
    setShowSignIn(true);
  };
  const toggleSignInModalWindow = () => {
    setShowSignIn(false);
  };

  // 경고문 닫기 위한 스테이트 및 함수
  const [alert, setAlert] = useState(true);
  const closeAlert = () => {
    setAlert(false);
  };

  return (
    <div>
      <Nav
        user={user}
        logOut={logOut}
        showSignInModalWindow={showSignInModalWindow}
      />
      <Routes>
        <Route
          path='/'
          element={<Home alert={alert} closeAlert={closeAlert} />}
        ></Route>
        <Route path='/book' element={<BookContainer loc='/books' />}></Route>
        {user.admin === 1 ? null : null}
        <Route path='/board' element={<BoardContainer loc='/boards' />}></Route>
        <Route path='*' Component={ErrorNotFoundPage}></Route>
        <Route path='/board/:boardId' element={<BoardDetail />}></Route>
      </Routes>
      <SignInModalWindow
        signIn={signIn}
        showModal={showSignIn}
        toggle={toggleSignInModalWindow}
      />
    </div>
  );
}
