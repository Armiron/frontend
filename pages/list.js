import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const loadFormData = async function () {
    const res = await fetch('http://localhost:3001/api/investments/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const investments = await res.json();
    const container = document.getElementById('container');
    for (const investment of investments) {
      const keys = Object.keys(investment);
      console.log(keys);
      for (const key of keys) {
        container.innerHTML =
          container.innerHTML + `<div>${investment[key]}</div>`;
      }
      container.innerHTML = container.innerHTML + `<br>`;
    }
  };
  return (
    <div>
      <div id="container"></div>
      <button
        onClick={() => {
          loadFormData();
        }}
      >
        Load
      </button>
    </div>
  );
}
