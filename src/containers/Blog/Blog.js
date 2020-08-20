import React, { Component, Suspense, lazy } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import NewPost from './NewPost/NewPost' ;
// const NewPost = React.lazy(() => import('./NewPost/NewPost'));

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
                            <NavLink exact activeClassName="my-active " to={{
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
                {/* <Suspense fallback={<h1>Loading...</h1>}>
                        <NewPost /> 
                </Suspense> */}
                <Switch>
                    {/* <Route render={() => <h1>Not Found</h1>}/> */}
                    
                    {this.state.auth ? <Route path='/new-post' exact component={NewPost}/> : null}
                    <Route path='/posts' component={Posts}/> 
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        )
    }
}

export default Blog;


