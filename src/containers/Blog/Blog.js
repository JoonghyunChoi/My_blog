import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch } from 'react-router-dom';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <NavLink exact activeClassName="my-active " to={{
                                pathname: '/',
                                hash: '#submit',
                                search: 'quick-services=true' //query string
                            }}>Home</NavLink>
                            <NavLink to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/new-post' exact component={NewPost}/>
                    <Route path='/' component={Posts}/> 
                </Switch>
            </div>
        )
    }
}

export default Blog;

