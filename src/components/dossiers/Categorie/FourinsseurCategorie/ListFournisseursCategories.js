import CategorieNav from "../CategorieNav";
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

class ListFournisseursCategories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories : [] ,
            fourCategorieID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            categorieDel : '' ,
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
        axios.get('http://localhost:8081/fournisseurCategories/getTotalPages/'+page+'/'+size)
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

    getCategories = (page , size) => {
        axios.get('http://localhost:8081/fournisseurCategories/'+page+'/'+size)
        .then(response => {
            this.setState({
                categories: response.data
            })
        })
    }

    componentDidMount() {
        this.getCategories(0,5);
        this.getTotalPages(0,5);
    }

    deleteCat(categorieName) {
        axios.get(`http://localhost:8081/fournisseurCategories/getId/`+categorieName)
        .then(response => {
            this.setState({
                fourCategorieID : response.data ,
                categorieDel : categorieName
            })                 
        })
        .then(res => {      
            this.handleClickOpen() 
        } )              
    }

    deleteCatFromDB() {
        axios.delete('http://localhost:8081/fournisseurCategories/delete/'+this.state.fourCategorieID)
                this.setState({
                    errorAlert : false
                })
            this.handleClickClose();
            this.getCategories(this.state.pageNav,5);
            this.getTotalPages(this.state.pageNav,5);
    }
    setPage(page) {
        this.setState({ pageNav : page })
        this.getCategories(page,5);
        this.getTotalPages(page,5);
    }
    render(){
        return (
            <div>
                <CategorieNav/>
                <h3 className="head-title">Liste Fournisseurs Categories</h3>
                {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
                <div className='content-zone'>
                    
                    <Link to='/dossiers/categories/fourCategories/New' className='add-button'>
                        <Button color="success" variant="outlined" style={buttonStyle}>Ajouter une catégorie fournisseur</Button>
                    </Link>
        
                    <TableContainer component={Paper} className='table'>
                        <Table sx={{ minWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>Nom</b></TableCell>
                                    <TableCell ><b>Edit</b></TableCell>
                                    <TableCell ><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.categories.map(categorie => (
                                <TableRow key={categorie}>
                                    <TableCell>
                                        {categorie}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={'/dossiers/categories/fourCategories/edit/'+categorie} >
                                            <EditIcon color="primary"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                            <DeleteIcon onClick={()=>this.deleteCat(categorie)} 
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
                            Etes-vous sûrs de vouloir supprimer la catégorie {this.state.categorieDel} ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.deleteCatFromDB()} autoFocus>
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

export default ListFournisseursCategories;