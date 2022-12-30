import React from "react";

import { useSiteMetadata } from "@/hooks";

const gleanLink = <a href="https://glean.com/" target="_blank">Glean</a>
const sambanovaLink = <a href="https://sambanova.ai/" target="_blank">Sambanova</a>
const stanfordLink = <a href="https://stanford.edu/" target="_blank">Stanford</a>
const linkedInLink = <a href="https://www.linkedin.com/in/calvinqi" target="_blank">LinkedIn</a>
const emailLink = <a href="/email.svg" target="_blank">email</a>

export const Bio = () => {
  return <>
    NLP @ {gleanLink}. Previously ML @ {sambanovaLink}, Math + CS @ {stanfordLink}
  </>

}

const Author = () => {
  const {copyright} = useSiteMetadata()
  return (
    <p>
      <b> {copyright} </b>
      <br />
      Feel free to reach me via {emailLink} or {linkedInLink} :D
    </p>
  );
};

export default Author;
