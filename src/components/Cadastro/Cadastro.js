import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
// import { useNavigate } from "react-router";
import axios from 'axios';
import { Link } from "react-router-dom";


import logo from '../../assets/logo.png'
import { Container, Input, Button, StyledLink } from '../Login/LoginStyle';

export default function Cadastro(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleCadastro(e){
        console.log(e);
    }

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={handleCadastro}>
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
                <Input
                    type="password"
                    placeholder="Digite seu nome..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="URL da sua foto de perfil"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Cadastrar</Button>
            </form>
            <StyledLink to="/cadastro">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    )
}