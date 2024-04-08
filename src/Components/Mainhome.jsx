import React from 'react'
import Home from './Home'
import Homefeed from './Homefeed'
import SuggestedPeople from './SuggestedPeople'

function Mainhome() {
  return (
      <>
       <div>
        <div style={{position:'fixed',}}> <Home /></div>
        
        <div className='main-home' style={{position:"absolute",right:'20px',display:'flex',width:"85%",justifyContent:"space-evenly"}}>
        <Homefeed />
        <SuggestedPeople />
        </div>
       
       </div>
      </>
  )
}

export default Mainhome