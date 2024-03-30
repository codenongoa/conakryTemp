import axios from 'axios';
import React, { useState } from 'react';

const Dev = () => {
    const [affiches, setAffiches] = useState('');
    const [displays, setDisplayes] = useState('');
    const [humidity, setHumidity] = useState('');
    const [errorr, setErrorr] = useState(false);
    let timeoutId;

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        fetchData(); // Appeler la fonction fetchData pour obtenir les données
    };

    const changeCity = (event) => {
        setDisplayes(event.target.value);

        clearTimeout(timeoutId);

        timeoutId= setTimeout(() =>{
            fetchData();
        }, 1000);
    };

    const fetchData = () => {
        if (displays) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${displays}&units=Metric&appid=9a16443282754d7c79feaec452d56710`)
                .then(response => {
                    console.log(response);
                    setAffiches(response.data.main.temp);
                    setHumidity(response.data.weather.icon);
                    setErrorr(false)
                })
                .catch(error => {
                    setErrorr(true)
                    console.log(error);
                });
        } else {
            // Réinitialiser la température si la saisie est vide
            setAffiches('');
            setHumidity('');
            setErrorr(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    return (
        <div className='total'>
            <h1>Le Climat</h1>
            <form onSubmit={handleSubmit}>
                {errorr && <p>Cette ville n'est pas valide</p>}
                {!errorr && (
                    <div className='bloc'>
                        <input className='ville' onChange={changeCity} placeholder='Saisir une ville' value={displays}/>
                        <div className='buton'>
                            <button onClick={handleSearch}>Rechercher</button>
                            <button style={{ fontSize: 24, color: 'red', background: 'lightblue'}}>Temperature : {affiches}</button>
                            <button style={{ fontSize: 24, background: 'lightblue', marginLeft:12}}>Humidity : {humidity}</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Dev;
