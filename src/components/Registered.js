import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registered.module.sass';
import AppContext from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registered = () => {
  const [log, setLog] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const notReg = () =>
    toast.warn(
      'Данный логин уже есть в базе. Пожалуйста попробуйте ввести другое имя пользователя !',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }
    );

  const newPost = async (log, mail, pass) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      name: log,
      password: pass,
      email: mail,
      img: `https://robohash.org/set_set4/bgset_bg${Math.floor(
        1 + Math.random() * (3 + 1 - 1)
      )}/3.${
        Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000
      }?size=200x200`,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const suitableUser = user.find((el) => el.name === log);
    if (!suitableUser) {
      try {
        await fetch(
          `https://rapid-complete-dress.glitch.me/user/`,
          requestOptions
        )
          .then((response) => response.json())
          .then((json) => console.log(json));
      } catch (error) {
        console.log(error);
      }
      setLog('');
      setMail('');
      setPass('');
      navigate('/login');
    } else {
      setLog('');
      setMail('');
      setPass('');
      notReg();
    }
  };

  const exitLogin = () => {
    localStorage.clear();
    navigate('.');
    window.location.reload();
  };

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

  useEffect(() => {
    newGetUser();
  }, []);

  console.log(user);

  return (
    <div className={styles.registered}>
      <ToastContainer></ToastContainer>
      {localStorage.getItem('status') === 'active' ? (
        <div className={styles.registered__notLogin}>
          <h3>
            Вы успешно вошли под своим логином {localStorage.getItem('login')}.
            Добро пожаловать !
          </h3>
          <button onClick={exitLogin}>Выйти из аккаунта</button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            newPost(log, mail, pass);
            e.preventDefault();
          }}
          className={styles.form}
        >
          <h3>Введите пожалуйста Ваши данные для регистрации на сайте:</h3>
          <label htmlFor="login">Введите логин:</label>
          <input
            onChange={(e) => setLog(e.target.value)}
            type="text"
            name="login"
            value={log}
            placeholder="User"
            pattern="[\w]{1,15}"
            required
          />
          <label htmlFor="email">Введите емайл адрес:</label>
          <input
            onChange={(e) => setMail(e.target.value)}
            type="email"
            name="email"
            value={mail}
            placeholder="user@gmail.com"
          />
          <label htmlFor="password">Укажите пароль:</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="password"
            value={pass}
            placeholder="12345"
            required
          />

          <button type="submit">Зарегистрироваться</button>
        </form>
      )}
    </div>
  );
};

export default Registered;
