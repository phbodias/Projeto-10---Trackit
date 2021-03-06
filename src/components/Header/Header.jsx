import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link } from "react-router-dom";

export default function Header() {
    const { image } = useContext(UserContext);

    return(
        <Link to="/">
            <Style>
                <p>TrackIt</p>
                <img src={image} alt="profileImage"/>
            </Style>
        </Link>
    )
}

const Style = styled.div`
    z-index: 1;
    position: fixed;
    width: 100vw;
    height: 70px;
    left: 0px;
    top: 0px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;

    p{
        width: 97px;
        height: 49px;
        color: #FFFFFF;
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        object-fit: cover;
    }
`