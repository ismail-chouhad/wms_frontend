import {useState , useEffect, Fragment} from 'react'
import Grid from '@mui/material/Grid';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import MouvementFournisseurNav from './MouvementFournisseurNav';

export default function RspFournisseur() {

    const buttonStyle = {  marginTop: "10px" }

    const [emplacementsNames,setEmplacementsNames] = useState([])
    const [palletesNames,setPalletesNames] = useState([])

    const [namePallete,setNamePallete] = useState('')
    const [emplacementId,setEmplacementId] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveRsp = () => {
      axios.post('http://localhost:8081/fournisseurRsps/save/'+namePallete+'/'+emplacementId , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Réception bien enregistrée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getPalletes = () => {
        axios.get('http://localhost:8081/palletes/getAllPalletesNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            palletesNames.push(i)
          }
          setPalletesNames(response.data)
        })
    }

    const getFournisseurs = () => {
        axios.get('http://localhost:8081/emplacements/getAllEmplacementsNames')
        .then(response => {
          setEmplacementsNames(response.data)
        })
    }
  
    useEffect(() => {
        getFournisseurs();
        getPalletes();
    });

  return (
    <div>
        <MouvementFournisseurNav/>
        <h3 className="head-title">Reception fournisseur</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="pallete-multiple-name-label">Pallete</InputLabel>
                        <Select 
                        labelId="pallete-select-label"
                        id="pallete-select"
                        value={namePallete}
                        label="Pallete"
                        onChange={(e)=>setNamePallete(e.target.value)}
                        >
                        {palletesNames.map(pallete => (
                            <MenuItem key={pallete} value={pallete}>{pallete}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="emplacement-multiple-name-label">Emplacement</InputLabel>
                        <Select 
                        labelId="emplacement-select-label"
                        id="emplacement-select"
                        value={emplacementId}
                        label="Fournisseur"
                        onChange={(e)=>setEmplacementId(e.target.value)}
                        >
                        {emplacementsNames.map(emplacement => (
                            <MenuItem key={emplacement[0]} value={emplacement[0]}>{emplacement[1] +" :"+ emplacement[2] 
                            +" | "+ emplacement[3]+" Depot: "+emplacement[4]}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={saveRsp}>Save</Button>
                </Grid>
            </Grid>
        </Fragment>
    </div>
  )
}
