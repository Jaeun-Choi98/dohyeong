import { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function submitRequest(path, requestBody, handleSignedIn, handleError) {
  fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('응답 받는 중');
      if (json.error === undefined) {
        handleSignedIn(json);
        handleError('');
      } else {
        handleError(json.error);
      }
    })
    .catch((error) => console.log(error));
}

export function SingInForm(props) {
  const [errormsg, setErrormsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 사용자가 데이터 입력하면 호출
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  // 폼을 제출하면 호출
  const handleSubmit = (e) => {
    e.preventDefault();
    // 'users/signin'
    submitRequest(
      '/users/signin',
      { email: email, password: password },
      props.signIn,
      handleError
    );
  };

  const handleError = (error) => {
    setErrormsg(error);
  };

  let msg = null;
  if (errormsg.length !== 0) {
    msg = <h5>{errormsg}</h5>;
  }
  return (
    <div className='login-form'>
      {msg}
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <br />
        <input
          type='email'
          id='email'
          name='email'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          type='password'
          id='password'
          name='password'
          required
          onChange={handleChange}
        />
        <br />
        <br />
        <button type='submit'>로그인</button>
        <button
          type='submit'
          onClick={() => {
            props.showRegisterForm();
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export function RegisterForm(props) {
  const [errormsg, setErrormsg] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [name, setName] = useState('');

  // 사용자가 데이터 입력하면 호출
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'pass1') {
      setPass1(e.target.value);
    } else if (e.target.name === 'pass2') {
      setPass2(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  // 폼을 제출하면 호출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      //alert("패스워드가 일치하지 않습니다.");
      return;
    }

    const requestBody = {
      email: email,
      password: pass1,
      userName: name,
    };
    submitRequest('/users', requestBody, props.signIn, handleError);
    console.log('회원가입 Form: ' + requestBody);
  };

  const handleError = (error) => {
    setErrormsg(error);
  };

  let msg = null;
  if (errormsg.length !== 0) {
    msg = <h5>{errormsg}</h5>;
    console.log(errormsg);
  }
  return (
    <div className='register-form'>
      {msg}
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>닉네임:</label>
        <br />
        <input
          type='text'
          id='name'
          name='name'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <br />
        <input
          type='email'
          id='email'
          name='email'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='pass1'>New Password:</label>
        <br />
        <input
          type='password'
          id='pass1'
          name='pass1'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='pass2'>Check Password:</label>
        <br />
        <input
          type='password'
          id='pass2'
          name='pass2'
          required
          onChange={handleChange}
        />
        <br />
        <br />
        <button
          type='submit'
          onClick={() => {
            props.showSignInForm();
          }}
        >
          뒤로가기
        </button>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
}

export function SignInModalWindow(props) {
  const [showRegister, setShowRegister] = useState(false);
  const showRegisterForm = () => {
    setShowRegister(true);
  };
  const showSignInForm = () => {
    setShowRegister(false);
  };
  let modalBody = (
    <SingInForm signIn={props.signIn} showRegisterForm={showRegisterForm} />
  );
  if (showRegister === true) {
    modalBody = (
      <RegisterForm signIn={props.signIn} showSignInForm={showSignInForm} />
    );
  }
  return (
    <Modal
      id='register'
      tabIndex='-1'
      role='dialog'
      isOpen={props.showModal}
      toggle={props.toggle}
    >
      <div role='document'>
        <ModalHeader toggle={props.toggle} className='bg-success text-white'>
          Sign in
          {/*<button classNameName="close">
                        <span aria-hidden="true">&times;</span>
                     </button>*/}
        </ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
      </div>
    </Modal>
  );
}
