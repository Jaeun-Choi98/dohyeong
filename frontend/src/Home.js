export default function Home(props) {
  const bold = {
    fontWeight: 'bold',
  };

  return (
    <div className='container mt-5'>
      {props.alert === true ? (
        <div className='row'>
          <div className='alert alert-dark' role='alert'>
            회원 가입 시, 실제 이메일을 넣지 않아도 됩니다. 그리고, 자주
            사용하는 비밀번호로 설정하지 말아 주세요!!
            <strong>(++로그인을 했다면, 꼭 로그아웃을 해주세요!!)</strong>
            <button
              type='button'
              className='btn-close mx-5'
              data-bs-dismiss='alert'
              aria-label='Close'
              onClick={() => {
                props.closeAlert();
              }}
            ></button>
          </div>
        </div>
      ) : null}
      <div className='row'>
        <div className='col-sm-8'>
          <div className='card mb-3' style={{ maxWidth: '540px' }}>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img
                  src='img/profile.jpg'
                  alt='프로필 사진'
                  className='img-fluid rounded-start'
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>김도형</h5>
                  <p className='card-text'>시대 인재</p>
                  <p className='card-text'>
                    <small className='text-body-secondary'>
                      한국지리/세계지리 JIT 시리즈 대표 저자
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5 pt-3'>
        <div className='col-md-10 g-10'>
          <h2 style={bold}>수능 지리 컨텐츠팀 Team Plume 소속 김도형입니다.</h2>
          <hr />
          <ul>
            <li>
              Team Plume은 수능 지리 컨텐츠를 전문적으로 제작하는 팀으로 수능
              지리 만점을 위한 고퀄리티 컨텐츠를 제작합니다.
            </li>
            {/* 나머지 내용... */}
          </ul>
          <br />
          <br />
          <h2 style={bold}>2025학년도 Plume 지리 컨텐츠팀 출판 라인업</h2>
          <hr />
          <ul>
            <li>추후 공지</li>
            {/* 나머지 내용... */}
          </ul>
        </div>
      </div>
    </div>
  );
}
