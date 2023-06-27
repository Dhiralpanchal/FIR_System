import React, { useState } from 'react'
import { ethers } from 'ethers';

import fir_abi from '../../abifile/abi.json';
const abi = fir_abi;

  function AddComplaint() {
    const [criminalid, setCriminalid] = useState('');
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
  
    const add_officer = async (_criminalId,_title,_description) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
       
        const signer = provider.getSigner();
      
        const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

        console.log("contract address:",contractAddress);
        const contractAbi = abi;
        
        const contract = new ethers.Contract(contractAddress, contractAbi,signer);
  
        const transaction = await contract.addComplaint(_criminalId,_title,_description);
        const txResponse = await transaction.wait();

        console.log('Transaction hash:', txResponse.transactionHash);
        const signedTransaction = await signer.sendTransaction(transaction);
        
        await signedTransaction.wait();
        console.log("Signed Transaction:",signedTransaction)

        window.alert('Complaint added successfully!');
      } catch (err) {
        console.error(err);
      }
    };

    const handleAddComplaint = (e) => {
      e.preventDefault();
      add_officer(criminalid,title,description);
    };

  return (
    <div className="container my-5 pt-3 " >
      <form >
        <div className="headingcontainer" >
          <h3>Add Complaint</h3>
        </div>
        <label>Criminal Id </label>
        <input type="number"
         placeholder="Enter Criminal Id"
         value={criminalid}
         onChange={(e) => setCriminalid(e.target.value)}/>
        <br></br> 
        <br></br>  
        <label>Complaint Title </label>
        <input type="text"
         placeholder="Enter Complaint Title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}/>
        <br></br> 
        <br></br>
        <label>Desccription </label>
        <input type="text"
         placeholder="Enter Complaint Description"
         value={description}
         onChange={(e) => setDescription(e.target.value)}/>
        <br></br>
        <br></br>
        <button type="submit" className='btn btn-secondary btn-light' onClick={handleAddComplaint}>Add Complaint</button>  
      </form>
    </div>
  )
}

export default AddComplaint;