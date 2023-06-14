/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos , setCriptos] = useState([])
    const [error , setError] = useState(false)

    const [moneda , SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [criptoMoneda , SelectCriptoMoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            // console.log(resultado.Data)

            const arrayCriptos = resultado.Data.map(data => {

                const objetoCripto ={
                    id: data.CoinInfo.Name,
                    nombre: data.CoinInfo.FullName,
                }
                return objetoCripto
            })

            setCriptos(arrayCriptos)

        }
        consultarApi();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        if([moneda, criptoMoneda].includes(''))
        {
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptoMoneda
        })
    }

    return (
        <>
            {error === true ? <Error>Todos los campos son obligatorios</Error> : ''}
            <form
            onSubmit={handleSubmit}
            >
                
                <SelectMonedas/>
                <SelectCriptoMoneda/>
                
                <InputSubmit 
                    type="submit" 
                    value='Cotizar'
                />
            </form>


        </>
    )
}

export default Formulario