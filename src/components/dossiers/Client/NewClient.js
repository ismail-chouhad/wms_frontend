import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import DossiersNav from '../DossiersNav';

export default function NewClient() {

    const buttonStyle = {  marginTop: "10px" }

    const [categoriesNames,setCategoriesNames] = useState([])

    const [nameClient,setNameClient] = useState('')
    const [addressClient,setAddressClient] = useState('')
    const [numClient,setNumClient] = useState('')
    const [emailClient,setEmailClient] = useState('')
    const [nameCategorie,setNameCategorie] = useState('')

    const [categorieID,setCategorieId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveClient = () => {
      axios.post('http://localhost:8081/clients/save/'+nameClient+
      '/'+emailClient+'/'+numClient+'/'+addressClient+'/'+categorieID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Client ajoute")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Client existe deja")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getCategories = () => {
        axios.get('http://localhost:8081/clientCategories/getAllCategoriesNames')
        .then(response => {
          setCategoriesNames(response.data)
        })
    }

    const setCategorie = () => {
    axios.get('http://localhost:8081/clientCategories/getId/'+nameCategorie , {
        }).then(res => {
            setCategorieId(res.data);
        })
    }
  
    useEffect(() => {
        getCategories();
        setCategorie();
    });

  return (
    <div>
        <DossiersNav/>
        <h3 className='head-title'>Ajouter un client</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="nameClient"
                    name="nameClient"
                    label="Nom"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={nameClient}
                    onChange={(e)=>setNameClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="emailClient"
                    name="emailClient"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emailClient}
                    onChange={(e)=>setEmailClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="numClient"
                    name="numClient"
                    label="Numéro de téléphone"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={numClient}
                    onChange={(e)=>setNumClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="addressClient"
                    name="addressClient"
                    label="Adresse"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={addressClient}
                    onChange={(e)=>setAddressClient(e.target.value)}
                    />                   

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="categorie-multiple-name-label">Catégorie</InputLabel>
                        <Select 
                        labelId="categorie-select-label"
                        id="categorie-select"
                        value={nameCategorie}
                        label="Catégorie"
                        onChange={(e)=>setNameCategorie(e.target.value)}
                        >
                        {categoriesNames.map(categorie => (
                            <MenuItem key={categorie} value={categorie}>{categorie}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={saveClient}>Enregistrer</Button>
                </Grid>
            </Grid>
        </Fragment>
    </div>
  )
}
