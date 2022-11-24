import { Link } from "react-router-dom";

const ReferentielNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/dossiers/referentiel/villes"> Ville </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/depots"> Depot </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/emplacements"> Emplacement </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/marques"> La marque </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/familles"> Famille </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/tvas"> TVA </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/datePrds"> Date de production </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/dateExps"> Date d'expiration </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/produits"> Produit </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel/palletes"> Pallete </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default ReferentielNav;
