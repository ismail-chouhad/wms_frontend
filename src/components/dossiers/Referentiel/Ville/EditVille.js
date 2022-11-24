import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditVille() {

    const buttonStyle = {  marginTop: "10px" }
    let {ville} = useParams();
    var villeId = '';

    const [villeName,setVilleName] = useState(ville);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/villes/getId/${ville}`)
    .then(response => {
        //console.log(response.data);
        villeId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(villeName)
        axios.put('http://localhost:8081/villes/edit/'+villeId+'/'+villeName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Ville modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Ville non modifiée")
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
        <h3 className="head-title">Ville Modification</h3>
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