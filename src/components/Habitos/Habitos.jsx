import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'

import Header from '../Header/Header';
import { Buttons, Content, Day, Days, Hab, Habito, Meus, NewHabit, NoHabits, Texto } from './HabitosStyle';
import Footer from '../Footer/Footer';

export default function Habitos(){
    const navigate = useNavigate();

    const { token } = useContext(UserContext);

    const [addHabit, setAddHabit] = useState(false);

    const [loading, setLoading] = useState(false)
    
    const [selected, setSelected] = useState([false, false, false, false, false, false, false]);
 
    const [habitos, setHabitos] = useState([]);

    const [name, setName] = useState("");

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

    useEffect(() => {
        pegarHabitos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [habitos]);

    function pegarHabitos() {
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
        });
        promise.catch((error) => {
            alert(`Erro ao carregar hábitos: \n\n${error.response.status} - ${error.response.data.message}`);
            navigate('/');
        }); 
    }
    
    function selecionarDias(index){
        setSelected(selected.map((s, i) => (
            i === index ? !selected[i] : selected[i]
        )));
    }

    function novoHabito(){
        setLoading(true);
        const days = [];
        
        for (let i = 0; i<selected.length; i++){
            if (selected[i]) days.push(i);
        }

        if (days.length === 0){
            alert("Selecione ao menos um dia para a tarefa!")
            setLoading(false);
            return;
        }

        const novo = {
            name: name,
            days: days
        }
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, 
            novo, 
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
        )
        promise.then((response) => {
            setName('');
            setSelected([false, false, false, false, false, false, false]);
            setAddHabit(!addHabit);
            setLoading(false);
        })
        promise.catch(res => {
            alert(`Algo deu errado...${res.response.data.message}`);
            setLoading(false);
        })

    }

    function diaDeTarefa(dias, index){
        if  (dias.includes(index)) return true;
        return false;
    }
    
    function deletarHabito(id){
        if (window.confirm('Deseja deletar este habito ?')) {
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    }

    return (
        <Content>
            <Header />
            <Meus>
                <p>Meus hábitos</p>
                <p onClick={() => setAddHabit(!addHabit)}>+</p>
            </Meus>
            {addHabit ? (
                <NewHabit>
                    <input type="text" placeholder="nome do habito" value={name} onChange={(e) => setName(e.target.value)} desabilitado={loading}/>
                    <Days>
                        {weekdays.map((day, index) => {
                            return (
                                <Day key={index} onClick={() => selecionarDias(index)} value={selected[index]}>{day}</Day>
                            )
                        })}
                    </Days>
                    <Buttons>
                        <button onClick={() => setAddHabit(!addHabit)} desabilitado={loading}>Cancelar</button>
                        <button onClick={novoHabito}>
                            {loading ? <ThreeDots color="#FFF" height={30} width={30} /> : 'Salvar'}
                        </button>
                    </Buttons>
                </NewHabit>
            ) : ""}
            {habitos.length === 0 ? (
                <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
            ) : (
                <Hab>
                    {habitos.map((habito, index) => {
                        return (
                            <Habito key={index}>
                                <Texto>
                                    <p>{habito.name}</p>
                                    <span onClick={() => deletarHabito(habito.id)}><ion-icon name="trash-outline"></ion-icon></span>
                                </Texto>
                                <Days>
                                    {weekdays.map((day, indexW) => {
                                        const valor = diaDeTarefa(habito.days, indexW);
                                        return (
                                            <Day key={indexW} value={valor}>{day}</Day>
                                        )
                                    })}
                                </Days>
                            </Habito>
                        )
                    })}
                </Hab>
            )} 
            < Footer />
        </Content>
    )
}




