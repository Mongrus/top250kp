import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import styles from './Posts.module.sass';
import { v4 as uuidv4 } from 'uuid';
import ContentLoader from 'react-content-loader';

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

  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={1280}
      height={418}
      viewBox="0 0 1280 418"
      backgroundColor="#FC466B"
      foregroundColor="#3F5EFB"
      {...props}
    >
      <rect x="20" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="240" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="460" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="680" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="900" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="1120" y="25" rx="10" ry="10" width="200" height="300" />
      <rect x="20" y="335" rx="10" ry="10" width="200" height="38" />
      <rect x="240" y="335" rx="10" ry="10" width="200" height="38" />
      <rect x="460" y="335" rx="10" ry="10" width="200" height="38" />
      <rect x="680" y="335" rx="10" ry="10" width="200" height="38" />
      <rect x="900" y="335" rx="10" ry="10" width="200" height="38" />
      <rect x="1120" y="335" rx="10" ry="10" width="200" height="38" />
    </ContentLoader>
  );

  const MyLoaderTwo = (props) => (
    <ContentLoader
      speed={2}
      width={1128}
      height={820}
      viewBox="0 0 1128 820"
      backgroundColor="#FC466B"
      foregroundColor="#3F5EFB"
      {...props}
    >
      <rect x="590" y="40" rx="3" ry="3" width="100" height="10" />
      <rect x="395" y="95" rx="3" ry="3" width="500" height="10" />
      <rect x="555" y="120" rx="3" ry="3" width="178" height="10" />
      <rect x="0" y="11" rx="3" ry="3" width="170" height="250" />
      <circle cx="1080" cy="125" r="30" />
      <rect x="570" y="160" rx="3" ry="3" width="150" height="40" />

      <rect x="0" y="273" rx="3" ry="3" width="1128" height="1" />

      <rect x="590" y="315" rx="3" ry="3" width="100" height="10" />
      <rect x="395" y="370" rx="3" ry="3" width="500" height="10" />
      <rect x="555" y="395" rx="3" ry="3" width="178" height="10" />
      <rect x="0" y="286" rx="3" ry="3" width="170" height="250" />
      <circle cx="1080" cy="400" r="30" />
      <rect x="570" y="435" rx="3" ry="3" width="150" height="40" />

      <rect x="0" y="546" rx="3" ry="3" width="1128" height="1" />

      <rect x="590" y="590" rx="3" ry="3" width="100" height="10" />
      <rect x="395" y="645" rx="3" ry="3" width="500" height="10" />
      <rect x="555" y="670" rx="3" ry="3" width="178" height="10" />
      <rect x="0" y="561" rx="3" ry="3" width="170" height="250" />
      <circle cx="10" cy="675" r="30" />
      <rect x="570" y="710" rx="3" ry="3" width="150" height="40" />

      <rect x="0" y="819" rx="3" ry="3" width="1128" height="1" />
    </ContentLoader>
  );

  return (
    <div className={styles.posts}>
      <a name="up"></a>
      <div className={styles.carousel}>
        {arrFilms.length > 0 ? (
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
        ) : (
          MyLoader()
        )}
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
          {filterFilms !== '' ? (
            <div>
              {filterFilms.length > 0 ? (
                newArr.map((el) => {
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
              ) : (
                <div className={styles.list__film}>{MyLoaderTwo()}</div>
              )}
            </div>
          ) : (
            <div>
              {arrFilms.length > 0 ? (
                arrFilms.map((el) => {
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
              ) : (
                <div className={styles.list__film}>{MyLoaderTwo()}</div>
              )}
            </div>
          )}
        </div>
      </div>
      <a className={styles.linkUp} href="#up">
        Вверх ⬆
      </a>
    </div>
  );
};

export default Posts;
