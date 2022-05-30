import { useState, useEffect, useContext } from "react"
import UserContext from '../../contexts/UserContext';
import ProgressContext from '../../contexts/ProgressContext';
import axios from "axios"
import dayjs from "dayjs"
import Header from "../Header/Header"
import { Content } from "../Habitos/HabitosStyle"
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { Check, Data, Porcentagem, Sequencia, Tarefa, Tarefas, Texto } from "./HojeStyle";


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
                {progresso === "0" || habitosDoDia.length === 0 ? <Porcentagem cor={false}>Nenhum hábito concluído ainda</Porcentagem> : <Porcentagem cor={true}>{progresso}% dos hábitos concluídos</Porcentagem>}
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

