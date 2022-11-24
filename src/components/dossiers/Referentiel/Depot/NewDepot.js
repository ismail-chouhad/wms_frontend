import { TextField, Grid, Button, Alert, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewDepot() {

    const buttonStyle = {  marginTop: "10px" }
    const [depotName,setDepotName] = useState('')
    const [depotAddress,setDepotAddress] = useState('')
    const [villeId,setVilleID] = useState('')
    const [villeName,setVilleName] = useState('')
    const [villesNames,setVillesNames] = useState([])


    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(depotName)
        axios.post('http://localhost:8081/depots/save/'+depotName+'/'+depotAddress+'/'+villeId , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Depot ajouté")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Depot existe déjà")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }

    const getVillesNames =() => {
        axios.get('http://localhost:8081/villes/getAllVillesNames' , {
        })
        .then(res => {
            // console.log(res.data)
            setVillesNames(res.data);
        })
    }

    const getVilleId =() => {
        axios.get('http://localhost:8081/villes/getId/'+villeName ,{
        })
        .then(res =>{
            setVilleID(res.data);
        })
    }


    useEffect(() => {
        getVillesNames();
        getVilleId();
    })

  return (
    <div>
        <ReferentielNav/>
        <h3 className="head-title">Ajouter Depot</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="depotName"
                    name="depotName"
                    label="Depot name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={depotName}
                    onChange={(e)=>setDepotName(e.target.value)}/>

                    <TextField
                    required
                    id="depotAddress"
                    name="depotAddress"
                    label="Depot address"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={depotAddress}
                    onChange={(e)=>setDepotAddress(e.target.value)}/>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="ville-multiple-name-label">Ville</InputLabel>
                        <Select 
                        labelId="ville-select-label"
                        id="ville-select"
                        value={villeName}
                        label="Ville"
                        onChange={(e)=>setVilleName(e.target.value)}
                        >
                        {villesNames.map(name => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
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