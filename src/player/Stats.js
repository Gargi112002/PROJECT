import {useRef} from 'react';
import axios from 'axios';
import _ from "lodash"
import { useState } from 'react';
import './stats.css';

const Stats = () => {
    const [best,setBest]=useState([]);
    const inputRef = useRef(null);
function handleClick() {
    const input1 = inputRef.current.value;
    console.log(input1);
    axios.get(`https://api.chess.com/pub/player/${input1}/stats`)
      .then((response) => {
        console.log(response.data)
        setBest(response.data)
      });
}

return (
    <div className='playerstats'>
      <div className='ss'><u>Statistics</u></div><br /><br />
      <button onClick={handleClick}><h5>Name</h5></button>
      <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      />
     {!best ? (
        "No Data Found"
      ):(
        <table className="table">
          <thead>
          <tr>    
              
              <th>chess_blitz</th>
               <th>chess_bullet</th>
                <th>chess_daily</th>
                 <th>chess_rapid</th>
                  <th>puzzle_rush</th>
                   <th>tactics</th>
            </tr>
          </thead>
          <tbody>
            {
              best.map((usr, index)=>(
                <tr key={index}>
                   
                            <td>{usr.chess_blitzbest.best.rating}</td>
                            <td>{usr.chess_blitzbest.best.rating}</td>
                            <td>{usr.chess_blitzbest.best.rating}</td>
                            <td>{usr.chess_blitzbest.best.rating}</td>
                            <td>{usr.chess_blitzbest.best.rating}</td>
                            <td>{usr.chess_blitzbest.best.rating}</td>

                            
                </tr>
              ))
            }
          </tbody>
        </table>
      )} 
      
    </div>
);
}
export default Stats;

