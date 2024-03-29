import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(props) {
  const token = localStorage.getItem('token');
  const logOut = (e) => {
    e.preventDefault();
    console.log('로그아웃: ' + props.user);
    fetch('/users/signout/' + props.user.userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    props.logOut();
  };

  const loggedInMenu = () => {
    return (
      <div className='login-btn'>
        <span className='welcome'>{props.user.userName}</span>
        <button type='button' className='btn-a' onClick={logOut}>
          로그아웃
        </button>
      </div>
    );
  };

  return (
    <div>
      <nav>
        <div className='logo'></div>
        <ul className='nav-links'>
          <li className='nav-item'>
            <Link to='/'>프로필</Link>
          </li>
          <li className='nav-item'>
            <Link to='/book'>교재</Link>
          </li>
          <li>
            <Link to='/board'>게시판</Link>
          </li>
          <li>
            <Link to='/chat'>채팅방</Link>
          </li>
        </ul>
        {props.user.loggedIn === 1 ? (
          loggedInMenu()
        ) : (
          <div className='login-btn'>
            <button
              type='button'
              className='btn-a'
              onClick={() => {
                props.showSignInModalWindow();
              }}
            >
              로그인
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
