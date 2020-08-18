import React from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios-instance';
import './Posts.css';

class Posts extends React.Component {
    state = {
        posts: [],
        selectedPost: null,
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
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

    postSelectHandler = (postID) => {

    }

    render() {
        console.log(this.props);
        let posts = this.state.posts.map(post => 
            <Post 
                clicked={() => this.postSelectHandler(post.id)} 
                key={post.id} 
                title={post.title} 
                author={post.author}
            />
        )
        console.log(posts)
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;
