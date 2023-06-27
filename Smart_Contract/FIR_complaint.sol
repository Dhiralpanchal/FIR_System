// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Updated_FIR_Complaints {

    using Counters for Counters.Counter;
    Counters.Counter public Complaint_id;

    address public Owner;

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "you are not the Owner of this Contract");
        _;
    }

    modifier OnlyOfficer() {
        require(checkOfficer(), "You are not the officer ");
        _;
    }

    //create stracture of criminal data

    struct Criminal {
        uint256 id;
        string name;
        uint256 age;
        string details;
    }

    //create stracture of officers data
    struct Officers {
        uint256 id;
        string name;
        address add;
    }

    //create stracture of complaint data
    struct complaint_data {
        uint256 c_id;
        uint256 criminalId;
        uint256 officerId;
        string title;
        string description;
        string approvedmark;
        string resolutionmark;
        uint256 startTime;
        uint256 endTime;
        bool isexists;
        bool isApproved;
        bool isResolved;
    }

    Criminal[] public criminals;
    Officers[] public officers;

    uint256[] private approved_complaint;
    uint256[] private rejected_complaint;
    uint256[] private resolved_complaint;

    //create mapping of complaint data struct
    mapping(uint256 => complaint_data) public Complaints;

    //mapping from criminal IDs to the number of complaints associated with that ID
    mapping(uint256 => uint256) private complaintCount;

    //mapping from Officer IDs to the number of complaints associated with that ID
    mapping(uint256 => uint256) private complaintwithOfficer;

    //mapping(uint256 => Officers) public officerdetails ;

    event CriminalAdded(
        uint256 id,
        string name
    );
    event OfficerAdded(
        uint256 id, 
        string name,
        address _add
    );
    event complaint_filed(
        uint256 c_id,
        address registerd_complaint,
        string title,
        uint256 timestamp
    );
    event Complaint_approved(
        uint256 c_id,
        address approval_officer_address,
        uint256 timestamp
    );
    event Complaint_Rejected(
        uint256 c_id,
        address rejected_officer_address,
        uint256 timestamp
    );
    event Complaint_Resolved(
        uint256 c_id,
        address resolved_officer_address,
        uint256 timestamp
    );
    event Update_Officers(
        uint256 id,
        string _name, 
        address _add
    );
    event Update_criminal_Details(
        uint256 id,
        string _name, 
        uint256 _age
    );


    function addCriminal(
        string memory name,
        uint256 age,
        string memory details
    ) public OnlyOfficer {
        uint256 id = criminals.length;

        criminals.push(Criminal(id, name, age, details));
        emit CriminalAdded(id, name);
    }
       
    function addOfficer(string memory name, address _add) public onlyOwner {
        uint256 id = officers.length;

        officers.push(Officers(id, name, _add));
        emit OfficerAdded(id, name, _add);
    }

    function checkOfficer() internal view returns (bool) {
        bool flag = false;

        for (uint256 i = 0; i < officers.length; i++) {
            if (msg.sender == officers[i].add) {
                flag = true;
            }
        }
        return flag;
    }

    function File_Complaint(
        uint256 criminalId,
        uint256 officerId,
        string memory _title,
        string memory _description
    ) public  {
        Complaint_id.increment();
        uint256 complaint_Id = Complaint_id.current();

        complaint_data storage complaint = Complaints[complaint_Id];

        complaint.c_id = complaint_Id;
        complaint.criminalId = criminalId;
        complaint.officerId = officerId;
        complaint.title = _title;
        complaint.description = _description;
        complaint.approvedmark = "Approval Pending";
        complaint.resolutionmark = "Resolution Pending";
        complaint.startTime = block.timestamp;
        complaint.endTime = 0;
        complaint.isexists = true;
        complaint.isApproved = false;
        complaint.isResolved = false;

        complaintCount[criminalId]++;
        complaintwithOfficer[officerId]++;

        emit complaint_filed(complaint_Id, msg.sender, _title, block.timestamp);

    }

    function Approved_Complaint(uint256 _cid, string memory _approvedmark)
        public
        OnlyOfficer
    {
        require(
            Complaints[_cid].isexists == true,
            "Complaint Id does not Exists"
        );
        require(
            Complaints[_cid].isApproved == false,
            "Complaint Is Already Approved"
        );
        Complaints[_cid].isApproved = true;
        Complaints[_cid].approvedmark = _approvedmark;
        
        approved_complaint.push(_cid);

        emit Complaint_approved(_cid, msg.sender, block.timestamp);

    }

    function Reject_Complaint(uint256 _cid, string memory _approvedmark)
        public
        OnlyOfficer
    {
        require(
            Complaints[_cid].isexists == true,
            "Complaint Id does not Exists"
        );
        require(
            Complaints[_cid].isApproved == false,
            "Complaint Is Already Approved"
        );
        Complaints[_cid].isexists = false;
        Complaints[_cid].approvedmark = _approvedmark;
        Complaints[_cid].resolutionmark = "Fake complaits";
        Complaints[_cid].endTime = block.timestamp;

        rejected_complaint.push(_cid);
        emit Complaint_Rejected(_cid, msg.sender, block.timestamp);

    }

    function Resolved_Complaint(uint256 _cid, string memory _resolutionmark)
        public
        OnlyOfficer
    {
        require(
            Complaints[_cid].isexists == true,
            "Complaint Id does not Exists"
        );
        require(
            Complaints[_cid].isApproved == true,
            "Complaint is not approved"
        );
        require(
            Complaints[_cid].isResolved == false,
            "Complaint Is already Resolved"
        );
        Complaints[_cid].isResolved = true;
        Complaints[_cid].resolutionmark = _resolutionmark;
        Complaints[_cid].endTime = block.timestamp;

        resolved_complaint.push(_cid);
        emit Complaint_Resolved(_cid, msg.sender, block.timestamp);

    }

    function Update_Officer(
        uint256 id,
        string memory _name,
        address _add
    ) public OnlyOfficer {

        officers[id].name = _name;
        officers[id].add = _add;

        emit Update_Officers(id, _name, _add);
    }

    function Update_Criminal_Details(
        uint256 id,
        string memory _name,
        uint256 _age,
        string memory _details
    ) public OnlyOfficer {

        criminals[id].name = _name;
        criminals[id].age = _age;
        criminals[id].details = _details;

        emit Update_criminal_Details(id, _name, _age);
    }

    // function for counting the total number of complaints associated with a particular criminal ID
    function Total_Crime_WithCriminalid(uint256 _criminalID)
        public
        view
        returns (uint256)
    {
        return complaintCount[_criminalID];
    }

    // function for counting the total number of complaints associated with a particular Officers ID
    function Total_Complaint_WithOfficerid(uint256 _officerId)
        public
        view
        returns (uint256)
    {
        return complaintwithOfficer[_officerId];
    }


    function GetTotalCriminals() public view returns (uint256) {
        return criminals.length;
    }

    function GetTotalOfficers() public view returns (uint256) {
        return officers.length;
    }

    function GetTotalApprovedComplaint() public view returns (uint256) {
        return approved_complaint.length;
    }

    function GetTotalComplaint() public view returns (uint256) {
        return Complaint_id.current();
    }

    function GetTotalRejectedComplaint() public view returns (uint256) {
        return rejected_complaint.length;
    }
    
     function GetTotalResolvedComplaint() public view returns (uint256) {
        return resolved_complaint.length;
    }

}
