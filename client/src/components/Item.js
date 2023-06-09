import { useEffect, useState } from 'react';
import { loadItem, updItem } from '../services/ApiItem';
// import { dateItem } from '../services/ApiDate'
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime'

import ClearIcon from '@mui/icons-material/Clear';

import './Item.css';
import ButtonItemEdit from './popups/ButtonItemEdit';

function dateItem(date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm A');
}

// dayjs.extend(relativeTime)

// function freqItem(date, freq) {
//   console.log(date);
//   console.log(freq);
//   console.log(date + freq);

//  console.log(dayjs('1990-02-01').to(dayjs('1990-01-01'), true));
// }

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
        {/* <button className="el-remove" onClick={() => deleteItem(item._id)}></button> */}
        <ClearIcon className="el-remove" onClick={() => deleteItem(item._id)} />
        <ButtonItemEdit updateItem={updateItem} item={item} />
        <h4>{item.title}</h4>
      </div>

      <div className="el-details">
        <p>
          <strong>{item.frequency ? `every ${item.frequency}` : ''}</strong>
        </p>
        <p>
          <strong>{item.start_date ? dateItem(item.start_date) : ''}</strong>
        </p>
      </div>
    </div>
  );
}

export default Item;
