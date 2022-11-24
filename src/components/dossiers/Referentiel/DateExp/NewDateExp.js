import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewDateExp() {

    const buttonStyle = {  marginTop: "10px" }
    const [dateExpDate,setDateExpDate] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(dateExpDate)
        axios.post('http://localhost:8081/dateExps/save/'+dateExpDate , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "DateExp ajoutée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "DateExp existe déjà")
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
        <h3 className="head-title">Ajouter une date d'expiration</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="dateExpDate"
                    name="dateExpDate"
                    type="date"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={dateExpDate}
                    onChange={(e)=>setDateExpDate(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
        
    </div>
  )
}