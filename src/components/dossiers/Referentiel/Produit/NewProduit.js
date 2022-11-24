import { TextField, Grid, Button, Alert, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewProduit() {

    const buttonStyle = {  marginTop: "10px" }
    const [barCode,setBarCode] = useState('')
    const [produitName,setProduitName] = useState('')
    const [priceUnit,setPriceUnit] = useState(null)
    const [priceTTC,setPriceTTC] = useState(null)
    
    const [marqueName,setMarqueName] = useState('')
    const [marquesNames,setMarquesNames] = useState([])

    const [familleName,setFamilleName] = useState('')
    const [famillesNames,setFamillesNames] = useState([])

    const [tvaTaux,setTVATaux] = useState(null)
    const [tvasTauxs,setTVAsTauxs] = useState([])

    const [datePrd,setDatePrd] = useState('')
    const [datesPrds,setDatesPrds] = useState([])

    const [dateExp,setDateExp] = useState('')
    const [datesExps,setDatesExps] = useState([])

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8081/produits/save/'+barCode+'/'+produitName+'/'+priceUnit +'/'+priceTTC+'/'
        +marqueName+'/'+ familleName+'/'+ tvaTaux+'/'+ datePrd+'/'+ dateExp, {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Produit ajouté")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Produit existe déjà")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }
/*-----------------------------------Marque-----------------------------------------*/
    const getMarquesNames =() => {
        axios.get('http://localhost:8081/marques/getAllMarquesNames' , {
        })
        .then(res => {
            // console.log(res.data)
            setMarquesNames(res.data);
        })
    }
/*----------------------------------Famille------------------------------------------*/
    const getFamillesNames =() => {
        axios.get('http://localhost:8081/familles/getAllFamillesNames' , {
        })
        .then(res => {
            // console.log(res.data)
            setFamillesNames(res.data);
        })
    }
/*-----------------------------------TVA---------------------------------------------*/
    const getTVATauxs =() => {
        axios.get('http://localhost:8081/tvas/getAllTVAsTauxs' , {
        })
        .then(res => {
            // console.log(res.data)
            setTVAsTauxs(res.data);
        })
    }
/*----------------------------Date de production------------------------------------*/
    const getDatePrds =() => {
        axios.get('http://localhost:8081/datePrds/getAllDatePrdsDates' , {
        })
        .then(res => {
            // console.log(res.data)
            setDatesPrds(res.data);
        })
    }
/*----------------------------Date d'expiration--------------------------------------*/
    const getDateExps =() => {
        axios.get('http://localhost:8081/dateExps/getAllDateExpsDates' , {
        })
        .then(res => {
            // console.log(res.data)
            setDatesExps(res.data);
        })
    }
/*---------------------------------------------------------------------------------*/
    useEffect(() => {
        getMarquesNames();
        getFamillesNames();
        getTVATauxs();
        getDatePrds();
        getDateExps();
    })

  return (
    <div>
        <ReferentielNav/>
        <h3 className="head-title">Ajouter Produit</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="barCode"
                    name="barCode"
                    label="BarCode"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={barCode}
                    onChange={(e)=>setBarCode(e.target.value)}/>

                    <TextField
                    required
                    id="produitName"
                    name="produitName"
                    label="Produit name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={produitName}
                    onChange={(e)=>setProduitName(e.target.value)}/>

                    <TextField
                    required
                    id="priceUnit"
                    name="priceUnit"
                    label="Unit Price"
                    type="number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={priceUnit}
                    onChange={(e)=>setPriceUnit(e.target.value)}/>

                    <TextField
                    required
                    id="priceTTC"
                    name="priceTTC"
                    label="TTC Price"
                    type="number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={priceTTC}
                    onChange={(e)=>setPriceTTC(e.target.value)}/>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="marque-multiple-name-label">Marque</InputLabel>
                        <Select 
                        labelId="marque-select-label"
                        id="marque-select"
                        value={marqueName}
                        label="Marque"
                        onChange={(e)=>setMarqueName(e.target.value)}
                        >
                        {marquesNames.map(name => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="famille-multiple-name-label">Famille</InputLabel>
                        <Select 
                        labelId="famille-select-label"
                        id="famille-select"
                        value={familleName}
                        label="Famille"
                        onChange={(e)=>setFamilleName(e.target.value)}
                        >
                        {famillesNames.map(name => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="tva-multiple-taux-label">TVA</InputLabel>
                        <Select 
                        labelId="tva-select-label"
                        id="tva-select"
                        value={tvaTaux}
                        type="number"
                        label="TVA"
                        onChange={(e)=>setTVATaux(e.target.value)}
                        >
                        {tvasTauxs.map(taux => (
                            <MenuItem key={taux} value={taux}>{taux}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="datePrd-multiple-date-label">Date de production</InputLabel>
                        <Select 
                        labelId="datePrd-select-label"
                        id="datePrd-select"
                        value={datePrd}
                        type="date"
                        label="Date de production"
                        onChange={(e)=>setDatePrd(e.target.value)}
                        >
                        {datesPrds.map(date => (
                            <MenuItem key={date} value={date}>{date}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="dateExp-multiple-date-label">Date d'expiration</InputLabel>
                        <Select 
                        labelId="dateExp-select-label"
                        id="dateExp-select"
                        value={dateExp}
                        type="date"
                        label="Date d'expiration"
                        onChange={(e)=>setDateExp(e.target.value)}
                        >
                        {datesExps.map(date => (
                            <MenuItem key={date} value={date}>{date}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
	        </Grid>
        </Fragment>
        
    </div>
  )
}