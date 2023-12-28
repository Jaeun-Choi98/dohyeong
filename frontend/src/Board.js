import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function BoardDetail() {
  let { boardId } = useParams();
  // const [board, setBoard] = useState([]);
  // useEffect(() => {
  //   fetch('/board/' + boardId)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setBoard(result);
  //     });
  // }, []);
  return <div>{boardId}</div>;
}

export function BoardList(props) {
  return (
    <div className='row p-3'>
      <div className='card'>
        <h5 className='card-header'>{props.writerName}</h5>
        <div className='card-body'>
          <h5 className='card-title'>{props.title}</h5>
          <button className='btn btn-dark mt-3'>
            <Link
              to={'/board/' + props.boardId}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              보기
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BoardContainer(props) {
  const [boards, setBoards] = useState([]);

  let items = boards.map((board) => (
    <BoardList key={board.boardId} {...board} />
  ));
  const bold = {
    fontWeight: 'bold',
  };
  useEffect(() => {
    fetch(props.loc)
      .then((res) => res.json())
      .then((result) => {
        setBoards(result);
      });
  }, []);
  return (
    <div className='container'>
      <div className='row p-3 m-3'>
        <h1 style={bold}>게시판</h1>
      </div>
      {items}
    </div>
  );
}
