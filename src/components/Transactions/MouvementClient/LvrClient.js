import {Component }from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import axios from 'axios';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MouvementClientNav from './MouvementClientNav';

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class LvrClient extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            commandes : [] ,
            commandeID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
        }
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8081/CmdClient/totalPages/'+page+'/'+size)
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

    getCommandes = (page , size) => {
        axios.get('http://localhost:8081/CmdClient/'+page+'/'+size)
        .then(response => {
            console.log("commandes : "+response.data)
            this.setState({
                commandes: response.data
            })
        })
    }

    componentDidMount() {
        this.getCommandes(0,5);
        this.getTotalPages(0,5);
    }


    setPage(page) {
        this.setState({ pageNav : page })
        this.getCommandes(page,5);
        this.getTotalPages(page,5);
    }

    livrer=(idCommande)=>{
        axios.post('http://localhost:8081/clientLvrs/save/'+parseInt(idCommande))
        .then(res => {
            this.getCommandes(0,5);
        })
    }

  render() {
    return (
      <div>
        <MouvementClientNav/>
        <h3 className='head-title'>Livrer les palettes</h3>
        <div className='content-zone'>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Commandes</b></TableCell>
                            <TableCell ><b>Livrer</b></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.commandes.map(commande => (
                        <TableRow key={commande[0]}>
                            <TableCell>
                                {"Commande "+commande[1]}
                            </TableCell>
                            <TableCell>
                            <Button variant="outlined" color="success" onClick={()=>this.livrer(commande[0])} 
                                    startIcon={<LocalShippingIcon color="success"/>}>
                                Livrer
                            </Button>  
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

        </div>
      </div>
    )
  }
}