import styled from 'styled-components';

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
    min-height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-bottom: 10px;
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
`

const Porcentagem = styled.div`
    width: 278px;
    height: 22px;
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${props => props.cor ? '#8FC549' : '#BABABA'};
`
export {
    Sequencia,
    Tarefas,
    Check,
    Texto,
    Tarefa,
    Data, 
    Porcentagem
}