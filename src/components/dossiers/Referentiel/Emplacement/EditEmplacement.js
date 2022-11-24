import { TextField, Grid, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferentielNav from '../ReferentielNav';

export default function EditEmplacement() {

    const buttonStyle = {  marginTop: "10px" }
    let {EmplacementID, EmplacementAllee, EmplacementNvH, EmplacementNvV, DepotName } = useParams();
    var idEmplacement = parseInt(EmplacementID);

    const [emplacementAllee,setEmplacementAllee] = useState(EmplacementAllee);
    const [emplacementNvH,setEmplacementNvH] = useState(EmplacementNvH);
    const [emplacementNvV,setEmplacementNvV] = useState(EmplacementNvV);

    const [depotsNames,setDepotsNames] = useState([]);
    const [depotName,setDepotName] = useState(DepotName);
    const[depotId,setDepotId]=useState();

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    useEffect( () => {
        axios.get(`http://localhost:8081/depots/getId/${depotName}`)
        .then(response => {
            //console.log(response.data);
            setDepotId(response.data);
            });

        axios.get('http://localhost:8081/depots/getAllDepotsNames' ,{
        }).then(res =>{
            console.log(res.data);
            setDepotsNames(res.data);
        })      
    });
    const handleClick=(e)=>{
        e.preventDefault()
        //console.log(emplacementAllee)
        axios.put('http://localhost:8081/emplacements/edit/'+idEmplacement+'/'+emplacementAllee+'/'
        +emplacementNvH+'/'+emplacementNvV+'/'+depotId , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Emplacement modifié")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data === "Emplacement non modifié")
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
        <h3 className="head-title">Emplacement Modification</h3>
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
                        label="Depots"
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