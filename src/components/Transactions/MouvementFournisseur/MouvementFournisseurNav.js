import { Link } from "react-router-dom";

const MouvementFournisseurNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/transactions/mvfournisseurs/commande"> Commande </Link> </li>
                    <li> <Link className="link-branches" to="/transactions/mvfournisseurs/reception"> Réception </Link> </li>
                    <li> <Link className="link-branches" to="/transactions/mvfournisseurs/facturation"> Facturation </Link> </li>
                    <li> <Link className="link-branches" to="/transactions"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default MouvementFournisseurNav;