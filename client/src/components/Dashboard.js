import { useEffect, useState } from 'react';
import { loadUser } from '../services/ApiUser';
import { loadCat, newCat, delCat } from '../services/ApiCategory';
import { delItem } from '../services/ApiItem';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ButtonNotifications from './popups/ButtonNotifications';
import Category from './Category';
import './Dashboard.css';
import logo from '../img/icon-512x512.png';

function Dashboard({ userIdDb }) {
  const [user, setUser] = useState({});
  const [userCatList, setUserCatList] = useState([]);
  const [newCatTitle, setNewCatTitle] = useState('');

  useEffect(() => {
    loadUser(userIdDb)
      .then((response) => {
        setUser(response);
        setUserCatList(response.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  function newCategory(e) {
    e.preventDefault();
    if (newCatTitle === '') {
      alert('Give a name!');
      return;
    }
    const content = { userId: user._id, name: newCatTitle };
    newCat(content)
      .then((cat) => {
        setUserCatList([...userCatList, cat._id]);
      })
      .catch((error) => console.log(error));
    setNewCatTitle('');
  }

  function deleteCategory(id) {
    const catId = id;
    const userId = user._id;
    const content = { userId, catId };
    // Delete items in category first
    // Then delete category and update user cat list
    loadCat(id)
      .then((response) => response.items)
      .then((list) => {
        list.forEach((item) => {
          const content = { catId, itemId: item };
          delItem(content);
        });
      })
      .then(delCat(content))
      .then(
        setUserCatList((userCatList) => {
          return userCatList.filter((cat) => cat !== catId);
        })
      )
      .catch((error) => console.log(error));
  }

  let catList = userCatList.map((catId) => (
    <Category key={catId} catId={catId} deleteCategory={deleteCategory} />
  ));

  return (
    <div className="Dashboard">
      <div id="dashboard-header">
        <div id="dashboard-start">
          <h2 id="welcome-msg">Hello {user.name}!</h2>
          <form className="new-cat-form" onSubmit={newCategory}>
            <input
              type="text"
              id="input-new-cat"
              name="new-cat-name"
              value={newCatTitle}
              onChange={(e) => setNewCatTitle(e.target.value)}
              placeholder="Add a new pool"
            ></input>
            <ArrowDropDownCircleIcon className="btn-new-cat" onClick={newCategory} />
          </form>
        </div>
        <ButtonNotifications user={user} />
      </div>
      {userCatList.length ? (
        ''
      ) : (
        <div id="dashboard-empty">
          <h1>Your board is empty!</h1>
          <h1>Try adding some new pools</h1>
          <img id="lama1" className="lama-shake" src={logo} alt="Lama logo"></img>
          {/* <img id='lama2' className='rotate' src={logo} alt="Lama logo"></img> */}
          {/* <img id='lama3' className='displacement' src={logo} alt="Lama logo"></img> */}
        </div>
      )}
      <div id="dashboard-pool">{catList}</div>
    </div>
  );
}

export default Dashboard;
