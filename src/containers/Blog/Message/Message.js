import React from 'react'
import axios from '../../../axios-instance';
import './Message.css'

class Message extends React.Component {
    state = {
        message: {title: 'Hello', contents: 'It works!', writer: 'Choi', dates: '00/00 00:00'},
        parentComment: '',
        childComment: '',
        comments: [
                {messageId: 1, parentId: null, id: 1, writer: 'person1', content: '1', regdate: '00/00 00:00'},
                {messageId: 1, parentId: 1, id: 3, writer: 'person2', content: '3', regdate: '00/00 00:00'},
                {messageId: 1, parentId: 1, id: 4, writer: 'person3', content: '4', regdate: '00/00 00:00'},
                {messageId: 1, parentId: null, id: 2, writer: 'person4', content: '2', regdate: '00/00 00:00'}
                ],
        replyForms: []
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get('http://3.35.91.103:3001/frontQABoard/getList') // + this.props.match.params.id
                .then(response => {this.setState( {message: response.data} )})
                .catch(error => console.log(error))

            axios.get('http://3.35.91.103:3001/frontQABoard/getReply') //  + this.props.match.params.id
                .then(response => {this.setState( {replys: response.data} )})
                .catch(error => console.log(error))
            }
    }

    parentCommentHandler = () => {
        const parentComment = { 
            messageId: this.props.match.params.id,
            content: this.state.parentComment,
            parentId: null
         }
        axios.post('http://3.35.91.103:3001/frontQABoard/comment', parentComment)
            .then(response => {console.log(response)})
            .catch(error => console.log(error))
    }

    childCommentHandler = (parentId) => {
        const childComment = {
            messageId: this.props.match.params.id,
            content: this.state.childComment,
            parentId: parentId
        }
        axios.post('http://3.35.91.103:3001/frontQABoard/comment', childComment)
            .then(response => {console.log(response)})
            .catch(error => console.log(error))
    }
    
    showReplyForm = (commentId) => {
        let replyForms = this.state.replyForms

        if (replyForms.includes(commentId)) {
            replyForms.splice(replyForms.indexOf(commentId), 1)
            this.setState( {replyForms: replyForms} )}
            
        else {
            replyForms.push(commentId)
            this.setState( {replyForms: replyForms} )
        }
    }

    render() {      // 컴포넌트 분리하기
        return (
            <div className="message-container">
                <div className="board">
                    <h1>질문게시판</h1>
                </div>
                <div className="message">
                    <p className="writer">{this.state.message.writer}</p>
                    <p className="dates">{this.state.message.dates}</p>
                    <h1 className="title">{this.state.message.title}</h1>
                    <p className="contents">{this.state.message.contents}</p>
                </div>
                <div className="parent-reply-form">
                    <input type="text" onChange={(event) => this.setState({parentComment: event.target.value})}></input>
                </div>
                <div className="parent-reply-button">
                    <button onClick={this.parentCommentHandler}>reply</button>
                </div>

                {this.state.comments.map(comment => {
                if (comment.parentId === null) {
                        return (
                            <div>
                                <div className="parent-comment">
                                    <p className="pc-writer">{comment.writer}</p>
                                    <p className="pc-content">{comment.content}</p>
                                    <p className="pc-regdate">{comment.regdate}</p>
                                    <p className="post-comment" onClick={ () => this.showReplyForm(comment.id)}>comment</p>
                                </div>
                                <div className={this.state.replyForms.includes(comment.id) ? "reply-show" : "reply-hide"}>
                                        <div className="child-reply-form">
                                            <input type="text" onChange={ (event) => this.setState({childComment: event.target.value}) }></input>
                                        </div>
                                        <div className="child-reply-button">
                                            <button onClick={ () => this.childCommentHandler(comment.id) }>reply</button> 
                                        </div>
                                </div>
                            </div>
                        )}

                else { 
                    return (
                        <div className="child-comment" key={comment.id}>
                            <p className="cc-writer">{comment.writer}</p>
                            <p className="cc-content">{comment.content}</p>
                            <p className="cc-regdate">{comment.regdate}</p>
                        </div>
                    )}
                })}
            </div>
        )
    }
}

export default Message
