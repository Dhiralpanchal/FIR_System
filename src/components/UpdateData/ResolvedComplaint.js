import React,{useState} from 'react'
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';
function ResolvedComplaint() {
  const[complaintid,SetComplaintId] = useState('')
  const[resolvedmark,SetResolvedmark] = useState('')

  const resolved_complaint = async(_complaintId,_resolutionmark)=>{
    try{
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     
      const signer = provider.getSigner();
    
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

      const contractAbi = fir_abi;
     
      const contract = new ethers.Contract(contractAddress, contractAbi,signer);
      const transaction = await contract.resolveComplaint(_complaintId,_resolutionmark)
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
  const handleResolvedComplaint = (e) => {
    e.preventDefault();
    resolved_complaint(complaintid,resolvedmark);
    
  };

  return (
    <div className="container my-5  " >
    <form >
      <div className="headingcontainer" >
        <h3>Resolved Complaint</h3>
      </div>
      <label>Complaint Id </label>
      <input type="text"
       placeholder="Enter Complaintid"
       value={complaintid}
       onChange={(e)=> SetComplaintId(e.target.value)}/>
      <br></br> 
      <br></br>  
      <label>Resolution Remark </label>
      <input type="text" 
      placeholder="Enter Resolution Remark"
      value={resolvedmark}
      onChange={(e)=>SetResolvedmark(e.target.value)}/>
      <br></br>
      <br></br>
      <button type="submit" className='btn btn-secondary btn-light' onClick={handleResolvedComplaint}>Resolved Complaint</button>  
    </form>
  </div>
  )
}

export default ResolvedComplaint
