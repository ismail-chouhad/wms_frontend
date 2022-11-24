import {useState , useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

const headStyle = {backgroundColor : "#200555",border: "1px", borderStyle: "solid", color:"white"}
const cellStyle = {border: "1px", borderStyle: "solid"}

export default function FactureClientToPDF() {

    let { factureId } = useParams();

    const [factureInfo,setFactureInfo] = useState([])

    const downloadPDF=()=> {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p','pt');
            pdf.addImage(imgData, 'PNG', 0 , 0);
            pdf.save(`Livraison_${factureId}.pdf`);
        })
    }

    const getFactureInfo=()=> {
        axios.get(`http://localhost:8081/factureClientInfo/${factureId}`)
        .then(function (response) {
            console.log(response.data)
            setFactureInfo(response.data)            
        })
    }

    useEffect(() => {
        getFactureInfo();
    });

  return (
    <div className='factureContent'>
        <Button variant="outlined" onClick={()=>downloadPDF()} startIcon={<PrintIcon color="primary"/>}>
            Download
        </Button>   
        <div id="divToPrint">
            <p className='title'>FACTURE DE LIVRAISON</p>
            <p className='table-title'>Information du facture</p>
            <TableContainer component={Paper} className="tableFacture">
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={headStyle}><b>Id de livraison</b></TableCell>
                            <TableCell style={cellStyle}>{factureInfo[0]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Réference de livraison</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[1]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Date de livraison</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[14]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <p className='table-title'>Information de produit</p>
            <TableContainer component={Paper} className="tableFacture">
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={headStyle}><b>Nom_du_produit</b></TableCell>{/*3*/}
                            <TableCell style={headStyle}><b>La_marque</b></TableCell>{/*4*/}
                            <TableCell style={headStyle}><b>Famille</b></TableCell>{/*5*/}
                            <TableCell style={headStyle}><b>Date_de_production</b></TableCell>{/*6*/}
                            <TableCell style={headStyle}><b>Date_d'expiration</b></TableCell>{/*7*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            <TableCell style={cellStyle}>{factureInfo[3]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[4]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[5]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[6]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[7]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <p className='table-title'>Quantité & Prix</p>
            <TableContainer component={Paper} className="tableFacture">
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={headStyle}><b>Quantity</b></TableCell>
                            <TableCell style={cellStyle}>{factureInfo[8]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Prix TTC</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[9]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Prix Total</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[10]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='footerFacture'>
                <u>Nom de client</u> : {factureInfo[2]}<br></br>
                <u>Email</u> : {factureInfo[11]}<br></br>
                <u>Téléphone</u> : {factureInfo[12]}<br></br>
                <u>Adresse</u> : {factureInfo[13]}<br></br>                
            </div>
        </div>
    </div>
  )
}
