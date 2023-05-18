import { useState } from 'react';
import Pessoa from '../components/Pessoa';
import comAutorizacao from '@/hoc/comAutorizacao';

  function Home() {
  const [idadeLucas, setIdadeLucas] = useState(17);
  const pessoas = [
    {
      nomePessoa: 'Enzo',
      idadePessoa: 12
    },
    {
      nomePessoa: 'Gustavo',
      idadePessoa: 15
    },
    {
      nomePessoa: 'Isabela',
      idadePessoa: 24
    }
  ]

  const incrementaIdadeLucas = () => {
    setIdadeLucas(idadeLucas + 1);
  }

  return (
    <>
      <h1>Ola mundo! {process.env.NEXT_PUBLIC_TESTE}</h1>
      <Pessoa nome='Lucas' idade={idadeLucas} />
      <Pessoa nome='Carol' idade={25} />
      <Pessoa nome='Camile' idade={17} />

      {pessoas.map(({ nomePessoa, idadePessoa }, index) => {
        return <Pessoa
          nome={nomePessoa}
          idade={idadePessoa}
          key={nomePessoa}
        />
      })}


      <button onClick={incrementaIdadeLucas}>Icrementa Idade do Lucas</button>
    </>
  )
}

export default comAutorizacao(Home);