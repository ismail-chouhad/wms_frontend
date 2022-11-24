import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categorie from "./components/dossiers/Categorie/Categorie";
import EditClientsCategories from "./components/dossiers/Categorie/ClientCategorie/EditClientsCategories";
import ListClientsCategories from "./components/dossiers/Categorie/ClientCategorie/ListClientsCategories";
import NewClientsCategories from "./components/dossiers/Categorie/ClientCategorie/NewClientsCategories";
import EditFournisseursCategories from "./components/dossiers/Categorie/FourinsseurCategorie/EditFournisseursCategories";
import ListFournisseursCategories from "./components/dossiers/Categorie/FourinsseurCategorie/ListFournisseursCategories";
import NewFournisseursCategories from "./components/dossiers/Categorie/FourinsseurCategorie/NewFournisseursCategories";
import EditClient from "./components/dossiers/Client/EditClient";
import ListClient from "./components/dossiers/Client/ListClient";
import NewClient from "./components/dossiers/Client/NewClient";

import Dossiers from "./components/dossiers/Dossiers";
import EditFournisseur from "./components/dossiers/Fournisseur/EditFournisseur";
import ListFournisseur from "./components/dossiers/Fournisseur/ListFournisseur";
import NewFournisseur from "./components/dossiers/Fournisseur/NewFournisseur";
import EditDateExp from "./components/dossiers/Referentiel/DateExp/EditDateExp";
import ListDateExp from "./components/dossiers/Referentiel/DateExp/ListDateExp";
import NewDateExp from "./components/dossiers/Referentiel/DateExp/NewDateExp";
import EditDatePrd from "./components/dossiers/Referentiel/DatePrd/EditDatePrd";
import ListDatePrd from "./components/dossiers/Referentiel/DatePrd/ListDatePrd";
import NewDatePrd from "./components/dossiers/Referentiel/DatePrd/NewDatePrd";
import EditDepot from "./components/dossiers/Referentiel/Depot/EditDepot";
import ListDepot from "./components/dossiers/Referentiel/Depot/ListDepot";
import NewDepot from "./components/dossiers/Referentiel/Depot/NewDepot";
import EditEmplacement from "./components/dossiers/Referentiel/Emplacement/EditEmplacement";
import ListEmplacement from "./components/dossiers/Referentiel/Emplacement/ListEmplacement";
import NewEmplacement from "./components/dossiers/Referentiel/Emplacement/NewEmplacement";
import EditFamille from "./components/dossiers/Referentiel/Famille/EditFamille";
import ListFamille from "./components/dossiers/Referentiel/Famille/ListFamille";
import NewFamille from "./components/dossiers/Referentiel/Famille/NewFamille";
import EditMarque from "./components/dossiers/Referentiel/Marque/EditMarque";
import ListMarque from "./components/dossiers/Referentiel/Marque/ListMarque";
import NewMarque from "./components/dossiers/Referentiel/Marque/NewMarque";
import EditPallete from "./components/dossiers/Referentiel/Pallete/EditPallete";
import ListPallete from "./components/dossiers/Referentiel/Pallete/ListPallete";
import NewPallete from "./components/dossiers/Referentiel/Pallete/NewPallete";
import EditProduit from "./components/dossiers/Referentiel/Produit/EditProduit";
import ListProduit from "./components/dossiers/Referentiel/Produit/ListProduit";
import NewProduit from "./components/dossiers/Referentiel/Produit/NewProduit";
import Referentiel from "./components/dossiers/Referentiel/Referentiel";
import EditTVA from "./components/dossiers/Referentiel/TVA/EditTVA";
import ListTVA from "./components/dossiers/Referentiel/TVA/ListTVA";
import NewTVA from "./components/dossiers/Referentiel/TVA/NewTVA";
import EditVille from "./components/dossiers/Referentiel/Ville/EditVille";
import ListVille from "./components/dossiers/Referentiel/Ville/ListVille";
import NewVille from "./components/dossiers/Referentiel/Ville/NewVille";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Reporting from "./components/Reporting/Reporting";
import StockDepot from "./components/Reporting/StockDepot";
import StockFamille from "./components/Reporting/StockFamille";
import StockFournisseur from "./components/Reporting/StockFournisseur";
import StockGlobal from "./components/Reporting/StockGlobal";
import CmdClient from "./components/Transactions/MouvementClient/CmdClient";
import FactureClientToPDF from "./components/Transactions/MouvementClient/FactureClientToPDF";
import FctClient from "./components/Transactions/MouvementClient/FctClient";
import LvrClient from "./components/Transactions/MouvementClient/LvrClient";
import MouvementClient from "./components/Transactions/MouvementClient/MouvementClient";
import CmdFournisseur from "./components/Transactions/MouvementFournisseur/CmdFournisseur";
import FactureToPDF from "./components/Transactions/MouvementFournisseur/FactureToPDF";
import FctFournisseur from "./components/Transactions/MouvementFournisseur/FctFournisseur";
import MouvementFournisseur from "./components/Transactions/MouvementFournisseur/MouvementFournisseur";
import RspFournisseur from "./components/Transactions/MouvementFournisseur/RspFournisseur";
import Transactions from "./components/Transactions/Transactions";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar/>
        <div className="content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dossiers' element={<Dossiers/>} />
          <Route path='/transactions' element={<Transactions/>} />
          <Route path='/reporting' element={<Reporting/>} />


          <Route path="/dossiers/categories" element={<Categorie/>}/>

          <Route path="/dossiers/categories/cltCategories" element={<ListClientsCategories/>}/>
          <Route path="/dossiers/categories/cltCategories/New" element={<NewClientsCategories/>}/>
          <Route path="dossiers/categories/cltCategories/edit/:categorie" element={<EditClientsCategories/>}/>

          <Route path="/dossiers/categories/fourCategories" element={<ListFournisseursCategories/>}/>
          <Route path="/dossiers/categories/fourCategories/New" element={<NewFournisseursCategories/>}/>
          <Route path="dossiers/categories/fourCategories/edit/:categorie" element={<EditFournisseursCategories/>}/>


          <Route path="/dossiers/clients" element={<ListClient/>}/>
          <Route path="/dossiers/clients/New" element={<NewClient/>}/>
          <Route path="/dossiers/clients/edit/:clientID/:clientName/:clientEmail/:clientNum/:clientAddress/:clientCatName" element={<EditClient/>}/>

          <Route path="/dossiers/fournisseurs" element={<ListFournisseur/>}/>
          <Route path="/dossiers/fournisseurs/New" element={<NewFournisseur/>}/>
          <Route path="/dossiers/fournisseurs/edit/:fournisseurID/:fournisseurName/:fournisseurEmail/:fournisseurNum/:fournisseurAddress/:fournisseurCatName" element={<EditFournisseur/>}/>


          <Route path="/dossiers/referentiel" element={<Referentiel/>}/>
          
          <Route path="dossiers/referentiel/villes" element={<ListVille/>}/>
          <Route path="/dossiers/referentiel/villes/New" element={<NewVille/>}/>
          <Route path="dossiers/referentiel/villes/edit/:ville" element={<EditVille/>}/>

          <Route path="/dossiers/referentiel/depots" element={<ListDepot/>}/>
          <Route path="/dossiers/referentiel/depots/New" element={<NewDepot/>}/>
          <Route path="/dossiers/referentiel/depots/edit/:DepotID/:DepotName/:DepotAddress/:VilleName" element={<EditDepot/>}/>

          <Route path="/dossiers/referentiel/emplacements" element={<ListEmplacement/>}/>
          <Route path="/dossiers/referentiel/emplacements/New" element={<NewEmplacement/>}/>
          <Route path="/dossiers/referentiel/emplacements/edit/:EmplacementID/:EmplacementAllee/:EmplacementNvH/:EmplacementNvV/:DepotName" element={<EditEmplacement/>}/>
          
          <Route path="/dossiers/referentiel/marques" element={<ListMarque/>}/>
          <Route path="/dossiers/referentiel/marques/New" element={<NewMarque/>}/>
          <Route path="/dossiers/referentiel/marques/edit/:marque" element={<EditMarque/>}/>

          <Route path="/dossiers/referentiel/familles" element={<ListFamille/>}/>
          <Route path="/dossiers/referentiel/familles/New" element={<NewFamille/>}/>
          <Route path="/dossiers/referentiel/familles/edit/:famille" element={<EditFamille/>}/>
          
          <Route path="/dossiers/referentiel/tvas" element={<ListTVA/>}/>
          <Route path="/dossiers/referentiel/tvas/New" element={<NewTVA/>}/>
          <Route path="/dossiers/referentiel/tvas/edit/:tva" element={<EditTVA/>}/>

          <Route path="/dossiers/referentiel/datePrds" element={<ListDatePrd/>}/>
          <Route path="/dossiers/referentiel/datePrds/New" element={<NewDatePrd/>}/>
          <Route path="/dossiers/referentiel/datePrds/edit/:datePrd" element={<EditDatePrd/>}/>
          
          <Route path="/dossiers/referentiel/dateExps" element={<ListDateExp/>}/>
          <Route path="/dossiers/referentiel/dateExps/New" element={<NewDateExp/>}/>
          <Route path="/dossiers/referentiel/dateExps/edit/:dateExp" element={<EditDateExp/>}/>

          <Route path="/dossiers/referentiel/produits" element={<ListProduit/>}/>
          <Route path="/dossiers/referentiel/produits/New" element={<NewProduit/>}/>
          <Route path="/dossiers/referentiel/produits/edit/:ProduitID/:BarCode/:ProduitName/:PriceUnit/:PriceTTC/:MarqueName/:FamilleName/:TVATaux/:DatePrd/:DateExp" element={<EditProduit/>}/>
          
          <Route path="/dossiers/referentiel/palletes" element={<ListPallete/>}/>
          <Route path="/dossiers/referentiel/palletes/New" element={<NewPallete/>}/>
          <Route path="/dossiers/referentiel/palletes/edit/:palleteID/:palleteName/:palleteNumSerie/:palleteQuantity/:ProduitName" element={<EditPallete/>}/>

          
          <Route path='/transactions/mvfournisseurs' element={<MouvementFournisseur/>} />
          
          <Route path='/transactions/mvfournisseurs/commande' element={<CmdFournisseur/>} />
          <Route path='/transactions/mvfournisseurs/reception' element={<RspFournisseur/>} />
          <Route path='/transactions/mvfournisseurs/facturation' element={<FctFournisseur/>} />
          <Route path='/transactions/mvfournisseurs/facturation/vue/:factureId' element={<FactureToPDF/>} />

          <Route path='/transactions/mvclients/commande' element={<CmdClient/>} />
          <Route path='/transactions/mvclients/livraison' element={<LvrClient/>} />
          <Route path='/transactions/mvclients/facturation' element={<FctClient/>} />
          <Route path='/transactions/mvclients/facturation/vue/:factureId' element={<FactureClientToPDF/>} />

          <Route path='/transactions/mvclients' element={<MouvementClient/>} />


          <Route path='/reporting/stockGlobal' element={<StockGlobal/>} />
          <Route path='/reporting/stockDepots' element={<StockDepot/>} />
          <Route path='/reporting/stockFamilles' element={<StockFamille/>} />
          <Route path='/reporting/stockFournisseurs' element={<StockFournisseur/>} />
          
        </Routes>
        </div>
      </div>    
    </Router>
  );
}

export default App;