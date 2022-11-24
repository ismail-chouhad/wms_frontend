import { TextField, Grid, Button, Alert } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategorieNav from '../CategorieNav';

export default function EditClientsCategories() {

    const buttonStyle = {  marginTop: "10px" }
    let {categorie} = useParams();
    var cltCategorieId = '';

    const [cltCategorieName,setCltCategorieName] = useState(categorie);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    axios.get(`http://localhost:8081/clientCategories/getId/${categorie}`)
    .then(response => {
        //console.log(response.data);
        cltCategorieId=response.data;
        })
        
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(cltCategorieName)
        axios.put('http://localhost:8081/clientCategories/edit/'+cltCategorieId+'/'+cltCategorieName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Catégorie modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Catégorie non modifiée")
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
        <h3 className="head-title">Edit Client Catégorie</h3>
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