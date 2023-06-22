import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { ChangeEvent, useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import './ButtonCatEdit.css';

type TCategory = {
  _id: string;
  name: string;
  _color?: string;
}

interface ICategory {
  cat: TCategory;
  updateCategory: (_id: string, name: string, _color?: string) => void;
  deleteCategory: (category: string) => void;
}

function ButtonCatEdit({ updateCategory, deleteCategory, cat }: ICategory) {
  const [newName, setNewName] = useState(cat.name);

  useEffect(() => {
    setNewName(cat.name || "");
  }, [cat]);

  function updateName(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newName) {
      updateCategory(cat._id, newName, cat._color);
    }
    setNewName('');
  }

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <div>
          <SettingsIcon className="cat-edit-btn" {...bindTrigger(popupState)} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
          >
            <div className="name-edit-window">
              <form onSubmit={updateName}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                ></input>
                <input type="submit" value="Update title"></input>
              </form>
              <DeleteIcon className="cat-del-btn" onClick={() => deleteCategory(cat._id)} />
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default ButtonCatEdit;
