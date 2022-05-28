import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import Header from '../Header/Header';
import styled from 'styled-components';
import { Buttons, Content, Day, Days, Meus, NewHabit, NoHabits } from './HabitosStyle';

export default function Habitos(){

    const { token } = useContext(UserContext);

    const [addHabit, setAddHabit] = useState(false);

    const [selected, setSelected] = useState([false, false, false, false, false, false, false]);
 
    const [habitos, setHabitos] = useState([]);

    const [name, setName] = useState("");

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

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
        });
        promise.catch((error) => console.log("ruim", error.response));
    }, []);
    
    function selecionarDias(index){
        setSelected(selected.map((s, i) => (
            i === index ? !selected[i] : selected[i]
        )));
    }

    function novoHabito(){
        const days = [];
        for (let i = 0; i<selected.length; i++){
            if (selected[i]) days.push(i);
        }
        const novo = {
            name: name,
            days: days
        }
        console.log(novo);
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
                    <input type="text" placeholder="nome do habito" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Days>
                        {weekdays.map((day, index) => {
                            return (
                                <Day key={index} onClick={() => selecionarDias(index)} value={selected[index]}>{day}</Day>
                            )
                        })}
                    </Days>
                    <Buttons>
                        <button onClick={() => setAddHabit(!addHabit)}>Cancelar</button>
                        <button onClick={novoHabito}> Salvar </button>
                    </Buttons>
                </NewHabit>
            ) : ""}
            {habitos.length === 0 ? (
                <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
            ) : (
                <div>AAAAAAAAAAAAA</div>
            )} 
        </Content>
    )
}





