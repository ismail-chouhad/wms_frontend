import { Table,TableBody,TableCell,TableContainer, TableHead,
    TableRow,Paper,Button, Dialog,DialogActions,DialogContent,
    DialogContentText, DialogTitle} from "@mui/material";
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Component } from "react";
import ReferentielNav from '../ReferentielNav';


const buttonStyle = {  marginBottom: "10px" }
const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListPallete extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            palletes : [] ,
            palleteID : '' ,
            totalPages : 0 ,
            pages : [] ,
            open: false,
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
        axios.get('http://localhost:8081/palletes/getTotalPages/'+page+'/'+size)
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

    getPalletes = (page , size) => {
        axios.get('http://localhost:8081/palletes/'+page+'/'+size)
        .then(response => {
            this.setState({
                palletes: response.data
            })
        })
    }

    componentDidMount() {
        this.getPalletes(0,5);
        this.getTotalPages(0,5);
    }

    deletePallete(ID) {
        this.setState({
            palleteID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deletePalleteFromDB() {
        axios.delete('http://localhost:8081/palletes/delete/'+this.state.palleteID)
        .then(response => { 
            this.handleClickClose();
            this.getPalletes(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getPalletes(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <ReferentielNav/>
        <h3 className='head-title'>List des Palletes</h3>
        <div className='content-zone'>

            <Link to='/dossiers/referentiel/palletes/New' className='add-button'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter une pallete</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Name</b></TableCell>
                            <TableCell ><b>Numéro de serie</b></TableCell>
                            <TableCell ><b>Quantity</b></TableCell>
                            <TableCell ><b>Produit</b></TableCell>
                            <TableCell ><b>Edit</b></TableCell>
                            <TableCell ><b>Delete</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.palletes.map(pallete => (
                        <TableRow key={pallete[0]}>          
                            <TableCell>
                                {pallete[1]}
                            </TableCell>
                            <TableCell>
                                {pallete[2]}
                            </TableCell>
                            <TableCell>
                                {pallete[3]}
                            </TableCell>
                            <TableCell>
                                {pallete[4]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/referentiel/palletes/edit/'+
                                parseInt(pallete[0])+'/'+pallete[1]+'/'+pallete[2]+
                                '/'+pallete[3]+'/'+pallete[4]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <DeleteIcon onClick={()=>this.deletePallete(pallete[0])} 
                                sx={{ color: red[500] ,cursor: "pointer" }}/>
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
                    Etes-vous sûrs de vouloir supprimer cette pallete ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deletePalleteFromDB()} autoFocus>
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
