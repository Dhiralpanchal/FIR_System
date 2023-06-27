import React from 'react'
import ApprovedComplaint from './ApprovedComplaint'
import RejectComplaint from './RejectComplaint'
import ResolvedComplaint from './ResolvedComplaint'
import Updatecriminal from './update_criminal'
import UpdateOfficer from './UpdateOfficer'
function IndexUpdate() {
  return (
    <div>
      <ApprovedComplaint/>
      <RejectComplaint/>
      <ResolvedComplaint/>
      <Updatecriminal/>
      <UpdateOfficer/>
    </div>
  )
}

export default IndexUpdate
