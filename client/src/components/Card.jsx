import React from 'react'

const Card = (props) => {
  return (
    <div>
     <img className="transition duration-500 ease-in-out hover:bg-slate-400"src={props.image}/> 
     <h1>{props.name}</h1> 
     <h1>{props.description}</h1> 
    </div>
  )
}

export default Card