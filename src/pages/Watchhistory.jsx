import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryVideoApi, getAllVideoHistoryApi } from '../services/allApi'


function Watchhistory() {

  const [allHisVideos , setallHisVideos] = useState([])
  const [deleteStatus, setDeleteStatus] = useState(false)

  const getAllHistoryVideos =async()=>{
    const result = await getAllVideoHistoryApi()
    setallHisVideos(result.data);
    

  }
console.log(allHisVideos);


 


  const handleDelete = async(id)=>{
    const result = await deleteHistoryVideoApi(id)
    console.log(result);
    if(result.status>=200 && result.status<300){
      setDeleteStatus(true)
    }
    
  }



  useEffect(()=>{
    getAllHistoryVideos()
    setDeleteStatus(false)
  },[deleteStatus])

  return (
    <div className='p-4'>
      <div className="d-flex ms-5">
        <h5>Watch History</h5>
        <Link to={'/home'} style={{textDecoration:'none'}}className='ms-auto'><h4><FontAwesomeIcon icon={faHouse} /><span className='d-none d-md-inline'>Back Home</span></h4></Link>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 p-3 table-responsive">
            {allHisVideos ?. length>0 ?<table className='table mt-5'>
              <thead>
                <tr>
                  <th>SL.NO</th>
                  <th>Caption</th>
                  <th>URL</th>
                  <th>Time Stamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allHisVideos?.map((item, index)=>(
                  <tr>
                  <td>{index+1}</td>
                  <td>{item?.Caption}</td>
                  <td>{item?.url}</td>
                  <td>{item?.time}</td>
                  <td><button onClick={()=>handleDelete(item?.id)} className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>
                ))
              }
              </tbody>
            </table>

            :

            <h4 className='text-warning text-center'>No watch History</h4>}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  )
}

export default Watchhistory