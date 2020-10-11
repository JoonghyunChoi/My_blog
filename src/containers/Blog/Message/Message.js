import React from 'react'
import axios from '../../../axios-instance';
import './Message.css'

class Message extends React.Component {
    
    state = {
        message: {title: 'Hello', contents: 'It works!', writer: 'choi', dates: '00/00 00:00'},
        parentComment: '',
        childComment: '',
        comments: [
                {messageId: 1, parentId: null, id: 1, writer: 'person1', content: '1', regdate: '00/00 00:00'},
                {messageId: 1, parentId: 1, id: 3, writer: 'person2', content: '3', regdate: '00/00 00:00'},
                {messageId: 1, parentId: 1, id: 4, writer: 'person3', content: '4', regdate: '00/00 00:00'},
                {messageId: 1, parentId: null, id: 2, writer: 'person4', content: '2', regdate: '00/00 00:00'}
                ],
        replys: []
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get('http://3.35.91.103:3001/frontQABoard/getList') // + this.props.match.params.id
                .then(response => {this.setState({message: response.data})})
                .catch(error => console.log(error))

            axios.get('http://3.35.91.103:3001/frontQABoard/getReply') //  + this.props.match.params.id
                .then(response => {this.setState( {replys: response.data})})
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

    replyHandler = (replyId) => {
        let idList = this.state.replys

        if (idList.includes(replyId)) {
            idList.splice(idList.indexOf(replyId), 1)
            this.setState({replys: idList})
        }
        else {
            idList.push(replyId)
            this.setState({replys: idList})
        }
    }

    render() {
        return (
            <div className="Message-Container">
                <div className="board">
                    <h1>질문게시판</h1>
                </div>
                <div className="message">
                    <p className="writer">{this.state.message.writer}</p>
                    <p className="dates">{this.state.message.dates}</p>
                    <h1 className="title">{this.state.message.title}</h1>
                    <p className="contents">{this.state.message.contents}</p>
                </div>
                <div className="parentCommentInput">
                    <input type="text" onChange={(event) => this.setState({parentComment: event.target.value})}></input>
                </div>
                <div className="parentCommentButton">
                    <button onClick={this.parentCommentHandler}>reply</button>
                </div>

                {this.state.comments.map(comment => {
                
                 if (comment.parentId === null) {
                    if (this.state.replys.includes(comment.id)) {
                        return (
                            <div>
                                <div className="parentComment">
                                    <p className="pcWriter">{comment.writer}</p>
                                    <p className="pcContent">{comment.content}</p>
                                    <p className="pcRegdate">{comment.regdate}</p>
                                    <p className="reply" onClick={ () => this.replyHandler(comment.id) }>reply</p>
                                </div>
                                <div className="childCommentInput">
                                    <input type="text" onChange={ (event) => this.setState({childComment: event.target.value}) }></input>
                                </div>
                                <div className="childCommentButton">
                                    <button onClick={ () => this.childCommentHandler(comment.id) }>reply</button> 
                                </div>  
                            </div>
                        )}

                        return (
                            <div className="parentComment">
                                <p className="pcWriter">{comment.writer}</p>
                                <p className="pcContent">{comment.content}</p>
                                <p className="pcRegdate">{comment.regdate}</p>
                                <p className="reply" onClick={ () => this.replyHandler(comment.id) }>reply</p>
                            </div> 
                        )}

                if (comment.parentId !== null) { 
                    return (
                        <div className="childComment" key={comment.id}>
                            <p className="ccWriter">{comment.writer}</p>
                            <p className="ccContent">{comment.content}</p>
                            <p className="ccRegdate">{comment.regdate}</p>
                        </div>
                    )}
                })}
            </div>
        )
    }
}

export default Message