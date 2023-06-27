import React, { useState } from 'react'
import { ethers } from 'ethers';

import fir_abi from '../../abifile/abi.json';


  function AddOfficer() {
    const [officer_name, setName] = useState('');
    const [address, setAddress] = useState('');
  
    const add_officer = async (_name, _address) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
       
        const signer = provider.getSigner();
      
        const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

        console.log("contract address:",contractAddress);
        const contractAbi = fir_abi;
        
        const contract = new ethers.Contract(contractAddress, contractAbi,signer);
  
        const transaction = await contract.addOfficer(_name, _address);
        const txResponse = await transaction.wait();

        console.log('Transaction details:', txResponse);
        const signedTransaction = await signer.sendTransaction(transaction);
        
        const sign_txn = await signedTransaction.wait();
        console.log("Signed Transaction:",sign_txn)

        window.alert('Officer added successfully!');
      } catch (err) {
        console.error(err);
      }
    };

    const handleAddofficer = (e) => {
      e.preventDefault();
      add_officer(officer_name, address);
    };

  return (
    <div className="container my-5 pt-3 " >
      <form >
        <div className="headingcontainer" >
          <h3>Add Officers</h3>
        </div>
        <label>Name </label>
        <input type="text"
         placeholder="Enter OfficerName"
         value={officer_name}
         onChange={(e) => setName(e.target.value)}/>
        <br></br> 
        <br></br>  
        <label>set Address </label>
        <input type="text"
         placeholder="Enter Officer Address"
         value={address}
         onChange={(e) => setAddress(e.target.value)}/>
        <br></br>
        <br></br>
        <button type="submit" className='btn btn-secondary btn-light' onClick={handleAddofficer}>Add Officer</button>  
      </form>
    </div>
  )
}

export default AddOfficer;
