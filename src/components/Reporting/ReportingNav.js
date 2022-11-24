import { Link } from "react-router-dom";

const ReportingNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul>
                    <li> <Link className="link-branches" to="/reporting/stockGlobal"> Etat de stock global </Link> </li>
                    <li> <Link className="link-branches" to="/reporting/stockDepots"> Etat de stock par dépôts </Link> </li>
                    <li> <Link className="link-branches" to="/reporting/stockFamilles"> Etat de stock par familles </Link> </li>
                    <li> <Link className="link-branches" to="/reporting/stockFournisseurs"> Etat de stock par fournisseurs </Link> </li>
                    <li> <Link className="link-branches" to="/"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default ReportingNav;