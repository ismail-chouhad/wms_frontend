import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditTVA() {

    const buttonStyle = {  marginTop: "10px" }
    let {tva} = useParams();
    var tvaId = '';

    const [tvaTaux,setTVATaux] = useState(tva);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/tvas/getId/${tva}`)
    .then(response => {
        //console.log(response.data);
        tvaId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(tvaTaux)
        axios.put('http://localhost:8081/tvas/edit/'+tvaId+'/'+tvaTaux , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "TVA modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "TVA non modifiée")
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
        <h3 className="head-title">TVA Modification</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="tvaTaux"
                    name="tvaTaux"
                    label="TVA taux"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={tvaTaux}
                    onChange={(e)=>setTVATaux(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
    </div>
  )
}