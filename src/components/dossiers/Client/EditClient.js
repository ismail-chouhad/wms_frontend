import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DossiersNav from '../DossiersNav';

export default function EditClient() {

    let{ clientID , clientName , clientEmail, clientNum, clientAddress, clientCatName } = useParams()
    var idClient = parseInt(clientID);

    const buttonStyle = {  marginTop: "10px" }

    const [categoriesNames,setCategoriesNames] = useState([])

    const [nameClient,setNameClient] = useState(clientName)
    const [addressClient,setAddressClient] = useState(clientAddress)
    const [numClient,setNumClient] = useState(clientNum)
    const [emailClient,setEmailClient] = useState(clientEmail)
    const [nameCategorie,setNameCategorie] = useState(clientCatName)

    const [categorieID,setCategorieId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveClient = () => {
      axios.put('http://localhost:8081/clients/edit/'+idClient+'/'+nameClient+
      '/'+emailClient+'/'+numClient+'/'+addressClient+'/'+categorieID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Client modifié")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Client non modifié")
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
          for (var i = 0 ; i<response.data ; i++) {
            categoriesNames.push(i)
          }
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
        <h3 className='head-title'>Modifier un client</h3>
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
