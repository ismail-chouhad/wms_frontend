import {useState , useEffect, Fragment} from 'react'
import Grid from '@mui/material/Grid';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import MouvementClientNav from './MouvementClientNav';

export default function CmdClient() {

    const buttonStyle = {  marginTop: "10px" }

    const [clientsNames,setClientsNames] = useState([])
    const [palettesNames,setPalettesNames] = useState([])

    const [nameClient,setNameClient] = useState('')
    const [namePalette,setNamePalette] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveCmd = () => {
      axios.post('http://localhost:8081/clientCmds/save/'+nameClient+'/'+namePalette , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Commande bien enregistrée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Cette pallete est déjà enregistrée dans une commande")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getPalettes = () => {
        axios.get('http://localhost:8081/palletes/getAllPalletesNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            palettesNames.push(i)
          }
          setPalettesNames(response.data)
        })
    }

    const getClients = () => {
        axios.get('http://localhost:8081/clients/getAllClientsNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            clientsNames.push(i)
          }
          setClientsNames(response.data)
        })
    }
  
    useEffect(() => {
        getClients();
        getPalettes();
    });

  return (
    <div>
        <MouvementClientNav/>
        <h3 className="head-title">Commande client</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="client-multiple-name-label">Client</InputLabel>
                        <Select 
                        labelId="client-select-label"
                        id="client-select"
                        value={nameClient}
                        label="Client"
                        onChange={(e)=>setNameClient(e.target.value)}
                        >
                        {clientsNames.map(client => (
                            <MenuItem key={client} value={client}>{client}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="palette-multiple-name-label">Palette</InputLabel>
                        <Select 
                        labelId="palette-select-label"
                        id="palette-select"
                        value={namePalette}
                        label="Palette"
                        onChange={(e)=>setNamePalette(e.target.value)}
                        >
                        {palettesNames.map(palette => (
                            <MenuItem key={palette} value={palette}>{palette}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={saveCmd}>Enregistrer</Button>
                </Grid>
            </Grid>
        </Fragment>
    </div>
  )
}
