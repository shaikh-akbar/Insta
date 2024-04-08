import React from 'react'
import Home from './Home'
import TopCreator from './TopCreator'

function HomeAndTopCraetor() {
  return (
    <div>
        <div style={{position:"fixed"}}><Home /></div>
        <div className='topandmain' style={{position:"absolute", right:"20px", width:"80%"}}><TopCreator /></div>
    </div>
  )
}

export default HomeAndTopCraetor