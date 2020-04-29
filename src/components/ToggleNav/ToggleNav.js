import React, {Component, useContext} from 'react';
import {NavLink} from "react-router-dom";
import './ToggleNav.css'
import { AppContext } from '../../context/AppContext';

function  ToggleNav() {
    const {auth} = useContext(AppContext);

    return(

        <div className='toggleMenu'>
            {auth?
                <ul className="toggle_nav_tags">
                    <li>
                        <NavLink className="toggle_navTag" exact to="/" activeStyle={{borderBottom:'#618855 solid 2px'}}>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className="toggle_navTag" to="/MyProfilePage" activeStyle={{borderBottom:'#618855 solid 2px'}}>MY PROFILE</NavLink>
                    </li>
                    <li>
                        <NavLink className="toggle_navTag" to="/CollectionPage" activeStyle={{borderBottom:'#618855 solid 2px'}}>MY FAVOURITE</NavLink>
                    </li>
                    <li>
                        <NavLink className="toggle_navTag" to="/UploadPage" activeStyle={{borderBottom:'#618855 solid 2px'}}>UPLOAD</NavLink>
                    </li>
                </ul> : 'Please log in first'}
        </div>
    ) 
}

// class ToggleNav extends Component {
//     render() {
//         return (
//             <AppContext.Consumer>
//                 {({})}
//                 <div className='toggleMenu'>
//                 <ul className="toggle_nav_tags">
//                     <li>
//                         <NavLink className="toggle_navTag" exact to="/" activeStyle={{borderBottom:'#618855 solid 2px'}}>HOME</NavLink>
//                     </li>
//                     <li>
//                         <NavLink className="toggle_navTag" to="/MyVidsPage" activeStyle={{borderBottom:'#618855 solid 2px'}}>MY STOCK</NavLink>
//                     </li>
//                     <li>
//                         <NavLink className="toggle_navTag" to="/CollectionPage" activeStyle={{borderBottom:'#618855 solid 2px'}}>MY FAVOURITE</NavLink>
//                     </li>
//                     <li>
//                         <NavLink className="toggle_navTag" to="/UploadPage" activeStyle={{borderBottom:'#618855 solid 2px'}}>UPLOAD</NavLink>
//                     </li>
//                 </ul>
//             </div>
            
//             </AppContext.Consumer>
//         );
//     }
// }



export default ToggleNav;