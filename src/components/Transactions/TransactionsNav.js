import { Link } from "react-router-dom";

const TransactionsNav = () => {
    return (
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/transactions/mvfournisseurs"> Mouvement Fournisseurs </Link> </li>
                    <li> <Link className="link-branches" to="/transactions/mvclients"> Mouvement Clients </Link> </li>
                    <li> <Link className="link-branches" to="/"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default TransactionsNav;