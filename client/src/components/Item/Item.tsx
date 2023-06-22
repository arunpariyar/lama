import { useEffect, useState } from 'react';
import { loadItem, updItem } from '../../services/ApiItem';
import { Checkbox } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ButtonItemEdit from '../popups/ButtonItemEdit';
import dayjs from 'dayjs';
import './Item.css';

interface IItem {
  itemId: string;
  deleteItem: (id: string) => void;
}

export type TItemData = {
  _id: string;
  title: string;
  start_date: string;
  checked: boolean;
  freq_weeks?: number;
  frequency: number;
}

function Item({ itemId, deleteItem }: IItem) {
  const [item, setItem] = useState<TItemData>({_id: "", title: "", start_date: "", checked: false, frequency: 0});

  useEffect(() => {
    loadItem(itemId)
      .then((response) => {
        if (response) {
          setItem(response);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function dateItem(date: string) {
    return dayjs(date).format('DD/MM/YYYY HH:mm a');
  }

  function updateItem(itemData: TItemData) {
    updItem(itemData)
      .then((response) => setItem(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="Item">
      <div className={`el-title`}>
        <Checkbox
          checked={item && item.checked ? true : false}
          onChange={() => item && updateItem({ ...item, checked: !item.checked })}
          size="small"
          color="default"
        />
        <div className="el-content">
          <h4 className={item && item.checked ? 'el-checked' : 'el-not-checked'}>{item && item.title}</h4>
          <p className="el-date">{item && item.start_date ? dateItem(item.start_date) : ''}</p>
        </div>
      </div>
      <div className="el-details">
        <ButtonItemEdit updateItem={updateItem} item={item} />
        <ClearIcon className="el-remove" onClick={() => item && deleteItem(item._id)} />
      </div>
    </div>
  );
}

export default Item;
