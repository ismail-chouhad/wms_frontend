import {Component }from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MouvementClientNav from './MouvementClientNav';

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class FctClient extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            factures : [] ,
            factureID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
        }
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8081/factureClient/totalPages/'+page+'/'+size)
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

    getFactures = (page , size) => {
        axios.get('http://localhost:8081/factureClient/'+page+'/'+size)
        .then(response => {
            this.setState({
                factures: response.data
            })
        })
    }

    componentDidMount() {
        this.getFactures(0,5);
        this.getTotalPages(0,5);
    }


    setPage(page) {
        this.setState({ pageNav : page })
        this.getFactures(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <MouvementClientNav/>
        <h3 className='head-title'>Liste des factures client</h3>
        <div className='content-zone'>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Factures</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.factures.map(facture => (
                        <TableRow key={facture[0]}>
                            <TableCell>
                                {"Facture Réception "+facture[1]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/transactions/mvclients/facturation/vue/'+facture[0]} >
                                    <VisibilityIcon color="primary"/>
                                </Link>
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
