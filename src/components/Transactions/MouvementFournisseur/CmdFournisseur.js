import {useState , useEffect, Fragment} from 'react'
import Grid from '@mui/material/Grid';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import MouvementFournisseurNav from './MouvementFournisseurNav';

export default function CmdFournisseur() {

    const buttonStyle = {  marginTop: "10px" }

    const [fournisseursNames,setFournisseursNames] = useState([])
    const [palettesNames,setPalettesNames] = useState([])

    const [nameFournisseur,setNameFournisseur] = useState('')
    const [namePalette,setNamePalette] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveCmd = () => {
      axios.post('http://localhost:8081/fournisseurCmds/save/'+nameFournisseur+'/'+namePalette , {
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

    const getFournisseurs = () => {
        axios.get('http://localhost:8081/fournisseurs/getAllFournisseursNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            fournisseursNames.push(i)
          }
          setFournisseursNames(response.data)
        })
    }
  
    useEffect(() => {
        getFournisseurs();
        getPalettes();
    });

  return (
    <div>
        <MouvementFournisseurNav/>
        <h3 className="head-title">Commande fournisseur</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="fournisseur-multiple-name-label">Fournisseur</InputLabel>
                        <Select 
                        labelId="fournisseur-select-label"
                        id="fournisseur-select"
                        value={nameFournisseur}
                        label="Fournisseur"
                        onChange={(e)=>setNameFournisseur(e.target.value)}
                        >
                        {fournisseursNames.map(fournisseur => (
                            <MenuItem key={fournisseur} value={fournisseur}>{fournisseur}</MenuItem>
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
