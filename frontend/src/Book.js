import './Book.css';
import { useEffect, useState } from 'react';

function Book(props) {
  return (
    <div className='book-content'>
      <div className='products'>
        <div className='product'>
          <img src={props.imgUrl} alt={props.imgAlt} />
          <div className='product-details'>
            <h3>{props.bookName}</h3>
            <p>{props.description === '없음' ? '' : props.description}</p>
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
  return <div>{items}</div>;
}
