import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditFamille() {

    const buttonStyle = {  marginTop: "10px" }
    let {famille} = useParams();
    var familleId = '';

    const [familleName,setFamilleName] = useState(famille);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/familles/getId/${famille}`)
    .then(response => {
        //console.log(response.data);
        familleId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(familleName)
        axios.put('http://localhost:8081/familles/edit/'+familleId+'/'+familleName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Famille modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Famille non modifiée")
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
        <h3 className="head-title">Famille Modification</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="familleName"
                    name="familleName"
                    label="Famille name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={familleName}
                    onChange={(e)=>setFamilleName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
    </div>
  )
}