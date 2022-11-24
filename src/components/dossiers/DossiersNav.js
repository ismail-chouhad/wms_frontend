import { Link } from "react-router-dom";

const DossiersNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/dossiers/categories"> Catégories </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/clients"> Clients </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/fournisseurs"> Fournisseurs </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/referentiel"> Référentiel </Link> </li>
                    <li> <Link className="link-branches" to="/"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default DossiersNav;