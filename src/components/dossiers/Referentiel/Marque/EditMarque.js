import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditMarque() {

    const buttonStyle = {  marginTop: "10px" }
    let {marque} = useParams();
    var marqueId = '';

    const [marqueName,setMarqueName] = useState(marque);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/marques/getId/${marque}`)
    .then(response => {
        //console.log(response.data);
        marqueId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(marqueName)
        axios.put('http://localhost:8081/marques/edit/'+marqueId+'/'+marqueName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Marque modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Marque non modifiée")
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
        <h3 className="head-title">Marque Modification</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="marqueName"
                    name="marqueName"
                    label="Marque name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={marqueName}
                    onChange={(e)=>setMarqueName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
    </div>
  )
}