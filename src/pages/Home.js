import React, { useEffect, useState } from 'react';
import styles from './homeStyle.module.css';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [input, setInput] = useState([]);

  const navigate = useNavigate();

  const updateCaption = (e, index) => {
    const text = e.target.value || '';
    setInput(
      input.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append('username', 'prueba1');
    formData.append('password', 'damasgratis');
    formData.append('template_id', currentMeme.id);
    input.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        navigate(`/generated?url=${res.data.url}`);
      });
    });
  };

  // const shuffleMemes = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * i);
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  // };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(res => {
      res.json().then(res => {
        const _memes = res.data.memes;
        // shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setInput(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);

  return (
    memes.length ?
    <div className={styles.container} >
    
        <button onClick={generateMeme} className={styles.generate} >Generar Meme</button>
        <div className={styles.btn_container}>
          <button disabled={memeIndex===0}  onClick={() => setMemeIndex(memeIndex - 1)} className={styles.skip_left} >👈 anterior</button>
          <button disabled={memeIndex===99} onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip_right} >siguiente 👉</button>
        </div>
        {
          input.map((c, index) => (
            <input onChange={(e) => updateCaption(e, index)} key={index} placeholder="escribe tu frase" />
          ))
        }
        <img alt='meme' src={memes[memeIndex].url} />
      </div> :
      <></>
  );
};