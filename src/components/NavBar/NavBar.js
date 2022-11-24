import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="navbar">
            <h1 className="logo">
                <Link to='/' className="lg" > WMS </Link>
            </h1>
            <ul className="links">
                <li> <Link to='/dossiers' className="ln"> Dossiers </Link> </li>
                <li> <Link to='/transactions' className="ln"> Transactions </Link> </li>
                <li> <Link to='/reporting' className="ln"> Reporting </Link> </li>
            </ul>
        </div>
     );
}
 
export default NavBar;