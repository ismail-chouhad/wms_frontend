import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditDateExp() {

    const buttonStyle = {  marginTop: "10px" }
    let {dateExp} = useParams();
    var dateExpId = '';

    const [dateExpDate,setDateExpDate] = useState(dateExp);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/dateExps/getId/${dateExp}`)
    .then(response => {
        //console.log(response.data);
        dateExpId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(dateExpDate)
        axios.put('http://localhost:8081/dateExps/edit/'+dateExpId+'/'+dateExpDate , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "DateExp modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "DateExp non modifiée")
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
        <h3 className="head-title">Modification de la date d'expiration</h3>
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