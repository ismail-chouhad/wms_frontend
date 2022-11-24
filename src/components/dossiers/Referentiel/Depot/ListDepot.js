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

class ListDepot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            depots : [] ,
            DepotID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            depotDel : '' ,
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
        axios.get('http://localhost:8081/depots/getTotalPages/'+page+'/'+size)
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

    getDepots = (page , size) => {
        axios.get('http://localhost:8081/depots/'+page+'/'+size)
        .then(response => {
            this.setState({
                depots: response.data
            })
        })
    }

    componentDidMount() {
        this.getDepots(0,5);
        this.getTotalPages(0,5);
    }

    delete(ID) {
        this.setState({
            DepotID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteFromDB() {
        axios.delete('http://localhost:8081/depots/delete/'+this.state.DepotID)
                this.setState({
                    errorAlert : false
                })
            this.handleClickClose();
            this.getDepots(this.state.pageNav,5);
            this.getTotalPages(this.state.pageNav,5);
    }
    setPage(page) {
        this.setState({ pageNav : page })
        this.getDepots(page,5);
        this.getTotalPages(page,5);
    }
    render(){
        return (
            <div>
                <ReferentielNav/>
                <h3 className="head-title">Liste  Depots</h3>
                {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
                <div className='content-zone'>
                    
                    <Link to='/dossiers/referentiel/depots/New' className='add-button'>
                        <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un depot </Button>
                    </Link>
        
                    <TableContainer component={Paper} className='table'>
                        <Table sx={{ minWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>Name</b></TableCell>
                                    <TableCell ><b>Address</b></TableCell>
                                    <TableCell ><b>City</b></TableCell>
                                    <TableCell ><b>Edit</b></TableCell>
                                    <TableCell ><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.depots.map(depot => (
                                <TableRow key={depot[0]}>
                                    <TableCell>
                                        {depot[1]}
                                    </TableCell>
                                    <TableCell>
                                        {depot[2]}
                                    </TableCell>
                                    <TableCell>
                                        {depot[3]}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={'/dossiers/referentiel/depots/edit/'
                                                +parseInt(depot[0])+'/'+depot[1]+
                                                '/'+depot[2]+'/'+depot[3]} >
                                            <EditIcon color="primary"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon onClick={()=>this.delete(depot[0])} 
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
                            Etes-vous sûrs de vouloir supprimer {this.state.depotDel} ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.deleteFromDB()} autoFocus>
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

export default ListDepot;