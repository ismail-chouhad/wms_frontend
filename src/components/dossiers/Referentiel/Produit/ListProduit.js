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

class ListProduit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            produits : [] ,
            ProduitID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            produitDel : '' ,
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
        axios.get('http://localhost:8081/produits/getTotalPages/'+page+'/'+size)
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

    getProduits = (page , size) => {
        axios.get('http://localhost:8081/produits/'+page+'/'+size)
        .then(response => {
            this.setState({
                produits: response.data
            })
        })
    }

    componentDidMount() {
        this.getProduits(0,5);
        this.getTotalPages(0,5);
    }

    delete(ID) {
        this.setState({
            ProduitID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteFromDB() {
        axios.delete('http://localhost:8081/produits/delete/'+this.state.ProduitID)
                this.setState({
                    errorAlert : false
                })
            this.handleClickClose();
            this.getProduits(this.state.pageNav,5);
            this.getTotalPages(this.state.pageNav,5);
    }
    setPage(page) {
        this.setState({ pageNav : page })
        this.getProduits(page,5);
        this.getTotalPages(page,5);
    }
    render(){
        return (
            <div>
                <ReferentielNav/>
                <h3 className="head-title">Liste  Produits</h3>
                {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
                <div className='content-zone'>
                    
                    <Link to='/dossiers/referentiel/produits/New' className='add-button'>
                        <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un produit </Button>
                    </Link>
        
                    <TableContainer component={Paper} className='table'>
                        <Table sx={{ minWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>BarCode</b></TableCell>
                                    <TableCell ><b>Produit Name</b></TableCell>
                                    <TableCell ><b>Unit price</b></TableCell>
                                    <TableCell ><b>HT price</b></TableCell>
                                    <TableCell ><b>TTC price</b></TableCell>
                                    <TableCell ><b>Marque Name</b></TableCell>
                                    <TableCell ><b>Famille Name</b></TableCell>
                                    <TableCell ><b>TVA</b></TableCell>
                                    <TableCell ><b>Date de production</b></TableCell>
                                    <TableCell ><b>Date d'expiration</b></TableCell>
                                    <TableCell ><b>Edit</b></TableCell>
                                    <TableCell ><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.produits.map(produit => (
                                <TableRow key={produit[0]}>
                                    <TableCell>
                                        {produit[1]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[2]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[3]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[4]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[5]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[6]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[7]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[8]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[9]}
                                    </TableCell>
                                    <TableCell>
                                        {produit[10]}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={'/dossiers/referentiel/produits/edit/'
                                                +parseInt(produit[0])+'/'+produit[1]+'/'+produit[2]+
                                                '/'+produit[3]+'/'+produit[5]+'/'+produit[6]+'/'+
                                                produit[7]+'/'+produit[8]+'/'+produit[9]+'/'+produit[10]} >
                                            <EditIcon color="primary"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon onClick={()=>this.delete(produit[0])} 
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
                            Etes-vous sûrs de vouloir supprimer {this.state.produitDel} ?
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

export default ListProduit;