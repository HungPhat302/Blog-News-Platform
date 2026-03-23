import {Link} from "react-router-dom"
import "./Menu.css"
const Menu=()=>{
    return(
        <nav>
            <ul>
               <li>
                <Link to={"/"}>
                    Home
                </Link>
               </li>
               <li>
                    <Link to={"/international"}>
                        International
                    </Link>
               </li>
               <li>
                    <Link to={"/sports"}>
                        Sports
                    </Link>
               </li>
               <li>
                    <Link to={"/opinion"}>
                        Opinion
                    </Link>
               </li>
               <ul className="sub-li">
                    <li>
                    <Link to={"/business"}>
                        Business
                    </Link>
                    </li>
                    <li>
                    <Link to={"/youth"}>
                        Youth
                    </Link>
                    </li>
                    <li>
                    <Link to={"/entertainment"}>
                        Entertainment
                    </Link>
                    </li>
                    <li>
                    <Link to={"/lifestyles"}>
                        Lifestyles
                    </Link>
                    </li>
                    <li>Pages</li>
                </ul>
            </ul>
            <input className="search-section" placeholder="Search for" type="text">
                
            </input>
        </nav>
    )
}

export default Menu