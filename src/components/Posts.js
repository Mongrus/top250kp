import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import styles from './Posts.module.sass';
import { v4 as uuidv4 } from 'uuid';

const Posts = () => {
  const {
    arrFilms,
    filterFilms,
    newArr,
    arrCarousel,
    setArrFilms,
    setFilterFilms,
    setNewArr,
    setArrCarousel,
  } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    shuffle(arrFilms);
  }, [arrFilms]);

  const filterName = (filterFilms, arrFilms) => {
    if (filterFilms === '') {
      return setNewArr(arrFilms);
    } else {
      setNewArr(
        arrFilms.filter((el) => {
          // if (el.name.match(new RegExp(filterFilms, 'gi')) !== null) {
          //   return el;
          // }
          if (
            el.genres.find((gen) => {
              if (gen.name.match(new RegExp(filterFilms, 'gi')) !== null) {
                return el;
              }
            })
          ) {
            return el;
          }
        })
      );
    }
  };

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

  return (
    <div className={styles.posts}>
      <a name="up"></a>
      <div className={styles.carousel}>
        <div className={styles.carousel__allFilms}>
          {arrCarousel.map((film) => {
            return (
              <div key={film.id} className={styles.carousel__oneEl}>
                <h2>{parseFloat(film.rating.kp).toFixed(1)}</h2>
                <Link to={`${film.id}`}>
                  <img src={`${film.poster.previewUrl}`} alt="#" />
                </Link>
                <h5>{film.name}</h5>
                <h6>{film.year}</h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.list__films}>
          <div className={styles.list__filter}>
            <h5>Введите жанр:</h5>
            <input
              onChange={(e) => {
                setFilterFilms(e.target.value);
                filterName(filterFilms, arrFilms);
              }}
              type="text"
              name="login"
              value={filterFilms}
              placeholder="жанр"
              pattern="[\w]{1,15}"
              required
            />
            <p>К примеру - "боевик", "аниме", "комедия" и т.п.</p>
          </div>

          {filterFilms !== ''
            ? newArr.map((el) => {
                const films = el.name.replace(
                  new RegExp(filterFilms, 'gi'),
                  filterFilms.toLocaleUpperCase()
                );
                return (
                  <div key={el.id} className={styles.list__film}>
                    <img src={`${el.poster.previewUrl}`} alt="#" />

                    <div>
                      <h2>{films}</h2>
                      <p>{el.shortDescription}</p>
                      <div className={styles.list__genre}>
                        {el.genres.map((gnr) => {
                          return <h4 key={uuidv4()}>| {gnr.name} |</h4>;
                        })}
                      </div>
                      <Link to={`${el.id}`}>
                        <button>Подробнее</button>
                      </Link>
                    </div>
                    <div className={styles.list__rating}>
                      <span>♔</span>
                      <h3>{parseFloat(el.rating.kp).toFixed(1)}</h3>
                    </div>
                  </div>
                );
              })
            : arrFilms.map((el) => {
                const films = el.name.replace(
                  new RegExp(filterFilms, 'gi'),
                  filterFilms.toLocaleUpperCase()
                );
                return (
                  <div key={el.id} className={styles.list__film}>
                    <img src={`${el.poster.previewUrl}`} alt="#" />
                    <div>
                      <h2>{films}</h2>
                      <p>{el.shortDescription}</p>
                      <div className={styles.list__genre}>
                        {el.genres.map((gnr) => {
                          return <h4 key={uuidv4()}>| {gnr.name} |</h4>;
                        })}
                      </div>
                      <Link to={`${el.id}`}>
                        <button>Подробнее</button>
                      </Link>
                    </div>
                    <div className={styles.list__rating}>
                      <span>♔</span>
                      <h3>{parseFloat(el.rating.kp).toFixed(1)}</h3>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <a className={styles.linkUp} href="#up">
        Вверх ⬆
      </a>
    </div>
  );
};

export default Posts;
