import React, { useState } from 'react';
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';

function GetTotalCriminals() {
    const [totalCriminal, setTotalCriminals] = useState('');

    const getTotalCriminals = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const contractAddress = '0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9';
            const contractAbi = fir_abi;

            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            const totalCriminal = await contract.GetTotalCriminals();

            setTotalCriminals(totalCriminal);

        } catch (err) {
            console.log(err);
        }
    };

    const handleGetTotalcriminals= (e) =>{
        e.preventDefault();
        getTotalCriminals();
    };
    return (
        <div className='Container my-5'>
            <form>
                <div className='="heading-container'>
                    <h3>Get Total Criminals</h3>
                </div>
                <button type="submit" className='btn btn-secondary btn-light' onClick={handleGetTotalcriminals}>
                    Get Total Criminals
                </button>
                <p>Total Criminals:{totalCriminal.toString()}</p>
            </form>

        </div>
    )
};

export default GetTotalCriminals;
