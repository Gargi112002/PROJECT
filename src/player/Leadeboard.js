import axios from 'axios';
import { useEffect,useState } from 'react';
import _ from "lodash"
import './leaderboard.css';

const pageSize =10;
const Leaderboard = () => 
{
  // const name =''
  // const location=''
    const [filterState,setFilterState]=useState("Daily");
    const [userList, setUserList]= useState();
    const [paginatedLists,setpaginatedLists] = useState();
    const [currentPage, setcurrentPage] = useState(1)
    useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => {
        console.log(response.data);
        setUserList(response.data);
        setpaginatedLists(_(response.data).slice(0).take(pageSize).value());
      
      });
      
    }, []);

    const pageCount =userList ?Math.ceil(userList.length/pageSize) :0;
    if (pageCount ===1) return null;
    const pages = _.range(1, pageCount+1)
    
    const pagination=(pageNo)=>{
      setcurrentPage(pageNo);
      const startIndex =(pageNo -1) * pageSize;
      const paginatedList = _(userList).slice(startIndex).take(pageSize).value();
      setpaginatedLists(paginatedList)

    }
  
  return (
   <div>
    
      <h3>Leaderboards</h3>
      {!paginatedLists ? (
        "No Data Found"
      ):(
        <table className="table">
          <thead>
          <tr>    
              <th>Player Id </th>
              <th>Name</th>
              <th>User Name</th>
              <th>Score</th>
              <th>Rank</th>
              <th>Country</th>
              <th>Status</th>
              <th>Avatar</th>
              <th>Title</th>
              <th>trend_score</th>
              <th>trend_rank</th>
              <th>flair_code</th>
              <th>URL</th>
              <th>Win Count</th>
              <th>Loss Count</th>
              <th>Draw Count</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedLists.map((usr, index)=>(
                <tr key={index}>
                   <td>{usr.id}</td>
                            <td>{usr.id}</td>
                            <td>{usr.name}</td>
                            <td>{usr.title}</td>
                            <td>{usr.rank}</td>
                            <td>{usr.city}</td>
                            <td>{usr.status}</td>
                            <td>{usr.username}</td>
                            <td>{usr.trend_score}</td>
                            <td>{usr.trend_rank}</td>
                            <td>{usr.flair_code}</td>
                            <td>{usr.url}</td>
                            <td>{usr.avatar}</td>
                            <td>{usr.win_count}</td>
                            <td>{usr.loss_count}</td>
                            <td>{usr.draw_count}</td>
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
      <div className='dropdown'>
      <select 
      className='btn'
        value={filterState} onChange={(e)=>{
        const selectedFilter = e.target.value;
        setFilterState(selectedFilter);
        }}
        >
        <option value="daily">Daily</option>
        <option value="livegames">LiveGames</option>
        <option value="tactics">Tactics</option>
        <option value="lessons">Lessons</option>

      </select>
      {filterState}
    </div>
    </div>
  );

}

export default Leaderboard
