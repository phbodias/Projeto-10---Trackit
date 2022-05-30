import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from '../../contexts/UserContext';
import ProgressContext from '../../contexts/ProgressContext';
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const navigate = useNavigate();

    const { progresso, setProgresso } = useContext(ProgressContext);

    const { token } = useContext(UserContext);

    const [habitosDoDia, setHabitosDoDia] = useState([]);

    let fracao = 0;
    
    useEffect(() => {
        pegarHabitosDoDia();
    }, [habitosDoDia]);

    function pegarHabitosDoDia() {
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
        );
        promise.then((response) => {
            setHabitosDoDia(response.data);
            feitas()
        });
        promise.catch((error) => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            navigate('/');
        }); 
    }

    function feitas(){
        if (habitosDoDia.length === 0) return;
        let realizadas = 0;
        for (let i = 0; i < habitosDoDia.length; i++){
            if (habitosDoDia[i].done) realizadas++;
        }
        fracao = realizadas / habitosDoDia.length;
        setProgresso((fracao*100).toFixed(0));
    }

    return (
        <FooterStyle>
            <Link to="/habitos" style={{ textDecoration: 'none' }}>
                <p>Hábitos</p>
            </Link>
            <Link to="/hoje" style={{ textDecoration: 'none' }}>
                <ProgressBar>
                    <CircularProgressbar backgroundPadding={6} strokeWidth={9} value={progresso} text="Hoje" background />
                </ProgressBar>
            </Link>
            <Link to="/historico" style={{ textDecoration: 'none' }}>
                <p>Histórico</p>
            </Link>
        </FooterStyle>
    )
}

const FooterStyle = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 33px;
    font-size: 18px;
    p {
        color: #52B6FF;
    }
`

const ProgressBar = styled.div`
    height: 91px;
    width: 91px;
    margin-bottom: 60px;
    text-anchor: middle;

    .CircularProgressbar-path {
        stroke: #fff;
        transition: 1s;
    }
    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }
    .CircularProgressbar-text {
        fill: #fff;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`