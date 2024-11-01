import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/Context';
import footer_logo from '../Assests/footer_img.jpg';
import reminder from '../Assests/reminder.png';
import './Navbar.css';

const Navbar = () => {
    const { getTotalReminderItems, user, getUserFirstLetter, logout } = useContext(ShopContext);
    const [menu, setMenu] = useState("home");

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={footer_logo} alt="Logo" style={{ height: '80px', width: '80px' }} />
                <p>AUCTION</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>
                    <Link style={{ textDecoration: "none", color: "white" }} to='/Home'>Home</Link>
                    {menu === 'home' && <hr />}
                </li>
                <li onClick={() => setMenu("buy")} className={menu === 'buy' ? 'active' : ''}>
                    <Link style={{ textDecoration: "none", color: "white" }} to='/Buy'>Buy</Link>
                    {menu === 'buy' && <hr />}
                </li>
                <li onClick={() => setMenu("sell")} className={menu === 'sell' ? 'active' : ''}>
                    <Link style={{ textDecoration: "none", color: "white" }} to='/Sell'>Sell</Link>
                    {menu === 'sell' && <hr />}
                </li>
                <li onClick={() => setMenu("pricing")} className={menu === 'pricing' ? 'active' : ''}>
                    <Link style={{ textDecoration: "none", color: "white" }} to='/Pricing'>Pricing</Link>
                    {menu === 'pricing' && <hr />}
                </li>
                <li onClick={() => setMenu("about-us")} className={menu === 'about-us' ? 'active' : ''}>
                    <Link style={{ textDecoration: "none", color: "white" }} to='/Aboutus'>About Us</Link>
                    {menu === 'about-us' && <hr />}
                </li>
            </ul>
            <div className='nav-reminder'>
                <Link style={{ textDecoration: "none", color: "white" }} to='/reminder'>
                    <img src={reminder} alt="Reminder Icon" style={{ height: '50px', width: '50px' }} />
                </Link>
                <div className='nav-reminder-count'>{getTotalReminderItems()}</div>
            </div>
            <div className='nav-login'>
                {user ? (
                    <div className='nav-user'>
                        <span className='user-initial'>{getUserFirstLetter()}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button>
                        <Link to='/signup' style={{ textDecoration: "none", color: "white" }}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
