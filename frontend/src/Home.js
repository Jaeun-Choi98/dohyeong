export default function Home() {
  const bold = {
    fontWeight: 'bold',
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-8'>
          <div className='card mb-3' style={{ maxWidth: '540px' }}>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img
                  src='img/blackguitar.jpeg'
                  alt='프로필 사진'
                  className='img-fluid rounded-start'
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>이름</h5>
                  <p className='card-text'>경력사항</p>
                  <p className='card-text'>
                    <small className='text-body-secondary'>
                      현재 근무하는 곳
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
          <h2 style={bold}>안녕하세요. XXX 입니다.</h2>
          <hr />
          <ul>
            <li>
              새로운 기술을 배우고 적용하여 더 나은 결과물을 만들기 위해
              노력합니다. 다양한 경험을 중요시하며, 계속해서 성장해 나가는 것을
              목표로 합니다.
            </li>
            {/* 나머지 내용... */}
          </ul>
          <br />
          <h2 style={bold}>Skill</h2>
          <hr />
          <ul>
            <li>
              <strong>TEST1</strong>
              <br />
              TEST1...
            </li>
            {/* 나머지 내용... */}
          </ul>
        </div>
      </div>
    </div>
  );
}
