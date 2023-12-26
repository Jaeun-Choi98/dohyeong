import './Book.css';
import { useEffect, useState } from 'react';

function Book(props) {
  return (
    <div className='col'>
      <div className='card product'>
        <img
          className='card-img-top img-thumbnail'
          src={props.imgUrl}
          alt={props.imgAlt}
        />
        <div className='card-body'>
          <h5 className='card-title'>{props.bookName}</h5>
          <p className='card-text'>
            {props.description === '없음' ? '' : props.description}
          </p>
          <p>{props.price === 0 ? '품절' : props.price + '원'}</p>
          <button>
            {props.link === '없음' ? (
              <a>없음</a>
            ) : (
              <a href={props.link}>구매하러가기</a>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookContainer(props) {
  const [products, setProducts] = useState([]);
  let items = products.map((product) => (
    <Book key={product.bookId} {...product} />
  ));
  useEffect(() => {
    fetch(props.loc)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);
  return (
    <div className='container'>
      <div className='row row-cols-2 row-cols-md-3 g-4 align-items-center'>
        {items}
      </div>
    </div>
  );
}
