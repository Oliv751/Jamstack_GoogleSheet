import papa from "papaparse";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]); //The state methods

  const prepareJsonData = (data) => {
    const json = data.map((line, index) => {
      if (index > 0) {
        let obj = {};
        data[0].forEach((el, j) => (obj = { ...obj, [el]: line[j] }));
        return obj;
      }
      return null;
    });
    json.shift();
    setCars(json); //The state methods
  };

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4-vEakMYoOx49g5txJtDVNPjZMINuhqOXJS6ULNhvsEshw_wJ2R6aMVxG2CB8bwfcybld46jYYS2P/pub?output=csv"
    )
      .then((response) => response.text())
      .then((data) => papa.parse(data))
      .then(({ data }) => prepareJsonData(data));
  }, []);

  return (
    <>
      {cars.map((car) => (
        <table>
          <thead>
            <tr>
              <th>{car.car_maker}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{car.car_model}</td>
              <td>{car.car_year}</td>
              <td>{car.car_vin}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
}

export default App;
