import React ,{ useState } from 'react';
import { ethers } from 'ethers';

import fir_abi from '../../abifile/abi.json';


function Updatecriminal() {
  const [criminal_id,setCriminal_id]=useState('');
  const [criminal_name, setCriminal_name] = useState('');
  const [criiminal_age, setCriminal_age] = useState('');
  const [criminal_details,setCriminal_details]= useState('')
  
  const update_criminal = async (id,_name,_age,_details) => {
    try {

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     
      const signer = provider.getSigner();
    
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

      console.log("contract address:",contractAddress);
      const contractAbi = fir_abi;
     
      const contract = new ethers.Contract(contractAddress, contractAbi,signer);

      const transaction = await contract.Update_Criminal_Details(id,_name,_age,_details);
      const txResponse = await transaction.wait();

      console.log('Transaction :', txResponse);
      const signedTransaction = await signer.sendTransaction(transaction);
      
      const sign_txn = await signedTransaction.wait();
      console.log("Signed Transaction:",sign_txn)

     
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCriminalDetails = (e) => {
    e.preventDefault();
    update_criminal(criminal_id,criminal_name,criiminal_age,criminal_details); 
  };


  return (
    <div className="container my-5 pt-3 " >
          <form >
            <div className="headingcontainer" >
              <h3>Update Criminal Details</h3>
            </div>
            <label>Id</label>
            <input type="Number"
             placeholder="Enter Criminal Id"
             value={criminal_id}
             onChange={(e)=> setCriminal_id(e.target.value)}
             />
            <br></br> 
            <br></br>  
            <label>Name </label>
            <input type="text"
             placeholder="Enter Criminal Name"
             value={criminal_name}
             onChange={(e)=>setCriminal_name(e.target.value)}/>
            <br></br>
            <br></br>
            <label>Age </label>
            <input type="number" 
            placeholder="Enter Criminal Age"
            value={criiminal_age}
            onChange={(e)=>setCriminal_age(e.target.value)}/>
            <br></br>
            <br></br>
            <label>Details </label>
            <input type="text"
             placeholder="Enter Criminal Details"
             value={criminal_details}
             onChange={(e)=>setCriminal_details(e.target.value)}/>
            <br></br>
            <br></br>
            <button type="submit" className='btn btn-secondary btn-light' onClick={handleUpdateCriminalDetails}>Update Criminal</button>  
          </form>
        </div>
  )
}

export default Updatecriminal
