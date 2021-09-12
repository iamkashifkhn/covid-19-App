import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData]= useState([]);
  const [searchTerm, setSearchTerm]= useState('');
  const getCovidData = async () => {
    const res = await fetch(
      "https://coronavirus-19-api.herokuapp.com/countries"
    );
    const actualData = await res.json();
    setData(actualData)
  };

  useEffect(() => {
    getCovidData();
  }, []);
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="main-heading mb-5 text-center">
          <h1>
            <span className="font-weight-bold"> Pakistan </span> Covid-19 Report
            Card
          </h1>
        </div>
        <input
          type="text"
          placeholder="search"
          className="form-control"
          onChange={(e)=>{
            setSearchTerm(e.target.value)
          }}
        />
        <div className="responsive-table">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th> Country </th>
                <th> Cases </th>
                <th> Today Cases </th>
                <th> Deaths </th>
                <th> Today Deaths </th>
                <th> Recovered </th>
                <th> Active </th>
                <th> Critical </th>
                <th> Total Tests </th>
              </tr>
            </thead>
            <tbody>
            { data.filter((val)=>{
              if(val.country.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
              }else{
                return console.log(val);
              }
            }).map((curElement, idx)=>{
              return(
                <tr key={idx}>
                <td> {curElement.country}</td>
                <td> {curElement.active} </td>
                <td> {curElement.todayCases} </td>
                <td> {curElement.deaths} </td>
                <td> {curElement.todayDeaths} </td>
                <td> {curElement.recovered} </td>
                <td> {curElement.active} </td>
                <td> {curElement.critical} </td>
                <td> {curElement.totalTests} </td>
              </tr>
              )
            })}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
