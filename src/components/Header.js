import React, { useState } from 'react'
import { Link } from "react-router-dom";
const ethers = require('ethers');


function Header() {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [buttontext,setButtonText] = useState('Connect Wallet');
    const connectWalletHandler = () => {

        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(account => {
                    accountHandler(account[0]);
                    console.log(account[0]);
                })
                setButtonText('Wallet Connected');
        }
        else {
            setErrorMessage("Install MetaMask");
        }
    }
    const accountHandler = (newAccount) => {
        setDefaultAccount(newAccount);

    }

    return (
        <nav className="navbar fixed-top  navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" >FIR Complaint System</Link>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="/adddata" to="/adddata">Add Data</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/updatedata">Update Data</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/getdata">Get Data</Link>
                                </li>
                            </ul>
                </div> 
                <div className="d-flex navbar-end" >
                        <button className="btn  btn-dark" type="submit" onClick={connectWalletHandler}>{buttontext}</button>
                </div>                 
            </div>
        </nav>
    )
}

export default Header
