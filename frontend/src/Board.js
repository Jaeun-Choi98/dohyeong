import { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

export function BoardDetail(props) {
  let { boardId } = useParams();
  const token = localStorage.getItem('token');
  const [board, setBoard] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');

  const delComment = async (event, commentId) => {
    event.preventDefault();
    try {
      console.log('삭제: ' + props.title);
      const response = await fetch('/comments/delete/' + commentId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('삭제 실패');
      }
    } catch (error) {
      console.error('요청 실패:', error);
    }
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('/comments/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: parseInt(props.user.userId, 10),
        boardId: parseInt(boardId, 10),
        content: inputComment,
        writerName: props.user.userName,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error === undefined) {
          console.log('서버에 보낸 데이터:', json);
        } else {
          console.log(json.error);
        }
      });
    window.location.reload();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInputComment(event.target.value);
  };

  useEffect(() => {
    fetch('/boards/' + boardId)
      .then((res) => res.json())
      .then((result) => {
        setBoard(result);
        console.log(result);
      });
    fetch('/comments/' + boardId)
      .then((res) => res.json())
      .then((result) => {
        setComments(result);
      });
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{board.title}</h5>
              <br />
              <p className='card-text'>
                {board.content &&
                  board.content.split('\n').map((line, idx) => (
                    <Fragment key={idx}>
                      {line}
                      {idx !== board.content.length - 1 && <br />}
                    </Fragment>
                  ))}
              </p>

              <div className='comments mt-5 pt-5'>
                <div className='m-3'>
                  <strong>댓글 목록</strong>
                </div>
                {comments.map((comment) => (
                  <div key={comment.commentId} className='card mb-2'>
                    <div className='card-body'>
                      {comment.writerName}: {comment.content}
                    </div>
                    {props.user.admin === 1 ? (
                      <button
                        onClick={(event) =>
                          delComment(event, comment.commentId)
                        }
                      >
                        삭제
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
              {/* 댓글 입력 폼 */}
              <div className='comment-form mt-5'>
                <form>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      required
                      id='comment'
                      name='comment'
                      onChange={handleChange}
                      rows='3'
                      placeholder='댓글 입력하기...'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className='btn btn-dark mt-3'
                    onClick={handleSubmit}
                  >
                    댓글 달기
                  </button>
                  <button className='btn btn-dark mt-3 mx-3'>
                    <Link
                      to='/board'
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      뒤로 가기
                    </Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BoardList(props) {
  const token = localStorage.getItem('token');
  const delBoard = async (e) => {
    e.preventDefault();
    try {
      console.log('삭제: ' + props.title);
      const response = await fetch('/boards/delete/' + props.boardId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('삭제 실패');
      }
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

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
          {props.admin === 1 ? (
            <button className='btn btn-dark mt-3 mx-3' onClick={delBoard}>
              삭제
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function BoardContainer(props) {
  const [boards, setBoards] = useState([]);

  let items = boards.map((board) => (
    <BoardList key={board.boardId} {...board} admin={props.user.admin} />
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
      {props.user.admin === 1 ? (
        <div>
          <button className='btn btn-dark m-3'>
            <Link
              to='/board/new'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              글 쓰기
            </Link>
          </button>
        </div>
      ) : null}
      {items}
    </div>
  );
}
