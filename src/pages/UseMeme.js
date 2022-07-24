import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import styles from "./memeStyle.module.css"
import Swal from 'sweetalert2';

export const UseMeme = () => {

  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const navigate = useNavigate();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
    Swal.fire(
      "Meme copiado con éxito","pegá la url en tu navegador y descargalo","success"
    )
  };

  return(
    <div className={styles.container}>
      <button onClick={() => navigate('/')}  className={styles.home}>
        Crear un nuevo Meme
      </button>
      { url && <img alt='meme' src={url} /> }
      <button onClick={copyLink} className={styles.copy} >
        {copied ? 'Link copied!' : 'Copy link'}
      </button>
    </div>
  );
};