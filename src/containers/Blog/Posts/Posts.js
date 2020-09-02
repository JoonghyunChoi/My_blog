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
                const posts = response.data.slice(0, 3);
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
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts