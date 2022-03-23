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

  const triggerRing = (arg: string) => {
    interface dataObjProps {
      duration: string;
    }
    const dataObj: dataObjProps = {
      duration: arg
    }
    fetch("http://localhost:5000/api/ring",
      {
        method: "POST",
        headers:{
        'Content-Type':'application/json'
       },
        body: JSON.stringify(dataObj)
      }
    )
  }

  const setRingConst = (arg: boolean) => {
    let url: string;
    arg ? url = 'on' : url = 'off';
    fetch(`http://localhost:5000/api/ring/${url}`)
    .then(function(response){
      if(response.ok){
        console.log('GET success.');
        return;
      }
      throw new Error('GET failed.');
    })
    .catch(function(error){
      console.log(error);
    });
  }

  useEffect(() => {
    getData();
  }, [])
  

  const refreshData = () => {
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
        <button onClick={refreshData}>refresh data</button>
        <p>
          {/* Data: {data ? JSON.stringify(data) : 'eee'} */}
          Data: {data ? data.data : 'brak danych'}
        </p>
        <p>
          <button onClick={() => {setRingConst(true)}}>ON</button>&nbsp;
          <button onClick={() => {setRingConst(false)}}>OFF</button>
        </p>
        <br/><br/>
        <p>
          <button onClick={() => {triggerRing('short')}}>short</button>&nbsp;
          <button onClick={() => {triggerRing('long')}}>long</button>
        </p>
      </header>
    </div>
  );
}

export default App;
