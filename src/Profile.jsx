import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Profile() {
    const[profile,setProfile]=useState(null);
    const[followers,setFollwers]=useState([]);
    const [unfllowed,setUnfollowed]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/profile')
        .then(data=>setProfile(data.data))
        .catch(err=>console.log(err))

         axios.get('http://localhost:3000/followers')
        .then(data=>setFollwers(data.data))
        .catch(err=>console.log(err))

    },[unfllowed])
    function HandleOnChange(e){
        setProfile(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))  
    }
    const handleupdate=async()=>{
        axios.put('http://localhost:3000/profile',profile)
        .then(console.log("updated"))
        .catch(err=>console.log(err))
    }
    const handleUnfollow=async(id)=>{
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("unfollow"))
        .then(setUnfollowed(!unfllowed))
        .catch(err=>console.log(err))
    }
  return (
    <div className='m-5'>
        {profile?(
            <div>
                <img src={profile.profile_pic} className='profile rounded-circle'></img>
                <h5>{profile.username}</h5>
                <input type='text'
                value={profile.username} 
                name="username"
                className='form-control my-4'
                onChange={HandleOnChange}
                />
                <input type='text'
                name='profile_pic'
                value={profile.profile_pic}
                className='form-control'
                onChange={HandleOnChange}
                />
                <button className='btn btn-primary my-4' onClick={handleupdate}>
                    update
                </button>
                
                
            </div>
        ):(<div>Loading pro...</div>)}
        {followers.length>0 ? (
            followers.map(follower=>(
                <div key={follower.id} className='d-flex my-2'>
                    {follower.username}
                    <button className='btn-btn-secondary ms-auto' onClick={()=>{handleUnfollow(follower.id)}}>unFollow</button>
                </div>
            ))
        ):(
            <div>  loading</div>
        ) }
    </div>
  )
}

export default Profile