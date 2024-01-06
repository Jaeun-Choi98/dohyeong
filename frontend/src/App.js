import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Nav from './Navigation';
import Home from './Home';
import BookContainer from './Book';
import BoardContainer, { BoardDetail } from './Board';
import ErrorNotFoundPage from './ErrorNotFoundPage';
import { SignInModalWindow } from './modalwindows';
import FormBoard from './FormBoard';

export default function App() {
  // 사용자 로그인 및 로그아웃을 위한 스테이트 및 함수
  // admin: 관리자를 위한 속성
  const _user = { loggedIn: 0 };
  const [user, setUser] = useState(_user);
  const signIn = (object) => {
    if (object.loggedIn === 1) {
      const newUser = {
        userId: object.userId,
        userName: object.userName,
        loggedIn: object.loggedIn,
        admin: object.admin,
      };
      setUser(newUser);

      // 로그인 정보를 로컬 스토리지에 저장
      localStorage.setItem('isLoggedIn', object.loggedIn);
      localStorage.setItem('userId', object.userId);
      localStorage.setItem('userName', object.userName);
      localStorage.setItem('admin', object.admin);

      // 토큰 정보도 저장
      localStorage.setItem('token', object.token);

      console.log('로그인 성공');
    } else {
      console.log('회원가입 성공');
    }
    toggleSignInModalWindow();
  };

  const logOut = () => {
    console.log('로그아웃 중');
    // const newUser = { loggedIn: 0 };
    // setUser(newUser);

    // 로그아웃 시 로컬 스토리지에서 관련 정보 제거
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('admin');

    window.location.reload();
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

  // 페이지가 리로드 될 때, 로그인 유지
  useEffect(() => {
    // 페이지가 처음 로드될 때 로컬 스토리지에서 사용자 정보 확인
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === '1') {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const admin = localStorage.getItem('admin');

      // 사용자 정보를 상태로 설정
      const newUser = {
        userId: userId,
        userName: userName,
        loggedIn: 1,
        admin: admin === '1' ? 1 : 0,
      };
      setUser(newUser);
    }
  }, []);

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
        <Route
          path='/board'
          element={<BoardContainer loc='/boards' user={user} />}
        ></Route>
        <Route path='*' Component={ErrorNotFoundPage}></Route>
        <Route
          path='/board/:boardId'
          element={<BoardDetail user={user} />}
        ></Route>
        <Route path='/board/new' element={<FormBoard user={user} />}></Route>
      </Routes>
      <SignInModalWindow
        signIn={signIn}
        showModal={showSignIn}
        toggle={toggleSignInModalWindow}
      />
    </div>
  );
}
