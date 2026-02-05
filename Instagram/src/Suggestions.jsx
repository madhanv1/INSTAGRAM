import axios from "axios";
import React, { useEffect, useState } from "react";
function Suggestions() {
    const [profile, setProfile] = useState(null)
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/profile').
            then(data => data.json()).
            then(data => setProfile(data))
            .catch(err => console.log(err))

        fetch('http://localhost:3000/suggestions').
            then(data => data.json()).
            then(data => setSuggestions(data))
            .catch(err => console.log(err))
    }, [])
    const handlefollow = async(id,username)=>{
        axios.post('http://localhost:3000/followers',{"id":id,"username":username})
        .then(alert("followed"))
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <div className="suggestions m-4">
                {profile ?
                    <div className='d-flex'>
                        <img className="dp rounded-circle" src={profile.profile_pic} alt='profile_pic'></img>
                        <h5>{profile.username}</h5>
                        <small><p className="ms-auto text-primary">Switch</p></small>
                    </div>
                    : <p>loading..</p>}
                <div className="d-flex">
                    <p>suggested for you</p>
                    <b className="ms-auto"> see All</b>
                </div>
                {suggestions.length > 0 ? (
                    <div>
                        {suggestions.map((suggestion) => (
                            <div className='my-2' key={suggestion.id}>
                                <div className='d-flex'>
                                    <img className="dp rounded-circle" src={suggestion.profile_pic} alt='profile_pic'></img>
                                    <h5>{suggestion.username}</h5>
                                    <a className="text-primary ms-auto" onClick={()=>handlefollow(suggestion.id,suggestion.username)}> Follow</a>
                                </div>
                                
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>loading </div>
                )}
            </div>
        </div>
    )

}
export default Suggestions