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
import ReportingNav from './ReportingNav';

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class StockGlobal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            produits : [] ,
            produitID : '' ,
            totalPages : 0 ,
            pages : [] ,
            pageNav : 0 ,
        }
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8081/produits/totalPages/'+page+'/'+size)
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
        axios.get('http://localhost:8081/produits/stockGlobal/'+page+'/'+size)
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


    setPage(page) {
        this.setState({ pageNav : page })
        this.getProduits(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <ReportingNav/>
        <h3 className='head-title'>Etat de stock global</h3>
        <div className='content-zone'>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Produit</b></TableCell>
                            <TableCell ><b>Quantit??</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.produits.map(produit => (
                        <TableRow key={produit[0]} >
                            <TableCell>
                                {produit[0]}
                            </TableCell>
                            <TableCell>
                                {produit[1]}
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
