/* eslint-disable no-lone-blocks */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Login.module.sass';
import AppContext from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [log, setLog] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const newGetUser = async () => {
    try {
      await fetch('https://rapid-complete-dress.glitch.me/user/', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((res) => setUser(res));
    } catch (error) {
      console.log(error);
    }
  };

  const notLog = () =>
    toast.warn(
      'Данных логина и пароля не существует в базе, пожалуйста будьте внимательнее и попробуйте снова. Или зарегистрируйтесь, если вы этого еще не сделали.',
      {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }
    );

  const logInAccount = (login, password) => {
    const suitableUser = user.find(
      (el) => el.name === login && el.password === password
    );
    if (suitableUser) {
      localStorage.setItem('login', suitableUser.name);
      localStorage.setItem('password', suitableUser.password);
      localStorage.setItem('email', suitableUser.email);
      localStorage.setItem('id', suitableUser.id);
      localStorage.setItem('img', suitableUser.img);
      localStorage.setItem('status', 'active');
    } else {
      notLog();
      setPass('');
      setLog('');
    }
  };

  const exitLogin = () => {
    localStorage.clear();
    navigate('.');
    window.location.reload();
  };

  useEffect(() => {
    newGetUser();
  }, []);

  return (
    <div className={styles.login}>
      <ToastContainer></ToastContainer>
      {localStorage.getItem('status') === 'active' ? (
        <div className={styles.login__notLogin}>
          <h3>
            Вы успешно вошли под своим логином {localStorage.getItem('login')}.
            Добро пожаловать !
          </h3>
          <button onClick={exitLogin}>Выйти из аккаунта</button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            logInAccount(log, pass);
            {
              localStorage?.getItem('status') === 'active'
                ? console.log('goodLogin')
                : e.preventDefault();
            }
          }}
          className={styles.form}
        >
          <h3>
            Введите логин и пароль, которые Вы указывали при регистрации на
            сайте, что бы войти:
          </h3>
          <label htmlFor="login">Ваш логин:</label>
          <input
            onChange={(e) => setLog(e.target.value)}
            type="text"
            name="login"
            value={log}
            placeholder="User"
            pattern="[\w]{1,15}"
            required
          />
          <label htmlFor="password">Ваш пароль:</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="password"
            value={pass}
            placeholder="12345"
            required
          />

          <button type="submit">Войти</button>
        </form>
      )}
    </div>
  );
};

export default Login;
