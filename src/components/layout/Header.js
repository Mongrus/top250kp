import { NavLink } from 'react-router-dom';
import styles from './Header.module.sass';
import { GiFilmProjector, GiFilmSpool } from 'react-icons/gi';
import { IoLogInSharp } from 'react-icons/io5';
import { PiTrademarkRegisteredFill } from 'react-icons/pi';

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink className="link" to=".">
              <GiFilmProjector />
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="posts">
              <GiFilmSpool />
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="login">
              <IoLogInSharp />
              Войти
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="registered">
              <PiTrademarkRegisteredFill />
              Регистрация
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.userinfo}>
        <img
          src={
            localStorage.getItem('status') === 'active'
              ? localStorage.getItem('img')
              : 'https://www.referapps.com/backoffice/face0.jpg'
          }
          alt="#"
        />
        <p>
          {localStorage.getItem('status') === 'active'
            ? localStorage.getItem('login')
            : 'Неизвестный пользователь'}{' '}
        </p>
      </div>
    </div>
  );
};

export default Header;
