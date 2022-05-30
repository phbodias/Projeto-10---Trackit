import { useState, useEffect, useContext } from "react"
import UserContext from '../../contexts/UserContext';
import ProgressContext from '../../contexts/ProgressContext';
import axios from "axios"
import styled from 'styled-components';
import dayjs from "dayjs"
import Header from "../Header/Header"
import { Content } from "../Habitos/HabitosStyle"
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';


export default function Hoje(){
    const navigate = useNavigate();

    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
    const dia = dias.find((_, i) => i === dayjs().day())

    const { token } = useContext(UserContext);
    const { progresso, setProgresso } = useContext(ProgressContext);

    const [habitosDoDia, setHabitosDoDia] = useState([]);

    let fracao = 0;

    useEffect(() => {
        pegarHabitosDoDia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function marcar(id, done) {
        const feito = done ? 'uncheck' : 'check'
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${feito}`, 
            {}, 
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
        )
        promise.catch(res => {alert(`Oops! algo deu errado...${res.response.data.message}`)})
    }
    
    return (
        <Content>
            <Header />
            <Data>
                <p>{dia}, {dayjs().format('DD/MM')}</p>
                {progresso === "0" || habitosDoDia.length === 0 ? <h1>Nenhum hábito concluído ainda</h1> : <h1>{progresso}% dos hábitos concluídos</h1>}
            </Data>
            <Tarefas>
                {habitosDoDia.map((habito, index) => {
                    return (
                        <Tarefa key={index}>
                            <Texto>
                                <p>{habito.name}</p>
                                <Sequencia value={habito.done}>Sequência atual: <span>{habito.currentSequence} dias</span></Sequencia>
                                <Sequencia value={habito.done}>Seu recorde: <span>{habito.highestSequence} dias</span></Sequencia>
                            </Texto>
                            <Check onClick={() => {marcar(habito.id, habito.done)}} value={habito.done}>
                                <span><ion-icon name="checkbox"></ion-icon></span>
                            </Check>
                        </Tarefa>
                    )
                })}
            </Tarefas>
            <Footer />
        </Content>
    )
}

const Sequencia = styled.div`
    width: 170px;
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    margin-left: 19px;

    span {
        color: ${({ value }) => value ? '#8FC549' : '#666666'};
    }
`

const Tarefas = styled.div`
    margin-bottom: 126px;
`

const Check = styled.div`
    top: 10px;
    position: relative;
    font-size: 69px;
    color: ${props => props.value ? `#8FC549` : `#E7E7E7`};
    border-radius: 5px;
`

const Texto = styled.div`
    p {
        width: 208px;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin: 13px 19px 8px 19px;
        color: #666666;
        word-wrap: break-word;
    }
`

const Tarefa = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
`

const Data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: initial;
    width: 91%;
    margin-top: 98px;
    margin-bottom: 28px;

    p {
        width: 200px;
        height: 29px;
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    h1 {
        width: 278px;
        height: 22px;
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
    }
`