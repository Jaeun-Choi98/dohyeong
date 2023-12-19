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
          개똥벌레
        </p>
      </div>
      <div className='bio'>
        <h2>안녕하세요. 교재개발 달인 김도형입니다.</h2>
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
        <h2>Skill</h2>
        <hr />
        <ul>
          <li>
            <strong>Java</strong>
            <br />
            자바를 사용한 알고리즘 풀이를 통해 자바의 숙련도를 높였고 자바
            스프링 프레임워크를 활용한 웹 개발 경험이 있습니다.
          </li>
          <li>
            <strong>Python</strong>
            <br />
            쓰레드(thread) 및 이벤트 객체(event object)를 사용하여 임베디드
            시스템을 개발한 경험이 있습니다.
          </li>
          <li>
            <strong>C/C++</strong>
            <br />
            소켓 프로그래밍을 통해 네트워크 프로젝트를 진행한 경험이 있습니다.
          </li>
          <li>
            <strong>Git/GitHub</strong>
            <br />
            프로젝트 및 개인 코드를 관리하고 있습니다.
          </li>
          <li>
            <strong>Linux</strong>
            <br />
            임베디드 시스템 개발에 활용한 경험이 있으며, 원격 서버에서 실습한
            경험이 있습니다. 리눅스 파일 구조에 대해 익숙한 편입니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
