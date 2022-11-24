import { Link } from "react-router-dom";

const CategorieNav = () => {
    return ( 
        <div>
            <div className="branches">
                <ul className="backG">
                    <li> <Link className="link-branches" to="/dossiers/categories/fourCategories"> Fournisseurs Categories </Link> </li>
                    <li> <Link className="link-branches" to="/dossiers/categories/cltCategories"> Clients Categories</Link> </li>
                    <li> <Link className="link-branches" to="/dossiers"> Retour </Link> </li>
                </ul>
            </div>
        </div>
     );
}
export default CategorieNav;
