import styled from 'styled-components';

const Meus = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 91%;
    margin-top: 98px;

    p:first-child{
        width: 148px;
        height: 29px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    p:last-child{
        width: 40px;
        height: 35px;
        margin-left: 44%;
        background: #52B6FF;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`
const Buttons = styled.div`
    margin-top: 29px;
    margin-left: 148px;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    font-weight: 400;
    font-family: 'Lexend Deca';
    font-style: normal;

    button:first-child{
        width: 69px;
        height: 20px;
        color: #52B6FF;
        margin-right: 23px;
        border: 0;
        background-color: #FFFFFF;
    }

    button:last-child{
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.6px;
        color: #FFFFFF;
        border: 0;
    }
`

const Day = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${props => props.value ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.value ? '#FFFFFF' : '#CFCFCF'};
`

const Days= styled.div`
    display: flex;
    margin-left: 19px;
    text-align: center;
`

const NewHabit = styled.div`
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 20px;
    
    input {
        box-sizing: border-box;
        margin: 18.5px;
        padding-left: 11px;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    input::-webkit-input-placeholder{
        color: #DBDBDB;
    }
`

const NoHabits = styled.div`
    width: 338px;
    height: 74px;
    left: 17px;
    margin-top: 28px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`

const Content = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export {
    Meus,
    Buttons,
    Days,
    Day,
    NewHabit,
    NoHabits,
    Content
}