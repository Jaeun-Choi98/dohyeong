import './Home.css';

export default function Home() {
  return (
    <div className='home-content'>
      <div className='profile-info'>
        <img src='img/blackguitar.jpeg' alt='프로필 사진' />
        <h2>이름</h2>
        <p>
          경력 사항
          <br />
          AAA
        </p>
      </div>
      <div className='bio'>
        <h2>안녕하세요. XXX 입니다.</h2>
        <hr />
        <ul>
          <li>
            새로운 기술을 배우고 적용하여 더 나은 결과물을 만들기 위해
            노력합니다. 다양한 경험을 중요시하며, 계속해서 성장해 나가는 것을
            목표로 합니다.
          </li>
          <li>
            또한, 탐구하는 것을 좋아합니다. 코드를 작성하고 문제를 해결하는 것을
            즐기며 다양한 테스트 케이스를 활용하여 실행해보며 분석하는 활동을
            즐겨합니다.
          </li>
          <li>
            마지막으로, 팀원들과의 원활한 소통을 중요시합니다. 아이디어를 나누고
            협업하여 효과적으로 문제를 해결하며, 팀의 목표를 달성하기 위해
            노력합니다. 더 나아가 함께 성장하는 것을 추구합니다.
          </li>
        </ul>
        <br></br>
        <h2>Skill</h2>
        <hr />
        <ul>
          <li>
            <strong>TEST1</strong>
            <br />
            TEST1...
          </li>
          <li>
            <strong>TEST2</strong>
            <br />
            TEST2...
          </li>
          <li>
            <strong>TEST3</strong>
            <br />
            TEST3...
          </li>
        </ul>
      </div>
    </div>
  );
}
