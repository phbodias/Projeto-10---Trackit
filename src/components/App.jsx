import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "../contexts/UserContext"
import { ProgressProvider } from "../contexts/ProgressContext";

import Login from "./Login/Login";
import Cadastro from "./Cadastro/Cadastro";
import Habitos from "./Habitos/Habitos";
import Hoje from "./Hoje/Hoje";
import Historico from "./Historico/Historico";

export default function App(){

    const [token, setToken] = useState("");
    const [image, setImage] = useState("");
    const [tarefasFeitas, setTarefasFeitas] = useState("0");

    return (
        <ProgressProvider>
            <UserContext.Provider value={{ token, setToken, image, setImage, tarefasFeitas, setTarefasFeitas }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/habitos" element={<Habitos />} />
                        <Route path="/hoje" element={<Hoje />} />
                        <Route path="/historico" element={<Historico />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </ProgressProvider>
    )
}