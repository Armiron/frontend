import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const sendFormData = async function () {
    const name = document.getElementById('name').value;
    const rendAnn = document.getElementById('rendAnn').value;
    const lasting = document.getElementById('lasting').value;
    const maxInvDate = document.getElementById('maxInvDate').value;
    const amount = document.getElementById('amount').value;
    const id = document.getElementById('id').value;

    const button = document.getElementById('submitButton');
    console.log({
      name,
      rendAnn,
      lasting,
      maxInvDate,
      amount,
      res,
    });
    const res = await fetch(
      'http://localhost:3001/api/investments/' + id + '/edit',
      {
        method: 'PUT',
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
      }
    );
    if (res.status == 201) {
      document.getElementById('result').innerText = 'Edited investment';
    }
  };

  const loadFormData = async function () {
    const id = document.getElementById('id').value;
    const res = await fetch('http://localhost:3001/api/investments/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const investments = await res.json();
    let investment;
    for (const item of investments) {
      if (item.id == id) {
        investment = item;
      }
    }

    document.getElementById('name').value = investment.name;
    document.getElementById('rendAnn').value = investment.rendAnn;
    document.getElementById('lasting').value = formatDate(investment.lasting);
    document.getElementById('maxInvDate').value = formatDate(
      investment.maxInvDate
    );
    document.getElementById('amount').value = investment.amount;
  };

  return (
    <div>
      <form action="http://localhost:3001/api/investments/create" method="POST">
        Load Content
        <div>
          <label>id</label>
          <input id="id" type="text"></input>
        </div>
        <button
          value="Submit"
          id="secondSubmitButton"
          type="button"
          onClick={() => {
            loadFormData();
          }}
        >
          Submit
        </button>
        <div>Edit Content</div>
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
          Submit edited content
        </button>
        <div id="result"></div>
      </form>
    </div>
  );
}
