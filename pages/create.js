import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const sendFormData = async function () {
    const name = document.getElementById('name').value;
    const rendAnn = document.getElementById('rendAnn').value;
    const lasting = document.getElementById('lasting').value;
    const maxInvDate = document.getElementById('maxInvDate').value;
    const amount = document.getElementById('amount').value;
    const button = document.getElementById('submitButton');
    console.log({
      name,
      rendAnn,
      lasting,
      maxInvDate,
      amount,
      res,
    });
    const res = await fetch('http://localhost:3001/api/investments/create', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        rendAnn,
        lasting,
        maxInvDate,
        amount: parseInt(amount),
        res,
      }),
    });
    if (res.status == 201) {
      document.getElementById('result').innerText = 'Added investment';
    }
  };
  return (
    <div>
      <form action="http://localhost:3001/api/investments/create" method="POST">
        <div>
          <label>Nome</label>
          <input id="name" type="text"></input>
        </div>
        <div>
          <label>Rendimento annuo investimento</label>
          <input id="rendAnn" type="text"></input>
        </div>
        <div>
          <label>Durata investimento</label>
          <input id="lasting" type="date"></input>
        </div>
        <div>
          <label>Data massima in cui si puo investire</label>
          <input id="maxInvDate" type="date"></input>
        </div>
        <div>
          <label>Capitale Desiderato della raccolta</label>
          <input id="amount" type="text"></input>
        </div>
        <button
          value="Submit"
          id="submitButton"
          type="button"
          onClick={() => {
            sendFormData();
          }}
        >
          Submit
        </button>
        <div id="result"></div>
      </form>
    </div>
  );
}
