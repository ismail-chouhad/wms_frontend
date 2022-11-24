import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditProduit() {

    const buttonStyle = {  marginTop: "10px" }
    let {ProduitID, BarCode, ProduitName, PriceUnit, PriceTTC, MarqueName, FamilleName, TVATaux, DatePrd, DateExp } = useParams();
    var idProduit = parseInt(ProduitID);

    const [barCode,setBarCode] = useState(BarCode);
    const [produitName,setProduitName] = useState(ProduitName);
    const [priceUnit,setPriceUnit] = useState(PriceUnit);
    const [priceTTC,setPriceTTC] = useState(PriceTTC);


    const [marquesNames,setMarquesNames] = useState([]);
    const [marqueName,setMarqueName] = useState(MarqueName);

    const [famillesNames,setFamillesNames] = useState([]);
    const [familleName,setFamilleName] = useState(FamilleName);

    const [tvasTauxs,setTVAsTauxs] = useState([]);
    const [tvaTaux,setTVATaux] = useState(TVATaux);

    const [datePrds,setDatePrds] = useState([]);
    const [datePrd,setDatePrd] = useState(DatePrd);

    const [dateExps,setDateExps] = useState([]);
    const [dateExp,setDateExp] = useState(DateExp);

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    useEffect( () => {
        axios.get('http://localhost:8081/marques/getAllMarquesNames' ,{
        }).then(res =>{
            console.log(res.data);
            setMarquesNames(res.data);
        }) 
        
        axios.get('http://localhost:8081/familles/getAllFamillesNames' ,{
        }).then(res =>{
            console.log(res.data);
            setFamillesNames(res.data);
        }) 

        axios.get('http://localhost:8081/tvas/getAllTVAsTauxs' ,{
        }).then(res =>{
            console.log(res.data);
            setTVAsTauxs(res.data);
        }) 

        axios.get('http://localhost:8081/datePrds/getAllDatePrdsDates' ,{
        }).then(res =>{
            console.log(res.data);
            setDatePrds(res.data);
        })

        axios.get('http://localhost:8081/dateExps/getAllDateExpsDates' ,{
        }).then(res =>{
            console.log(res.data);
            setDateExps(res.data);
        })

           
    });
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(produitName)
        axios.put('http://localhost:8081/produits/edit/'+idProduit+'/'+barCode+'/'+produitName+'/'+priceUnit+'/'+priceTTC+'/'+marqueName+'/'
        +familleName+'/'+tvaTaux+'/'+datePrd+'/'+dateExp , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Produit modifié")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Produit non modifié")
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
        <h3 className="head-title">Produit Modification</h3>
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
                    type="number"
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
                    label="Unit price"
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
                    label="TTC price"
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
                        label="Date de production"
                        onChange={(e)=>setDatePrd(e.target.value)}
                        >
                        {datePrds.map(date => (
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
                        label="Date d'expiration"
                        onChange={(e)=>setDateExp(e.target.value)}
                        >
                        {dateExps.map(date => (
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