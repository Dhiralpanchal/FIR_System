import React, { useState } from 'react';
import { ethers } from 'ethers';
import fir_abi from '../../abifile/abi.json';


function GetComplaint() {
  const [complaintid, setComplaintid] = useState('');
  const [complaintDetails, setComplaintDetails] = useState(null);

  const getComplaintDetail = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = "0xD9CC8Fb0a62eF815B9718dF0AA19355007e581D9";
      const contractAbi = fir_abi;
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);

      const get_complaint = await contract.Complaints(complaintid);
      setComplaintDetails(get_complaint);

    } catch (err) {
      console.log(err);
    }
  };

  const handleGetComplaint = (e) => {
    e.preventDefault();
    getComplaintDetail();
  };

  return (
    <>
      <div  className='Container my-5 '>
        <form>
          <div className='heading-container'>
            <h3>Get Complaint Details</h3>
          </div>
          <label>Complaint Id</label>
          <input
            type="text"
            placeholder="Enter Complaint Id"
            value={complaintid}
            onChange={(e) => setComplaintid(e.target.value)}
          />
          <br></br>
          <br></br>
          <button type="submit" className='btn btn-secondary btn-light' onClick={handleGetComplaint}>
            Get Complaint Details
          </button>
        </form>
        {complaintDetails && (
          <div className="complaint-details">
            <p>Complaint ID: {complaintDetails.id.toString()}</p>
            <p>Criminal ID: {complaintDetails.criminalId.toString()}</p>
            <p>Officer ID: {complaintDetails.officer_id.toString()}</p>
            <p>Title: {complaintDetails.title}</p>
            <p>Description: {complaintDetails.description}</p>
            <p>ApprovedMark: {complaintDetails.approvedmark}</p>
            <p>ResolutionMark: {complaintDetails.resolutionmark}</p>
            <p>Approved: {complaintDetails.approved ? 'Yes' : 'No'}</p>
            <p>Resolved: {complaintDetails.resolved ? 'Yes' : 'No'}</p>
            <p>Exists: {complaintDetails.isexists ? 'Yes' : 'No'}</p>
            <p>Start Time: {complaintDetails.startTime.toString()}</p>
            <p>End Time: {complaintDetails.endTime.toString()}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default GetComplaint;