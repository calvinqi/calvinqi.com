// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';
import { Link } from 'gatsby';

const ImgSize = 64;

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <div className={styles['author__header']}>
        <Link to="/" className={styles['author__header-photo']}>
          <img
            src={author.photo}
            width={ImgSize}
            height={ImgSize}
            alt={author.name}
          />
        </Link>
        <div>
          <div className={styles['author__header-right']}>
            <Link className={styles['author__header-right-name']} to="/" rel="author">
              {author.name}
            </Link>
            <div dangerouslySetInnerHTML={{ __html: author.bio }}></div>
              {/* <a
                className={styles['author__bio-twitter']}
                href={getContactHref('twitter', author.contacts.twitter)}
                rel="noopener noreferrer"
                target="_blank"
              >
              <strong>{author.name}</strong> on Twitter
              </a> */}
          </div>
          </div>

        </div>
        <p>
          Feel free to reach me via <a href="/email.png" target="_blank">email</a> or <a href="https://www.linkedin.com/in/calvinqi/" target="_blank">LinkedIn</a>! Let's talk :D
        </p>
    </div>
  );
};

export default Author;
