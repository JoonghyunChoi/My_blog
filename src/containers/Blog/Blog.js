import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import { Route, Link } from 'react-router-dom';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <Link to={{
                                pathname: '/',
                                hash: '#submit',
                                search: 'quick-services=true' //query string
                            }}>Home</Link>
                            <Link to={{
                                pathname: '/new-post'
                            }}>New Post</Link>
                        </ul>
                    </nav>
                </header>
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' exact component={NewPost}/>
            </div>
        )
    }
}

export default Blog;

