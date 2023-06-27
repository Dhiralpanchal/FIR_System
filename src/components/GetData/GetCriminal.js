import React, { useState } from 'react'
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';

function GetCriminaldata(){

    const [criminalid, setCriminalId] = useState('');
    const [criminalDetails, setCriminalDetails] = useState('');

    const getCriminaldetail = async () => {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";
    
          console.log("contract address:", contractAddress);
          const contractAbi = fir_abi;
          console.log("contract abi:", contractAbi);
          const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    
          const get_criminal = await contract.criminals(criminalid);
          setCriminalDetails(get_criminal);
    
        }
        catch (err) {
          console.log(err);
        }
      };
    const handleGetcriminal = (e) => {
        e.preventDefault();
        getCriminaldetail();
    }

    return(
    <>
      <div>
        <form>
          <div className='heading-container'>
            <h3>Get Criminal Details</h3>
          </div>
          <label>Criminal Id</label>
          <input
            type="number"
            placeholder="Enter Criminal Id"
            value={criminalid}
            onChange={(e) => setCriminalId(e.target.value)}
          />
          <br></br>
          <br></br>
          <button type="submit" className='btn btn-secondary btn-light' onClick={handleGetcriminal}>
            Get Criminal Details
          </button>
        </form>
        {
            criminalDetails&&(
                <div className='crimina_details'>
                    <p>Criminal ID:{criminalDetails.id.toString()}</p>
                    <p>Criminal Name:{criminalDetails.name}</p>
                    <p>Criminal Age:{criminalDetails.age.toString()}</p>
                    <p>Criminal Details:{criminalDetails.details}</p>
                    <p>Criminal Exists:{criminalDetails.isExists?'yes':'No'}</p>
                </div>
            )

        }
        </div>
    </>
    )
}
export default GetCriminaldata;