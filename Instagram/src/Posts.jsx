import React, { useEffect, useState } from 'react'

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='d-flex justify-content-center'>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div className='my-3' key={post.id}>
                            <div className='d-flex'>
                                <img className="dp rounded-circle" src={post.user.profile_pic} alt='profile_pic'></img>
                                <h5>{post.user.username}</h5>
                            </div>
                            <img className='image' src={post.image} alt='post'></img>
                            <div>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i class="bi bi-send"></i>
                            </div>
                            <div>
                                {post.likes} likes

                            </div>
                            <p>{post.caption}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>loading post...</div>
            )}
        </div>
    )
}

export default Posts;
