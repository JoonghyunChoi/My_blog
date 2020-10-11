import React, { Component, Suspense } from 'react';
import './Blog.css';
import NewPost from './NewPost/NewPost'
import Posts from './Posts/Posts';
import QA from './QA/QA';
import Message from './Message/Message';
import { Route, Switch, Redirect } from 'react-router-dom';
import FullPost from '../../containers/Blog/FullPost/FullPost';

// const NewPost = React.lazy(() => import('./NewPost/NewPost')); //Async importing

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <Switch>
                    <Route path='/new-post' exact component={NewPost}/>
                    <Route path={'/qa'} component={QA}/>
                    <Route path={'/message:id'} component={Message}/>
                    <Route path={"/posts/:id"} exact component={FullPost}/>
                    {/* <Route path='/study' component={Study}/>
                    <Route path='/job' component={Job}/> */}
                    <Route path='/' component={Posts}/>
                </Switch>
            </div>
        )
    }
}

export default Blog;


