import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditDepot() {

    const buttonStyle = {  marginTop: "10px" }
    let {DepotID, DepotName, DepotAddress, VilleName } = useParams();
    var idDepot = parseInt(DepotID);

    const [depotName,setDepotName] = useState(DepotName);
    const [depotAddress,setDepotAddress] = useState(DepotAddress);

    const [villesNames,setVillesNames] = useState([]);
    const [villeName,setVilleName] = useState(VilleName);
    const[villeId,setVilleId]=useState();

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    useEffect( () => {
        axios.get(`http://localhost:8081/villes/getId/${villeName}`)
        .then(response => {
            //console.log(response.data);
            setVilleId(response.data);
            });

        axios.get('http://localhost:8081/villes/getAllVillesNames' ,{
        }).then(res =>{
            console.log(res.data);
            setVillesNames(res.data);
        })

        
    });
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(depotName)
        axios.put('http://localhost:8081/depots/edit/'+idDepot+'/'+depotName+'/'+depotAddress+'/'+villeId , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Depot modifié")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Depot non modifié")
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
        <h3 className="head-title">Depot Modification</h3>
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