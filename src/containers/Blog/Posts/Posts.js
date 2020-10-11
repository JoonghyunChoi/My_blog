import React from 'react';
import {Link, Route} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import axios from '../../../axios-instance';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends React.Component {
    state = {
        posts: [],
        selectedPost: null,
    }

    componentDidMount() {   
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 9);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'edon'
                    }
                })
                this.setState({posts: updatedPosts});
            })
            .catch(error => console.log(error));
    }

    delListener = (delID) => {
        console.log(delID);
    }

    render() {
        let posts = this.state.posts.map(post => 
            <Link to={'/posts/' + post.id} key={post.id}>
                <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                />
            </Link>
        )
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                
            </div>
        )
    }
}

export default Posts