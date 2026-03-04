import {Link} from "react-router-dom"
import "./Menu.css"
const Menu=()=>{
    return(
        <nav>
            <ul>
               <li>Home</li>
               <li>International</li>
               <li>Sports</li> 
               <li>Opinion</li>
               <ul className="sub-li">
                    <li>Business</li>
                    <li>Youth</li>
                    <li>Entertainment</li>
                    <li>Lifestyle</li>
                    <li>Pages</li>
                </ul>
            </ul>
            <div className="search-section">
                
            </div>
        </nav>
        
    )
}

export default Menu