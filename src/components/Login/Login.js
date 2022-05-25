import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
// import { useNavigate } from "react-router";
import axios from 'axios';
import { Link } from "react-router-dom";


import logo from '../../assets/logo.png'
import { Container, Input, Button, StyledLink } from './LoginStyle';

export default function Login(){
    const { setDados } = useContext(UserContext);
    // const navigate = useNavigate();

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
    
        /* promise.then((response) => {
            setUser(response.data);
            setToken(response.data.token);
            navigate("/habitos");
        });
        promise.catch((error) => console.log(error.response)); */
    }

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={handleLogin}>
                <Input
                    type="email"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Entrar</Button>
            </form>
            <StyledLink to="/cadastro">Não possui uma conta? Cadastre-se</StyledLink>
        </Container>
    )
}

