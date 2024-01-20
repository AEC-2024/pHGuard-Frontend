import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HeatMapGrid } from 'react-grid-heatmap'
import DateSelector from '../DateSelector'

const baseURL = "http://localhost:5000/get-by-date";

const parseLocationStr = (loc) => {
  // Location strings are in the format
  // A1 A2 A3 ...
  // B1 B2
  // C1
  // ...

  // Returns the UTF character code of the letter
  // at index 0 and subtracts 97 to normalize around 0.
  const rowIdx = loc.charChodeAt(0) - 97;

  // Returns an array of all integer values
  // in the location string, this will be our column.
  const colNums = loc.match(/\d+/g);

  return [rowIdx, (colNums) ? colNums[0] : -1]
}

export default function GridMap() {
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [graphDate, setGraphDate] = useState('');
  const [graphData, setGraphData] = useState([]);
  const [cellData, setCellData] = useState([]);

  /*
    {
    temp: '20.42',
    aqi: '39',
    ph: '5.8',
    SK: 'LOCATION#G9',
    humidity: '10.38',
    PK: 'DAY#4'
  }
  */

  const processGraphData = (data) => {
    let xLabelArr = [];
    let yLabelArr = [];

    let locStr, locChars, letter, number;

    // Perform an initial first pass to populate
    // the label arrays.
    data
      .foreach(entry => {
        locStr = entry['SK'].split('#')[1]
        locChars = locStr.split('')
        letter = locChars[0];
        number = locChars[1];

        // Populate the label arrays
        if (!yLabelArr.includes(letter)) {
          yLabelArr.push(letter);
        }

        if (!xLabelArr.includes(number)) {
          xLabelArr.push(number);
        }
      });

    // Sort label arrays so they are in the proper order
    setXLabels(xLabelArr.sort(function (a, b) { return a - b }));
    setYLabels(yLabelArr.sort());

    // Once we know the dimensions of the map,
    // we can start populating each cell's data
    let dataArr = new Array(yLabels.length)
      .fill(0)
      .map(() => {
        new Array(xLabels.length)
          .fill(0);
      })

    let cellDataArr = new Array(yLabels.length)
      .fill(0)
      .map(() => {
        new Array(xLabels.length)
          .fill(0);
      })

    // Iterate through the data again to place each
    // cell's data into their respective location.
    data
      .foreach(entry => {
        const idx = parseLocationStr(entry['SK'].split('#')[1]);
        if (idx[0] < 0 || idx[1] < 0) return;

        dataArr[idx[0]][idx[1]] = entry['ph'];
        cellDataArr[idx[0]][idx[1]] = entry;
      })

    // Store the new graph and cell data
    setGraphData(dataArr);
    setCellData(cellDataArr);
  }

  useEffect(() => {
    axios
      .get(`${baseURL}?day=${graphDate}`) // TODO: Change URL
      .then((response) => {
        processGraphData(response.data);
      });
  }, [baseURL, graphDate])

  return (
    <React.Fragment>
      <DateSelector onSelection={setGraphDate} />
      <HeatMapGrid
        data={graphData}
        xLabels={xLabels}
        yLabels={yLabels}
        // Render cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={index => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".65rem"
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
          color: "#777"
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".7rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
        })}
        cellHeight="1.5rem"
        xLabelsPos="bottom"
        // TODO: Populate this with information about the cell
        onClick={(x, y) => alert(`${cellData[x][y]}`)}
      />
    </React.Fragment>
  )
}
