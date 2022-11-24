import ReferentielNav from "../ReferentielNav";
import { Table,TableBody,TableCell,TableContainer, TableHead,
    TableRow,Paper,Button, Dialog,DialogActions,DialogContent,
    DialogContentText, DialogTitle, Alert} from "@mui/material";
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Component } from "react";


const buttonStyle = {  marginBottom: "10px" }
const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

class ListEmplacement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emplacements : [] ,
            EmplacementID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            emplacementDel : '' ,
            pageNav : 0 ,
            errorAlert : false ,
            errorAlertContent : '',
        }

    }

    handleClickOpen = () => {
        this.setState({dialogOpen : true})
    }

    handleClickClose = () => {
        this.setState({dialogOpen : false})
    }

    handleNo = () => {
        this.setState({errorAlert : false})
        this.handleClickClose()
    }
    
    getTotalPages = (page,size) => {
        axios.get('http://localhost:8081/emplacements/getTotalPages/'+page+'/'+size)
        .then(response => {
            this.setState({
                totalPages: response.data
            })
            const rows = [];

            for (var i = 0 ; i<response.data ; i++) {
                rows.push(i)
            }
            this.setState({
                pages: rows
            })
        })
    }

    getEmplacements = (page , size) => {
        axios.get('http://localhost:8081/emplacements/'+page+'/'+size)
        .then(response => {
            this.setState({
                emplacements: response.data
            })
        })
    }

    componentDidMount() {
        this.getEmplacements(0,5);
        this.getTotalPages(0,5);
    }

    deleteEmplacement(ID) {
        this.setState({
            EmplacementID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteEmplacementFromDB() {
        axios.delete('http://localhost:8081/emplacements/delete/'+this.state.EmplacementID)
                this.setState({
                    errorAlert : false
                })
            this.handleClickClose();
            this.getEmplacements(this.state.pageNav,5);
            this.getTotalPages(this.state.pageNav,5);
    }
    setPage(page) {
        this.setState({ pageNav : page })
        this.getEmplacements(page,5);
        this.getTotalPages(page,5);
    }
    render(){
        return (
            <div>
                <ReferentielNav/>
                <h3 className="head-title">Emplacements List</h3>
                {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
                <div className='content-zone'>
                    
                    <Link to='/dossiers/referentiel/emplacements/New' className='add-button'>
                        <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un emplacement </Button>
                    </Link>
        
                    <TableContainer component={Paper} className='table'>
                        <Table sx={{ minWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>Allee</b></TableCell>
                                    <TableCell ><b>NvHorizontal</b></TableCell>
                                    <TableCell ><b>NvVertical</b></TableCell>
                                    <TableCell ><b>Depot</b></TableCell>
                                    <TableCell ><b>Edit</b></TableCell>
                                    <TableCell ><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.emplacements.map(emplacement => (
                                <TableRow key={emplacement[0]}>
                                    <TableCell>
                                        {emplacement[1]}
                                    </TableCell>
                                    <TableCell>
                                        {emplacement[2]}
                                    </TableCell>
                                    <TableCell>
                                        {emplacement[3]}
                                    </TableCell>
                                    <TableCell>
                                        {emplacement[4]}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={'/dossiers/referentiel/emplacements/edit/'
                                                +parseInt(emplacement[0])+'/'+emplacement[1]+
                                                '/'+emplacement[2]+'/'+emplacement[3]
                                                +'/'+emplacement[4]} >
                                            <EditIcon color="primary"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon onClick={()=>this.deleteEmplacement(emplacement)} 
                                        sx={{ color: red[500],cursor: "pointer" }}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Navigate between pages */}
                    {this.state.pages.map(page => (
                        <Button onClick={()=>this.setPage(page)} 
                        key={page} variant="outlined" style={buttonPageStyle}>
                            {page+1}
                        </Button>
                    ))}

                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={()=>this.handleClickClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {""}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Etes-vous sûrs de vouloir supprimer {this.state.emplacementDel} ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.deleteEmplacementFromDB()} autoFocus>
                                Oui
                            </Button>
                            <Button onClick={()=>this.handleNo()}>
                                Non
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>   
            </div>
          )
    }
 
}

export default ListEmplacement;