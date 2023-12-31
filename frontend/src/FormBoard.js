import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function FormBoard(props) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    writerName: props.user.userName,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 이곳에서 데이터를 처리하거나 제출하는 로직을 추가할 수 있습니다.
    await fetch('/boards/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error === undefined) {
          console.log('서버에 보낸 데이터:', json);
        } else {
          console.log(json.error);
        }
      });
    navigate('/board', true);
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor='title' className='form-label'>
            제목
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            required
            value={formData.title}
            onChange={handleChange}
            placeholder='제목을 입려해주세요'
          />
        </div>
        <div className='m-3'>
          <label htmlFor='content' className='form-label'>
            내용
          </label>
          <textarea
            className='form-control'
            id='content'
            name='content'
            required
            value={formData.content}
            onChange={handleChange}
            rows='5'
            placeholder='내용을 적어주세요.'
          ></textarea>
        </div>
        <button type='submit' className='btn btn-dark m-3'>
          제출
        </button>
      </form>
    </div>
  );
}
