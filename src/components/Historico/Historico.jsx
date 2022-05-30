import Header from "../Header/Header";
import styled from 'styled-components';
import { Content } from "../Habitos/HabitosStyle";
import Footer from "../Footer/Footer";

export default function Historico(){
    return (
        <Content>
            <Header />
            <Titulo>
                <p>Histórico</p>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Titulo>
            <Footer />
        </Content>
    )
}

const Titulo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: initial;
    width: 91%;
    margin-top: 98px;
    margin-bottom: 28px;

    p:first-child {
        width: 200px;
        height: 29px;
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    p:nth-child(2){
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-top: 17px;
    }
`