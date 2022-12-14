import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import CategorieNav from '../CategorieNav';

export default function NewClientsCategories() {

    const buttonStyle = {  marginTop: "10px" }
    const [cltCategorieName,setCltCategorieName] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(cltCategorieName)
        axios.post('http://localhost:8081/clientCategories/save/'+cltCategorieName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Catégorie ajoutée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Catégorie existe déjà")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }

  return (
    <div>
        <CategorieNav/>
        <h3 className="head-title">Ajouter Client Catégorie</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="cltCategorieName"
                    name="cltCategorieName"
                    label="Nom de la catégorie"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={cltCategorieName}
                    onChange={(e)=>setCltCategorieName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
        
    </div>
  )
}