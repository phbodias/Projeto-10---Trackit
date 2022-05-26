import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Header() {
    const { image } = useContext(UserContext);

    return(
        <Style>
            <p>TrackIt</p>
            <img src={image} alt="profileImage"/>
        </Style>
    )
}

const Style = styled.div`
    position: absolute;
    width: 100vw;
    height: 70px;
    left: 0px;
    top: 0px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;

    p{
        position: absolute;
        width: 97px;
        height: 49px;
        left: 18px;
        top: 10px;
        color: #FFFFFF;
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
    }

    img{
        position: absolute;
        width: 51px;
        height: 51px;
        right: 18px;
        top: 9px;
        border-radius: 98.5px;
        object-fit: cover;
    }
`