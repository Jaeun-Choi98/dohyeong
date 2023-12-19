import './Board.css';

export default function Board() {
  return (
    <div className='board-content'>
      <div className='posts'>
        <div className='post'>
          <h2>개발 중1...</h2>
          <p>포스트 내용...</p>
          <p>작성자: 사용자1</p>
        </div>
        <div className='post'>
          <h2>개발 중2...</h2>
          <p>포스트 내용...</p>
          <p>작성자: 사용자2</p>
        </div>
      </div>
    </div>
  );
}
