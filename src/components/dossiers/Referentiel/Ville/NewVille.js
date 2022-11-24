import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewVille() {

    const buttonStyle = {  marginTop: "10px" }
    const [villeName,setVilleName] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(villeName)
        axios.post('http://localhost:8081/villes/save/'+villeName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Ville ajoutée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Ville existe déjà")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }

  return (
    <div>
        <ReferentielNav/>
        <h3 className="head-title">Ajouter Ville</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="villeName"
                    name="villeName"
                    label="Ville name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={villeName}
                    onChange={(e)=>setVilleName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
        
    </div>
  )
}