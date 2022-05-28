import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png'
import { Container, Input, Button, StyledLink } from '../Login/LoginStyle';

export default function Cadastro(){
    const navigate = useNavigate();

    const [dados, setDados] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function handleCadastro(e){
        e.preventDefault();

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', dados);

        promise.then(()=>navigate('/'));

        promise.catch(error => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            limparInputs();
        });
    }

    function handleInputChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    function limparInputs(){
        setDados({
            email: "",
            name: "",
            image: "",
            password: ""
        })
    }

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={handleCadastro}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    value={dados.email}
                    onChange={handleInputChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha..."
                    value={dados.password}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome..."
                    value={dados.name}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="image"
                    placeholder="URL da sua foto de perfil"
                    value={dados.image}
                    onChange={handleInputChange}
                />
                <Button type="submit">Cadastrar</Button>
            </form>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    )
}