import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import Header from '../Header/Header';

export default function Habitos(){

    const { token } = useContext(UserContext);

    const [habitos, setHabitos] = useState(null);

    useEffect(() => {
        const promise = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );
        promise.then((response) => {
            setHabitos(response.data)
            console.log("bom", response.data);
        });
        promise.catch((error) => console.log("ruim", error.response));
    }, []);

    return (
        <>
            <Header />
        </>
    )
}


