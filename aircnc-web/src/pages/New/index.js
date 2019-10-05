import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

import './style.css';
export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const [thumbnail, setThumbnail] = useState(null);


    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });
        
        history.push('/dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                <img src={camera} alt="Select imagem" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={evt => setCompany(evt.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>separadas por vírgula</span></label>
            <input
                id="techs"
                placeholder="Suas tecnologias"
                value={techs}
                onChange={evt => setTechs(evt.target.value)}
            />

            <label htmlFor="price">Valor da diária * <span>Em branco para gratuito</span> </label>
            <input
                id="price"
                placeholder="Valor da diária"
                value={price}
                onChange={evt => setPrice(evt.target.value)}
            />
            <button className="btn">Cadastrar</button>
        </form>
    );
}