import React, { useState } from 'react';
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';



function UpdateOfficer() {

  const [officerAddress, setOfficerAddress] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerNewAddress, setOfficerNewAddress] = useState('');

  
  
  const updateOfficer = async (_addr,_name,_addrnew) => {
    try {

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     
      const signer = provider.getSigner();
    
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

      const contractAbi = fir_abi;
     
      const contract = new ethers.Contract(contractAddress, contractAbi,signer);

      const transaction = await contract.Update_Officer(_addr,_name,_addrnew);
      const txResponse = await transaction.wait();

      console.log('Transaction :', txResponse);
      const signedTransaction = await signer.sendTransaction(transaction);
      
      const sign_txn = await signedTransaction.wait();
      console.log("Signed Transaction:",sign_txn)

     
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOfficerDetails = (e) => {
    e.preventDefault();
    updateOfficer(officerAddress,officerName,officerNewAddress); 
  };

  return (
    <div className="container my-5  " >
      <form >
        <div className="headingcontainer" >
          <h3>Update Officers Details</h3>
        </div>
        <label> Address</label>
        <input type="text"
        placeholder="Enter Officer Address"
        value={officerAddress}
        onChange={(e)=> setOfficerAddress( e.target.value)}/>
        <br></br> 
        <br></br>  
        <label>Name</label>
        <input type="text"
         placeholder="Enter Officer Name"
         value={officerName}
         onChange={(e)=> setOfficerName(e.target.value)}/>
        <br></br> 
        <br></br>  
        <label>New Address </label>
        <input type="text" 
        placeholder="Enter Officer New Address"
        value={officerNewAddress}
        onChange={(e)=>setOfficerNewAddress(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit" className='btn btn-secondary btn-light' onClick={handleUpdateOfficerDetails}>Update Officer</button>  
      </form>
    </div>
  )
}

export default UpdateOfficer
