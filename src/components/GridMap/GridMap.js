import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HeatMapGrid } from 'react-grid-heatmap'
import DateSelector from '../DateSelector'

const baseURL = "http://localhost:5000/api/dates";

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

  const processGraphData = (data) => {
    setXLabels(new Array(24).fill(0).map((_, i) => `${i}`))
    setYLabels(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    setGraphData(new Array(yLabels.length)
      .fill(0)
      .map(() =>
        new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 50 + 50))
      ))
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/${graphDate}`) // TODO: Change URL
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
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
      />
    </React.Fragment>
  )
}
