import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditDatePrd() {

    const buttonStyle = {  marginTop: "10px" }
    let {datePrd} = useParams();
    var datePrdId = '';

    const [datePrdDate,setDatePrdDate] = useState(datePrd);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/datePrds/getId/${datePrd}`)
    .then(response => {
        //console.log(response.data);
        datePrdId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(datePrdDate)
        axios.put('http://localhost:8081/datePrds/edit/'+datePrdId+'/'+datePrdDate , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "DatePrd modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "DatePrd non modifiée")
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
        <h3 className="head-title">Modification de la date de production</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="datePrdDate"
                    name="datePrdDate"
                    type="date"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={datePrdDate}
                    onChange={(e)=>setDatePrdDate(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
    </div>
  )
}