import DossiersNav from '../DossiersNav';
import { Table,TableBody,TableCell,TableContainer, TableHead,
    TableRow,Paper,Button, Dialog,DialogActions,DialogContent,
    DialogContentText, DialogTitle} from "@mui/material";
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Component } from "react";


const buttonStyle = {  marginBottom: "10px" }
const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListClient extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            clients : [] ,
            clientID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
        }
    }

    handleClickOpen = () => {
        this.setState({dialogOpen : true})
    }

    handleClickClose = () => {
        this.setState({dialogOpen : false})
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8081/clients/getTotalPages/'+page+'/'+size)
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

    getClients = (page , size) => {
        axios.get('http://localhost:8081/clients/'+page+'/'+size)
        .then(response => {
            this.setState({
                clients: response.data
            })
        })
    }

    componentDidMount() {
        this.getClients(0,5);
        this.getTotalPages(0,5);
    }

    deleteClient(ID) {
        this.setState({
            clientID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteClientFromDB() {
        axios.delete('http://localhost:8081/clients/delete/'+this.state.clientID)
        .then(response => { 
            this.handleClickClose();
            this.getClients(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getClients(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <DossiersNav/>
        <h3 className='head-title'>Liste Clients</h3>
        <div className='content-zone'>

            <Link to='/dossiers/clients/New' className='add-button'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un client</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Nom</b></TableCell>
                            <TableCell ><b>Email</b></TableCell>
                            <TableCell ><b>Numéro de téléphone</b></TableCell>
                            <TableCell ><b>Adresse</b></TableCell>
                            <TableCell ><b>Catégorie</b></TableCell>
                            <TableCell ><b>Edit</b></TableCell>
                            <TableCell ><b>Delete</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.clients.map(client => (
                        <TableRow key={client[0]}>          
                            <TableCell>
                                {client[1]}
                            </TableCell>
                            <TableCell>
                                {client[2]}
                            </TableCell>
                            <TableCell>
                                {client[3]}
                            </TableCell>
                            <TableCell>
                                {client[4]}
                            </TableCell>
                            <TableCell>
                                {client[5]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/clients/edit/'+
                                parseInt(client[0])+'/'+client[1]+'/'+client[2]+
                                '/'+client[3]+'/'+client[4]+'/'+client[5]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <DeleteIcon onClick={()=>this.deleteClient(client[0])} 
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
                    Etes-vous sûrs de vouloir supprimer ce client ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteClientFromDB()} autoFocus>
                        Oui
                    </Button>
                    <Button onClick={()=>this.handleClickClose()}>Non</Button>
                </DialogActions>
            </Dialog>
        </div>
      </div>
    )
  }
}
