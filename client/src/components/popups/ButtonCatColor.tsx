import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import './ButtonCatColor.css';

type Category = {
  cat: {
    _id: string;
    name: string;
  }
  updateCategory: (id: string, name: string, color: string) => void;
}

function ButtonCatColor({ updateCategory, cat }: Category) {
  function changeColor(col: string) {
    updateCategory(cat._id, cat.name, col);
  }

  return (
    <PopupState variant="popover">
      {(popupState: any) => (
        <div>
          <ColorLensIcon
            className="cat-color-btn"
//            variant="contained"
            {...bindTrigger(popupState)}
          />
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
            <div className="color-picker-window">
              <button className="cp-def" onClick={() => changeColor('cat-def')}></button>
              <button className="cp-grey" onClick={() => changeColor('cat-grey')}></button>
              <button className="cp-r" onClick={() => changeColor('cat-red')}></button>
              <button className="cp-o" onClick={() => changeColor('cat-orange')}></button>
              <button className="cp-y" onClick={() => changeColor('cat-yellow')}></button>
              <button className="cp-g" onClick={() => changeColor('cat-green')}></button>
              <button className="cp-c" onClick={() => changeColor('cat-cyan')}></button>
              <button className="cp-b" onClick={() => changeColor('cat-blue')}></button>
              <button className="cp-p" onClick={() => changeColor('cat-purple')}></button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default ButtonCatColor;
