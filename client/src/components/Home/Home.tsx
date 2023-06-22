import image01 from '../../assets/Screenshot01xs.jpg';
import image02 from '../../assets/Screenshot02xs.jpg';
import logo from '../../assets/icon-512x512.png';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <div id="home-header">
        <div id="home-left">
          <h1>LAMA brings all your tasks, lists and reminders together</h1>
          <h3 className='text-center'>Keep everything in the same place</h3>
          <h3 className='text-center'>Be notified on time</h3>
          <Link className="register" to="/signup">
            Sign up - it's free!
          </Link>
        </div>
        <div id="home-right">
          <div id="lama-logo">
            <img id="logo" src={logo} alt="Lama logo"></img>
            <div id="logo-text">
              <h2>
                <span className="first-letter">L</span>-ife
              </h2>
              <h2>
                <span className="first-letter">A</span>-dmin
              </h2>
              <h2>
                <span className="first-letter">M</span>-anagement
              </h2>
              <h2>
                <span className="first-letter">A</span>-dvisor
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div id="home-down">
        <div className="showcase">
          <img src={image01} alt="Showcase 1"></img>
          <p>Generate your pools and store the information you need</p>
        </div>
        <div className="showcase">
          <img src={image02} alt="Showcase 2"></img>
          <p>Customize the appearance and schedule notifications</p>
        </div>
      </div>
    </div>
  );
}

export default Home;