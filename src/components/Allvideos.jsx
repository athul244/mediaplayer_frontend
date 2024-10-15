import React, { useEffect, useState } from 'react'
import Videocard from './Videocard'
import { addVideoToCategoryApi, getVideosApi } from '../services/allApi'
import { toast } from 'react-toastify'


function Allvideos({addVideoStatus,setVideoStatus}) {

  const [allvideos , setAllVideos] = useState([])

  const [deleteVideoStatus , setDeleteVideoStatus] = useState({})
  const [videoStatus,setVideoStatu]=useState({})


  const getAllVideo = async()=>{
    const result = await getVideosApi()
    // console.log(result);
    setAllVideos(result.data)
    
  }
  console.log(allvideos);

  const ondrop = (e)=>{
    e.preventDefault()
  }

  const VideoDrop = async (e)=>{
    const {category,video} =JSON.parse(e.dataTransfer.getData("datashare"))
    console.log(category,video);

      const newArray = category.allvideos.filter((item)=>item.id!=video.id)
      const newCategory = {
        category:category.category,
        allvideos:newArray,
        id:category.id
      }
    const result = await addVideoToCategoryApi(category.id,newCategory)
    console.log(result);
    if(result.status>=200 && result.status<300){
      
      setVideoStatus(result.data)

    }
   
    
  }
  
//handle sideffects
  useEffect(()=>{
    getAllVideo()
  },[addVideoStatus, deleteVideoStatus])//useeffect is called whenthe component render the browser

  return (
    <>
    <div droppable onDragOver={(e)=>ondrop(e)} onDrop={(e)=>VideoDrop(e)}>
      <h4>All Videos</h4>
  
      {/* added video */}
      { allvideos.length>0?
        
        <div className='container'>
        <div className='row'>

          {allvideos.map((item)=>(
            <div className="col-md-3 p-2">
            <Videocard video={item} setDeleteVideoStatus={setDeleteVideoStatus}/>
          </div>

          ))
            
          }
          
        </div>
      </div>
  
      :
  
      <div className="container">
        <div className='row'>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" alt="" className='w-100' />
  
            <h5 className=' text-warning text-center'>No videos added yet</h5>
          </div>
          <div className="col-md-4"></div>
  
        </div>
      </div>
      }
    </div>
    </>
  )
}

export default Allvideos