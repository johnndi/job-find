import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="title">
          <h1>find your dream job</h1>
        </div>
        <div className="navigation">
          <ul className="navcontain">
            <li className="navigationitems">
              <Link to="/">home</Link>
            </li>
            <li className="navigationitems">
              <Link to="/Login">login</Link>
            </li>
            <li className="navigationitems">
              <Link to="/Register">register</Link>
            </li>
            <li className="navigationitems">
              <Link to="/Post">post</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
