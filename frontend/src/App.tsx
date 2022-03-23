import React, { useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData]: any[] = React.useState(null);

  const getData = () => {
    fetch('http://localhost:5000/api/data/')
      .then(result => result.json())
      .then(body => setData(body));
  };

  const sendData = (arg: boolean) => {
    interface dataObjProps {
      kutas: boolean;
    }
    const dataObj: dataObjProps = {
      kutas: arg
    }
    fetch("http://localhost:5000/data",
      {
        method: "POST",
        headers:{
        'Content-Type':'application/json'
       },
        body: JSON.stringify(dataObj)
      }
    )
    .then(function(response){
      if(response.ok){
        console.log('POST success.');
        return;
      }
      throw new Error('POST failed.');
    })
    .catch(function(error){
      console.log(error);
    });
  }

  useEffect(() => {
    getData();
  }, [])
  

  const chuj = () => {
    getData();
    data ? console.log(data.data) : console.log("chuj");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={chuj}>getData</button>
        <p>
          {/* Data: {data ? JSON.stringify(data) : 'eee'} */}
          Data: {data ? data.data : 'brak danych'}
        </p>
        <button onClick={() => {sendData(true)}}>ON</button>
        <button onClick={() => {sendData(false)}}>OFF</button>
      </header>
    </div>
  );
}

export default App;
