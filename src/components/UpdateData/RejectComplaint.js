import React, { useState } from 'react';
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';
function RejectComplaint() {
   
  const[complaintid,SetComplaintId] = useState('')
  const[approvedmark,SetApprovedmark] = useState('')

  const Reject_complaint = async (_complaintId,_approvedmark) =>{
    try{

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     
      const signer = provider.getSigner();
    
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

      const contractAbi = fir_abi;
     
      const contract = new ethers.Contract(contractAddress, contractAbi,signer);

      const transaction = await contract.rejectComplaint(_complaintId,_approvedmark);
      const txResponse = await transaction.wait();

      console.log('Transaction :', txResponse);
      const signedTransaction = await signer.sendTransaction(transaction);
      
      const sign_txn = await signedTransaction.wait();
      console.log("Signed Transaction:",sign_txn)

    }
    catch(err){
      console.log(err);
    }
  };
   
  const handleRejectComplaint = (e) => {
    e.preventDefault();
    Reject_complaint(complaintid,approvedmark);
    
  };
  
  return (
    <div className="container my-5  " >
    <form >
      <div className="headingcontainer" >
        <h3>Reject Complaint</h3>
      </div>
      <label>Complaint Id </label>
      <input type="text" 
      placeholder="Enter Complaintid"
      value={complaintid}
      onChange={(e)=> SetComplaintId(e.target.value)}
      />
      <br></br> 
      <br></br>  
      <label>Rejected Remark </label>
      <input type="text"
       placeholder="Enter Rejected Remark"
       value={approvedmark}
       onChange={(e)=> SetApprovedmark(e.target.value)}/>
      <br></br>
      <br></br>
      <button type="submit" className='btn btn-secondary btn-light' onClick={handleRejectComplaint}>Reject Complaint</button>  
    </form>
  </div>
  )
}

export default RejectComplaint
