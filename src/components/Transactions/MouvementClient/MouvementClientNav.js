import { Link } from "react-router-dom";

const MouvementClientNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/transactions/mvclients/commande"> Commande </Link> </li>
                    <li> <Link className="link-branches" to="/transactions/mvclients/livraison"> Livraison </Link> </li>
                    <li> <Link className="link-branches" to="/transactions/mvclients/facturation"> Facturation </Link> </li>
                    <li> <Link className="link-branches" to="/transactions"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default MouvementClientNav;