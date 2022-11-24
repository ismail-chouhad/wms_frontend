import { TextField, Grid, Button, Alert, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import ReferentielNav from '../ReferentielNav';

export default function NewEmplacement() {

    const buttonStyle = {  marginTop: "10px" }
    const [emplacementAllee,setEmplacementAllee] = useState('')
    const [emplacementNvH,setEmplacementNvH] = useState('')
    const [emplacementNvV,setEmplacementNvV] = useState('')
    const [depotId,setDepotID] = useState('')
    const [depotName,setDepotName] = useState('')
    const [depotsNames,setDepotsNames] = useState([])


    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(emplacementAllee)
        axios.post('http://localhost:8081/emplacements/save/'
        +emplacementAllee+'/'+emplacementNvH+'/'
        +emplacementNvV+'/'+depotId , {
        })
        .then(res => {
            console.log(res.data);
            if(res.data === "Emplacement ajouté")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Emplacement existe déjà")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }

    const getDepotsNames =() => {
        axios.get('http://localhost:8081/depots/getAllDepotsNames' , {
        })
        .then(res => {
            // console.log(res.data)
            setDepotsNames(res.data);
        })
    }

    const getDepotId =() => {
        axios.get('http://localhost:8081/depots/getId/'+depotName ,{
        })
        .then(res =>{
            setDepotID(res.data);
        })
    }

    useEffect(() => {
        getDepotsNames();
        getDepotId();
    })

  return (
    <div>
        <ReferentielNav/>
        <h3 className="head-title">Ajouter Emplacement</h3>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }
        <Fragment>
            <Grid container className='content-zone'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="emplacementAllee"
                    name="emplacementAllee"
                    label="Allee"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emplacementAllee}
                    onChange={(e)=>setEmplacementAllee(e.target.value)}/>

                    <TextField
                    required
                    id="emplacementNvH"
                    name="emplacementNvH"
                    label="NvHorizontal"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emplacementNvH}
                    onChange={(e)=>setEmplacementNvH(e.target.value)}/>

                    <TextField
                    required
                    id="emplacementNvV"
                    name="emplacementNvV"
                    label="NvVertical"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emplacementNvV}
                    onChange={(e)=>setEmplacementNvV(e.target.value)}/>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="depot-multiple-name-label">Depot</InputLabel>
                        <Select 
                        labelId="depot-select-label"
                        id="depot-select"
                        value={depotName}
                        label="Depot"
                        onChange={(e)=>setDepotName(e.target.value)}
                        >
                        {depotsNames.map(name => (
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