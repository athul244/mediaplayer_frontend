
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { AddVideoApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add({setAddVideoStatus}) {

  const [videoDetails, setVideoDetails] = useState({
    caption:"",
    imageUrl:"",
    embedLink:""
  })

  const [show, setShow] = useState(false);
  console.log(videoDetails);
  
  const handleClose = () => {setShow(false)
    handleCancel()
  };
  const handleShow = () => setShow(true);

  const handleCancel = ()=>{
    setVideoDetails({
      caption:"",
      imageUrl:"",
      embedLink:""
    })
  }

  const handleAdd = async()=>{
    const {caption , imageUrl , embedLink} = videoDetails
  
    if(!caption || !imageUrl || !embedLink){
      toast.info("Please fill the form completely")
    }
    else{
      if(videoDetails.embedLink.startsWith('https://youtu.be/')){
        const embedL=`https://www.youtube.com/embed/${videoDetails.embedLink.slice(17,28)}`  
        // setvideoDetails({...videoDetails, embedLink:embedL})
        
        const result = await AddVideoApi({...videoDetails, embedLink:embedL})
        console.log(result);  
        if(result.status>=200 && result.status<300){
          toast.success('Video uploaded successfully')
          handleClose()
          setAddVideoStatus(result.data)
        }
        else{
          toast.error("Something Went wrong")
          handleClose()
        }
        
      }
        else{
          const embedL=`https://www.youtube.com/embed/${videoDetails.embedLink.slice(-11)}`  
          // setvideoDetails({...videoDetails, embedLink:embedL})
          
          const result = await AddVideoApi({...videoDetails, embedLink:embedL})
          console.log(result);
          if(result.status>=200 && result.status<300){
            toast.success('Video uploaded successfully')
            handleClose()
            setAddVideoStatus(result.data)
          }
          else{
            toast.error("Something Went wrong")
            handleClose()
          }
          
        }
        
    }
      
      
    }

  return (
    <>
    <div className='d-flex'>
      <h5 className='d-none d-md-inline'>Upload New Video</h5>
      <button className='btn pb-3' onClick={handleShow}><FontAwesomeIcon icon={faCloudArrowUp} className='fs-5' /></button>

    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-warning'><FontAwesomeIcon icon={faFilm} />Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Please fill the following details</h6>
          <form className='p-3 border border-light rounded'>
            <div className="mb-3">
              <input type="text" value={videoDetails.caption} placeholder='Video Caption' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails, caption:e.target.value})}/>

            </div>
            <div className="mb-3">
            <input type="text" value={videoDetails.imageUrl} placeholder='Video Image' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails, imageUrl:e.target.value})}/>

            </div>
            <div className="mb-3">
            <input type="text" value={videoDetails.embedLink} placeholder='Video Url' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails, embedLink:e.target.value})}/>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' autoClose={2000} theme="colored"  />


    </>
  )
}

export default Add