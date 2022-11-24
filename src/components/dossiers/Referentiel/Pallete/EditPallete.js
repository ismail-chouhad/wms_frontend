import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditPallete() {

    let{ palleteID , palleteName , palleteNumSerie, palleteQuantity, ProduitName } = useParams()
    var idPallete = parseInt(palleteID);

    const buttonStyle = {  marginTop: "10px" }

    const [produitsNames,setProduitsNames] = useState([])

    const [namePallete,setNamePallete] = useState(palleteName)
    const [quantityPallete,setQuantityPallete] = useState(palleteQuantity)
    const [numSeriePallete,setNumSeriePallete] = useState(palleteNumSerie)
    const [nameProduit,setNameProduit] = useState(ProduitName)

    const [produitID,setProduitId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const savePallete = () => {
      axios.put('http://localhost:8081/palletes/edit/'+idPallete+'/'+namePallete+
      '/'+numSeriePallete+'/'+quantityPallete+'/'+produitID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data === "Pallete modifiée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data === "Pallete non modifiée")
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
          for (var i = 0 ; i<response.data ; i++) {
            produitsNames.push(i)
          }
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
        <h3 className='head-title'>Modifier une pallete</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="namePallete"
                    name="namePallete"
                    label="Nom"
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
                    label="NumSerie"
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
                    fullWidth
                    type="number"
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
