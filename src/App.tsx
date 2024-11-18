import { FormEvent, useState } from 'react'
import logoImg from './assets/logo.png'

interface ResultInfoProps {
  alcool: number | string;
  gasolina: number | string;
  title: string;
}

export default function App() {
  const [gasolinaInput, setGasolinaInput] = useState(1);
  const [alcoolInput, setAlcoolInput] = useState(1);
  const [resultInfo, setResultInfo] = useState<ResultInfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput);

    if (calculo <= 0.7) {
      setResultInfo({
        title: 'Compensa usar álcool',
        gasolina: formatarValor(gasolinaInput),
        alcool: formatarValor(alcoolInput),
      })
    } else {
      setResultInfo({
        title: 'Compensa usar gasolina',
        gasolina: formatarValor(gasolinaInput),
        alcool: formatarValor(alcoolInput),
      })
    }

  }

  function formatarValor(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-BR", {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return valorFormatado;
  }

  return (
    <>
      <main className='container'>
        <img className='logo' src={logoImg} alt="Logo" />

        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (Preço p/litro):</label>
          <input className='input' type="number" placeholder='4,90' min={1} step={0.01} required value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))}/>

          <label>Gasolina (Preço p/litro):</label>
          <input className='input' type="number" placeholder='4,90' min={1} step={0.01} required value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))}/>

          <input className='button' type="submit" value="Calcular"/>
        </form>

        {resultInfo && Object.keys(resultInfo).length > 0 && (
          <section className='result'>
            <h2 className='result-title'>{resultInfo.title}</h2>

            <span>Álcool: {resultInfo.alcool}</span>
            <span>Gasolina: {resultInfo.gasolina}</span>
          </section>
        )}
      </main>
    </>
  )
}

