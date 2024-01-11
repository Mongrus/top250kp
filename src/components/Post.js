import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './Post.module.sass';
import { FaPlay } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
  const loc = useLocation();
  const { oneFilms, setOneFilms, user } = useContext(AppContext);
  const [comments, setComments] = useState(null);
  const [review, setReview] = useState('');
  const [info, setInfo] = useState('');

  const plusComments = () =>
    toast.success('Ваш комментарий успешно опубликован !', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  // Запрос на получение информации о фильме

  const newGetPosts = async () => {
    try {
      await fetch(
        `https://rapid-complete-dress.glitch.me/posts/${loc.pathname.substr(
          14,
          loc.pathname.length
        )}`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((res) => setOneFilms(res));
    } catch (error) {
      console.log(error);
    }
    if (localStorage.getItem('status') === 'active') {
      setInfo({
        log: localStorage.getItem('login'),
        img: localStorage.getItem('img'),
        status: localStorage.getItem('status'),
        id: localStorage.getItem('id'),
      });
    } else {
      setInfo({
        log: 'Анонимный пользователь',
        img: 'https://www.referapps.com/backoffice/face0.jpg',
        status: 'false',
      });
    }
  };

  // Запрос на получение списка комментариев

  const newGetComments = async () => {
    try {
      await fetch('https://rapid-complete-dress.glitch.me/comments/', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((res) =>
          setComments(
            res.filter((el) => {
              console.log(el.number_posts === numPosts);
              if (el.number_posts === numPosts) {
                return el;
              } else {
                return false;
              }
            })
          )
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    newGetPosts();
    newGetComments();
  }, []);

  const numPosts = Number(loc.pathname.substr(14, loc.pathname.length));

  // Отправка нового комментария

  const newPost = async () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      name: info.log,
      img: info.img,
      status: info.status,
      text: review,
      number_posts: numPosts,
      data: new Date().toLocaleDateString(),
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    if (review.replace(/\s/g, '') === '') {
      console.log('Введите отзыв');
    } else {
      try {
        await fetch(
          `https://rapid-complete-dress.glitch.me/comments/`,
          requestOptions
        )
          .then((response) => response.json())
          .then((json) => console.log(json));
        plusComments();
      } catch (error) {
        console.log(error);
      }
      newGetComments();
      setReview('');
    }
  };

  // Администратор(удаление комментариев)

  const newDelete = async (id) => {
    try {
      await fetch(`https://rapid-complete-dress.glitch.me/comments/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    }
    newGetComments();
  };

  // console.log(numPosts);

  return (
    <div>
      <ToastContainer></ToastContainer>
      {
        <div className={styles.post}>
          <h1>{oneFilms.name}</h1>
          <div className={styles.post__info}>
            <img src={`${oneFilms.poster?.url}`} alt="#" />
            <div className={styles.post__descr}>
              <div className={styles.post__descrText}>
                <p>{oneFilms.description}</p>
              </div>
              {oneFilms.top250 !== null ? (
                <div className={styles.post__upSection}>
                  <div className={styles.post__top}>
                    <h3>⭒✮⭒ Место: 🏆 {oneFilms.top250} ⭒✮⭒</h3>
                  </div>

                  <div className={styles.post__descrGrid}>
                    <h3>Страна производства:</h3>

                    <h3>
                      {oneFilms ? `${oneFilms.countries[0].name}` : <></>}
                    </h3>

                    <h3>Жанр:</h3>

                    <h3>{oneFilms ? `${oneFilms.genres[0].name}` : <></>}</h3>

                    <h3>Год выпуска:</h3>

                    <h3>{oneFilms.year}</h3>

                    <h3>Длительность:</h3>

                    <h3>{oneFilms.movieLength} мин.</h3>

                    <h3>Возрастной рейтинг:</h3>

                    <h3>{`${oneFilms.ageRating}+`}</h3>
                  </div>
                </div>
              ) : (
                <div className={styles.post__descrGrid}>
                  <h3>Страна производства:</h3>

                  <h3>{oneFilms ? `${oneFilms.countries[0].name}` : <></>}</h3>

                  <h3>Жанр:</h3>

                  <h3>{oneFilms ? `${oneFilms.genres[0].name}` : <></>}</h3>

                  <h3>Год выпуска:</h3>

                  <h3>{oneFilms.year}</h3>

                  <h3>Длительность:</h3>

                  <h3>{oneFilms.movieLength} мин.</h3>

                  <h3>Возрастной рейтинг:</h3>

                  <h3>{`${oneFilms.ageRating}+`}</h3>
                </div>
              )}
              <Link
                className="linkKp"
                to={`https://www.kinopoisk.ru/film/${oneFilms.id}/`}
                target="_blank"
              >
                <button>
                  <FaPlay />
                  {''}Смотреть на Кинопоиске
                </button>
              </Link>
              {oneFilms ? (
                <div className={styles.post__ratingAndVotes}>
                  <div className={styles.post__gridFlex}>
                    <h3 className={styles.A}>Критик: </h3>
                  </div>
                  <h3 className={styles.A}>Рейтинг:</h3>
                  <h3 className={styles.A}>Голоса:</h3>
                  <div className={styles.post__gridFlex}>
                    <h3 className={styles.B}>КиноПоиск</h3>
                  </div>
                  <h3 className={styles.C}>
                    {parseFloat(oneFilms.rating.kp.toFixed(1))}
                  </h3>
                  <h3 className={styles.C}>{oneFilms.votes.kp}</h3>
                  <div className={styles.post__gridFlex}>
                    <h3 className={styles.B}>IMDb</h3>
                  </div>
                  <h3 className={styles.C}>
                    {parseFloat(oneFilms.rating.imdb.toFixed(1))}
                  </h3>
                  <h3 className={styles.C}>{oneFilms.votes.imdb}</h3>
                  <div className={styles.post__gridFlex}>
                    <h3 className={styles.B}>Мировые критики</h3>
                  </div>
                  <h3 className={styles.C}>
                    {parseFloat(oneFilms.rating.filmCritics.toFixed(1))}
                  </h3>
                  <h3 className={styles.C}>{oneFilms.votes.filmCritics}</h3>
                  <div className={styles.post__gridFlex}>
                    <h3 className={styles.B}>Российские критики</h3>
                  </div>
                  <h3 className={styles.C}>
                    {oneFilms.rating.russianFilmCritics}
                  </h3>
                  <h3 className={styles.C}>
                    {oneFilms.votes.russianFilmCritics}
                  </h3>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      }
      {comments !== null ? (
        <div className={styles.comments}>
          <h2>Всего комментариев: {comments.length}</h2>
          {comments.map((el) => {
            return (
              <div key={uuidv4()} className={styles.comments__comment}>
                <div className={styles.comments__name}>
                  <img src={`${el.img}`} alt="#" />
                  <h2>{el.name}</h2>
                  <h4>{el.data}</h4>
                </div>

                <div className={styles.comments__text}>
                  <p>{el.text}</p>
                </div>

                {info.id === '0' ? (
                  <button
                    onClick={() => {
                      newDelete(el.id);
                    }}
                  >
                    Удалить отзыв
                  </button>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.newComments}>
        <h2>Поделитесь своим мнением:</h2>
        <textarea
          type="text"
          placeholder="Введите свой отзыв"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          pattern="[\w]{1,15}"
          maxLength="500"
          required
        ></textarea>
        <button onClick={newPost}>Оставить отзыв</button>
      </div>
    </div>
  );
};

export default Post;
