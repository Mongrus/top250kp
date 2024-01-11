import React, { useContext, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './WelcomePage.module.sass';
import video1 from './video1.mp4';
import video2 from './video2.mp4';
import video3 from './video3.mp4';
import video4 from './video4.mp4';
import video5 from './video5.mp4';
import video6 from './video6.mp4';
import video7 from './video7.mp4';
import AppContext from '../context/AppContext';

const WelcomePage = () => {
  const { arrFilms, arrCarousel, setArrFilms, setArrCarousel } =
    useContext(AppContext);
  const [arrVideo, setArrVideo] = useState([
    video1,
    video2,
    video3,
    video4,
    video5,
    video6,
    video7,
  ]);
  const [mut, setMut] = useState('muted');

  const shuffle = (arr) => {
    const newArr = Array.from(arr);
    let j, temp;
    for (let i = newArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return setArrCarousel(newArr);
  };

  useEffect(() => {
    shuffle(arrFilms);
  }, [arrFilms]);

  const mutedVideo = () => {
    if (mut === 'muted') {
      setMut('');
    } else if (mut === '') {
      setMut('muted');
    }
  };

  return (
    <div className={styles.welcomeDiv}>
      <h1>⭒✮⭒ 250 лучших фильмов по версии КиноПоиска ⭒✮⭒</h1>
      <div className={styles.abTag}>
        <video
          onClick={() => {
            mutedVideo();
          }}
          className={styles.videoTag}
          autoPlay
          loop
          muted={mut}
        >
          <source
            src={arrVideo[Math.floor(Math.random() * arrVideo.length)]}
            type="video/mp4"
          />
        </video>
        <div className={styles.videoText}>
          <h3>Ожидаем в 2024</h3>
        </div>
        <div
          onClick={() => {
            mutedVideo();
          }}
          className={styles.volume}
        >
          {mut === 'muted' ? <FaVolumeMute /> : <FaVolumeUp />}
        </div>
      </div>
      <div className={styles.sectionDown}>
        <div className={styles.carousel}>
          {arrCarousel.map((film) => {
            if (film.shortDescription) {
              return (
                <div key={film.id} className={styles.carousel__oneEl}>
                  <Link className="mainLink" to={`posts/${film.id}`}>
                    <img src={`${film.poster.previewUrl}`} alt="#" />
                    <h5>{film.shortDescription}</h5>
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <div className={styles.description}>
          <p className={styles.description__oneText}>
            На сайте представленны 250 лучших кинокартин по версии КиноПоиска.
          </p>
          <p>
            Вы можете сделать <Link to="posts">фильтр по жанрам</Link> или же
            оставить комментарий к понравившейся картине. Также на сайте
            присутсвует возможность <Link to="registered">регистрации</Link>,
            что бы другие пользователи могли понять кто именно написал
            комментарий. Данная подборка созданна при помощи API и в ней
            предоставленны только кинокартины у которых рейтинг КиноПоиска выше
            чем 8.5 баллов. Спасибо Вам за использование данного сервиса !
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
