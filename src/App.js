import './App.css';

import { useState } from 'react'

import axios from 'axios';

import DownloadIcon from '@mui/icons-material/Download';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const uploadData = async (file) => {
    
    console.log(file)
    
    /*let formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        if (resp.status === 200) {
          // TODO: 
          // ProcessData(resp.data)
        }
      })*/
  }

  return (
    <div className="App">
      <header className="App-header">
        <FormControl variant="standard">
          <InputLabel htmlFor="data-file-input">
            Upload data as CSV file
          </InputLabel>
          <Input
            id="data-file-input"
            type="file"
            className="input-file"
            accept=".csv"
            startAdornment={
              <InputAdornment position="start">
                <DownloadIcon style={{ color: '#38b6ff' }} sx={{ fontSize: 25 }} />
              </InputAdornment>
            }
            onChange={e => uploadData(e.target.files[0])}
          />
        </FormControl>
      </header>
    </div>
  );
}

export default App;
