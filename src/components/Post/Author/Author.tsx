import React from "react";

import * as styles from "./Author.module.scss";

const gleanLink = <a href="https://glean.com/" target="_blank">Glean</a>
const sambanovaLink = <a href="https://sambanova.ai/" target="_blank">Sambanova</a>
const stanfordLink = <a href="https://stanford.edu/" target="_blank">Stanford</a>

export const Bio = () => {
  return <>
    NLP @ {gleanLink}. Previously ML @ {sambanovaLink}, Math + CS @ {stanfordLink}
  </>
  
}

export const Subtitle = () => {
  return <>
    Feel free to reach me via <a href="/email.png" target="_blank">email</a> or <a href="https://www.linkedin.com/in/calvinqi/" target="_blank">LinkedIn</a>! Let's talk :D
  </>
}

const Author = () => {

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        <Bio />
      </p>
    </div>
  );
};

export default Author;
