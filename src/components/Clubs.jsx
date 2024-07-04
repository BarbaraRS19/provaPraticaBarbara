import React, { useState, useEffect } from 'react';

export default function Clubs() {
  const [clubes, setClubes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await fetch('https://api.cartola.globo.com/clubes');
        const data = await response.json();
        const clubesArray = Object.values(data); 
        setClubes(clubesArray);
        setCarregando(false);
      } catch (error) {
        console.error('Erro!', error);
        setError(error.message);
        setCarregando(false);
      }
    };
    fetchClubes();
  }, []);

  return (
    <div className="home">
        <div className='titulo'>
        <h1>Clubes de Futebol</h1>
        </div>
      {carregando ? (
        <p>Aguarde</p>
      ) : error ? (
        <p>Erro: {error}</p> 
      ) : (
        <ul>
          {clubes.map((clube) => (
            <li key={clube.id}>
                <div className='imagem'>
                <img src={clube.escudos['60x60']}  key={clube.id + '-img'} />
              <div className='dados'>
            <h1>Nome: {clube.nome}</h1>
            <p>Apelido: {clube.apelido}</p>
              </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}