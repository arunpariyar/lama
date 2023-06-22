import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useState, useEffect, ChangeEvent } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './ButtonItemEdit.css';
import dayjs from 'dayjs';
import { TItemData } from '../Item';

type ButtonItemEditProps = {
  updateItem: (itemData: TItemData) => void;
  item: TItemData;
};

function ButtonItemEdit({ updateItem, item }: ButtonItemEditProps) {
  const [itemTitle, setItemTitle] = useState(item && item.title);
  const [itemStartDate, setItemStartDate] = useState(item && item.start_date);
  const [itemFrequency, setItemFrequency] = useState(item && item.frequency);

  useEffect(() => {
    setItemTitle(item && item.title);
    setItemStartDate(item && item.start_date ? dayjs(item.start_date).format('YYYY-MM-DDTHH:MM') : '');
    setItemFrequency(item && item.frequency || 0);
  }, [item]);

  function updateContent(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const content = {
      _id: item && item._id,
      title: itemTitle,
      start_date: itemStartDate,
      frequency: itemFrequency,
      checked: item && item.checked,
    };
    updateItem(content);
  }

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <div>
          <SettingsIcon
            className="item-edit-btn"
            {...bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
          >
            <div className="item-edit-window">
              <form onSubmit={updateContent}>
                <input
                  type="text"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                ></input>
                <input
                  type="datetime-local"
                  value={itemStartDate}
                  onChange={(e) => setItemStartDate(e.target.value)}
                ></input>
                <input type="submit" value="Update item"></input>
              </form>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default ButtonItemEdit;
