

import axios from 'axios';
import { useEffect,useState } from 'react';
import _ from "lodash"
import './titleplayer.css';
import {useRef} from 'react';


const pageSize =170;
const Titledplayer = () => 
{
  
    
    const [players, setPlayers]= useState([]);
    const [paginatedLists,setpaginatedLists] = useState();
    const [currentPage, setcurrentPage] = useState(1)
    const inputRef = useRef(null);
    function handleClick() {
      const input1 = inputRef.current.value;
      console.log(input1);
  
    axios.get(`https://api.chess.com/pub/titled/${input1}`)
      .then(response => {
        console.log(response.data);
        setPlayers(response.data.players);
        setpaginatedLists(_(response.data).slice(0).take(pageSize).value());
      
      });
      
    } ;

    const pageCount =players ?Math.ceil(players.length/pageSize) :0;
    if (pageCount ===1) return null;
    const pages = _.range(1, pageCount+1)
    
    const pagination=(pageNo)=>{
      setcurrentPage(pageNo);
      const startIndex =(pageNo -1) * pageSize;
      const paginatedList = _(players).slice(startIndex).take(pageSize).value();
      setpaginatedLists(paginatedList)

    }
  
  return (
   <div className='tileplayer'>
    
    
      <button onClick={handleClick}><h3>Titled Players</h3></button>
          <div className='tt'>
          <input
            ref={inputRef}
            type="text"
            id="message"
            name="message"
          />
          </div>
          
      {!paginatedLists ? (
        "No Data Found"
      ):(
        <table className="table">
          <thead>
          <tr>    
              
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedLists.map((usr, index)=>(
                <tr key={index}>
                   
                            <td>{usr.name}</td>
                            
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
      <nav className = "border d-flex align-items-center justify-content-center">
        <ul className="pagination">
          {
            pages.map((page)=>(
              <li 
              className ={page === currentPage ? "page-item active" : "page-item"
            }>
              <p className="page-link"
               onClick={()=>pagination(page)}
              >{page}</p>
            </li>
            ))
          }

        </ul>
      </nav>
      
    </div>
  );

};

export default Titledplayer