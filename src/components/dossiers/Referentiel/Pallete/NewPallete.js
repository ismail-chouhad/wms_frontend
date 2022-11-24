import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewPallete() {

    const buttonStyle = {  marginTop: "10px" }

    const [produitsNames,setProduitsNames] = useState([])

    const [namePallete,setNamePallete] = useState('')
    const [numSeriePallete,setNumSeriePallete] = useState('')
    const [quantityPallete,setQuantityPallete] = useState('')
    const [nameProduit,setNameProduit] = useState('')

    const [produitID,setProduitId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const savePallete = () => {
      axios.post('http://localhost:8081/palletes/save/'+namePallete+'/'+numSeriePallete+'/'+
      quantityPallete+'/'+produitID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Pallete ajoutée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Pallete existe deja")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getProduits = () => {
        axios.get('http://localhost:8081/produits/getAllProduitsNames')
        .then(response => {
          setProduitsNames(response.data)
        })
    }

    const setProduit = () => {
    axios.get('http://localhost:8081/produits/getId/'+nameProduit , {
        }).then(res => {
            setProduitId(res.data);
        })
    }
  
    useEffect(() => {
        getProduits();
        setProduit();
    });

  return (
    <div>
        <ReferentielNav/>
        <h3 className='head-title'>Ajouter une pallete</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="namePallete"
                    name="namePallete"
                    label="Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={namePallete}
                    onChange={(e)=>setNamePallete(e.target.value)}
                    />

                    <TextField
                    required
                    id="numSeriePallete"
                    name="numSeriePallete"
                    label="Numéro de serie"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={numSeriePallete}
                    onChange={(e)=>setNumSeriePallete(e.target.value)}
                    />  

                    <TextField
                    required
                    id="quantityPallete"
                    name="quantityPallete"
                    label="Quantity"
                    type="number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={quantityPallete}
                    onChange={(e)=>setQuantityPallete(e.target.value)}
                    />                 

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="produit-multiple-name-label">Produits</InputLabel>
                        <Select 
                        labelId="produit-select-label"
                        id="produit-select"
                        value={nameProduit}
                        label="Produits"
                        onChange={(e)=>setNameProduit(e.target.value)}
                        >
                        {produitsNames.map(produit => (
                            <MenuItem key={produit} value={produit}>{produit}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={savePallete}>Enregistrer</Button>
                </Grid>
            </Grid>
        </Fragment>
    </div>
  )
}
