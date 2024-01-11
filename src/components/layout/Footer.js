import React from 'react';
import styles from './Footer.module.sass';
import { FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/Mongrus" target="_blank">
        Другие работы на GitHub <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
