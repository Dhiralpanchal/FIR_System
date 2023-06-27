import React from 'react'
import GetOfficerdata from './GetOfficer'
import GetComplaint from './GetComplaint'
import GetTotalCriminals from './GetTotalCriminals'
import GetCriminaldata from './GetCriminal'

function IndexGetData() {
  return (
    <div>
      <GetOfficerdata/>
      <GetCriminaldata/>
      <GetComplaint/>
      <GetTotalCriminals/>
    </div>
  )
}

export default IndexGetData
