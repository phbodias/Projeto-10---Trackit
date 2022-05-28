import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import { Container, Input, Button, StyledLink } from './LoginStyle';

export default function Login(){

    const { setToken, setImage } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e){
        e.preventDefault();

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            {
                email,
                password
            }
        );
    
        promise.then((response) => {
            setToken(response.data.token);
            setImage(response.data.image);
            navigate("/habitos");
        });
        promise.catch((error) => alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`)); 
    }

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={handleLogin}>
                <Input
                    type="email"
                    placeholder="Digite seu email..."
                    value={email}
                    name={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha..."
                    value={password}
                    name={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Entrar</Button>
            </form>
            <StyledLink to="/cadastro">Não possui uma conta? Cadastre-se</StyledLink>
        </Container>
    )
}
