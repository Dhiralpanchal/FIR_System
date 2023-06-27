import React, { useState } from 'react'
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';
const abi = fir_abi;

function GetOfficerdata() {


  const [officerAddress, setOfficerAddress] = useState('');
  const [officerDetails, setOfficerDetails] = useState(null);

  const getOfficerdetail = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";

      console.log("contract address:", contractAddress);
      const contractAbi = abi;
      console.log("contract abi:", contractAbi);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);

      const get_officer = await contract.officers(officerAddress);
      setOfficerDetails(get_officer);

    }
    catch (err) {
      console.log(err);
    }
  };

  const handleGetOfficer = (e) => {
    e.preventDefault();
    getOfficerdetail();
  }

  return (
    <>
      <div  className='Container my-5' >
        <form>
          <div>
            <h3>Get Officer Details</h3>
          </div>
          <label>Officer Address</label>
          <input
            type="text"
            placeholder="Enter officer Address"
            value={officerAddress}
            onChange={(e) => setOfficerAddress(e.target.value)}
          />
          <br></br>
          <br></br>
          <button type="submit" className='btn btn-secondary btn-light' onClick={handleGetOfficer}>
            Get Officer Details
          </button>
        </form>
        {
          officerDetails && (
            <div className="officer-details">
              <p>Officer ID:{officerDetails.id.toString()}</p>
              <p>Officer Name:{officerDetails.name}</p>
              <p>Officer Address:{officerDetails.addr}</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default GetOfficerdata;

