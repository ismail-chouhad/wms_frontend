import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DossiersNav from '../DossiersNav';

export default function EditFournisseur() {

    let{ fournisseurID , fournisseurName , fournisseurEmail, fournisseurNum, fournisseurAddress, fournisseurCatName } = useParams();
    var idFournisseur = parseInt(fournisseurID);

    const buttonStyle = {  marginTop: "10px" }

    const [categoriesNames,setCategoriesNames] = useState([])

    const [nameFournisseur,setNameFournisseur] = useState(fournisseurName)
    const [addressFournisseur,setAddressFournisseur] = useState(fournisseurAddress)
    const [numFournisseur,setNumFournisseur] = useState(fournisseurNum)
    const [emailFournisseur,setEmailFournisseur] = useState(fournisseurEmail)
    const [nameCategorie,setNameCategorie] = useState(fournisseurCatName)

    const [categorieID,setCategorieId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveFournisseur = () => {
      axios.put('http://localhost:8081/fournisseurs/edit/'+idFournisseur+'/'+nameFournisseur+
      '/'+emailFournisseur+'/'+numFournisseur+'/'+addressFournisseur+'/'+categorieID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Fournisseur modifié")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Fournisseur non modifié")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getCategories = () => {
        axios.get('http://localhost:8081/fournisseurCategories/getAllCategoriesNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            categoriesNames.push(i)
          }
          setCategoriesNames(response.data)
        })
    }

    const setCategorie = () => {
    axios.get('http://localhost:8081/fournisseurCategories/getId/'+nameCategorie , {
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
        <h3 className='head-title'>Modifier un fournisseur</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="nameFournisseur"
                    name="nameFournisseur"
                    label="Nom"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={nameFournisseur}
                    onChange={(e)=>setNameFournisseur(e.target.value)}
                    />

                    <TextField
                    required
                    id="emailFournisseur"
                    name="emailFournisseur"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emailFournisseur}
                    onChange={(e)=>setEmailFournisseur(e.target.value)}
                    />

                    <TextField
                    required
                    id="numFournisseur"
                    name="numFournisseur"
                    label="Numéro de téléphone"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={numFournisseur}
                    onChange={(e)=>setNumFournisseur(e.target.value)}
                    />

                    <TextField
                    required
                    id="addressFournisseur"
                    name="addressFournisseur"
                    label="Adresse"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={addressFournisseur}
                    onChange={(e)=>setAddressFournisseur(e.target.value)}
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
                    <Button variant="contained" onClick={saveFournisseur}>Enregistrer</Button>
                </Grid>
            </Grid>
        </Fragment>
    </div>
  )
}
