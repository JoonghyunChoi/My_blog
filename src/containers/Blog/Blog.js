import React, { Component, Suspense } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
const NewPost = React.lazy(() => import('./NewPost/NewPost')); //Async importing

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <NavLink exact activeClassName="active" to={{
                                pathname: '/posts',
                                hash: '#submit',
                                search: 'quick-services=true' //query string
                            }}>Home </NavLink>
                            <NavLink to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? (
                    <Route 
                        path='/new-post' 
                        exact 
                        render={() => (
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <NewPost /> 
                            </Suspense>
                        )}/> 
                    ) : null}
                    <Route path='/posts' component={Posts}/> 
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        )
    }
}

export default Blog;


