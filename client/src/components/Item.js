import { useEffect, useState } from 'react';
import { loadItem, updItem } from '../services/ApiItem';

import './Item.css';
import ButtonItemEdit from './popups/ButtonItemEdit';

function Item({ itemId, deleteItem }) {
  const [item, setItem] = useState({});

  useEffect(() => {
    loadItem(itemId)
      .then((response) => {
        setItem(response);
      })
      .catch((error) => console.log(error));
  }, []);

  function updateItem(itemData) {
    console.log('item-start', itemData);
    updItem(itemData)
      .then((response) => setItem(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="Item">
      <div className="el-title">
        <input className="el-checked" type="checkbox"></input>
        <button className="el-remove" onClick={() => deleteItem(item._id)}></button>
        {/* <button className="el-edit" onClick={() => deleteItem(item._id)}></button> */}
        <ButtonItemEdit updateItem={updateItem} item={item} />
        <h4>{item.title}</h4>
      </div>

      <div className="el-details">
        <p>
          every <strong>{item.frequency}</strong>
        </p>
        <p>
          next reminder <strong>{item.start_date}</strong>
        </p>
      </div>
    </div>
  );
}

export default Item;
