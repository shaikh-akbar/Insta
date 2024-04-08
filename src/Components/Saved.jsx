import React, { useState } from 'react'
import Home from './Home'
import { json } from 'react-router-dom';
import { Tilt } from 'react-tilt'

function Saved() {

  const array = localStorage.getItem("storedImages");
  const finalArray = JSON.parse(array)
  console.log(typeof (finalArray));
  const set = new Set(finalArray);
  const finalValue = [...set]



  



  const defaultOptions = {
    reverse: false,  // reverse the tilt direction
    max: 35,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }

//  const[newarray, setNewArray] = useState([]);

  function handleDelete(index){
   
    let newArray = finalValue.filter((value, i) => i !== index);
    console.log(newArray);
  }






  return (
    <>
      <div>
        <div style={{ position: "fixed" }}>
          <Home />
        </div>
        <div style={{ position: "absolute", right: "20px", width: "80%" }}>
          <h2 style={{ color: "#fff", fontFamily: "sans-serif" }}>Saved Post </h2>
          <br />
          <div className='saved-image-container'>
            {finalValue.map((item, index) => (
              <Tilt options={defaultOptions}>
             <div>
                <img src={finalValue[index]} alt={index} loading='lazy' />
                <p onClick={()=>  handleDelete(index)}><i class="fa fa-trash-o"></i>&nbsp;Delete</p>
              </div>
              </Tilt>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Saved