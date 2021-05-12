import React from 'react'
import { NavLink, Link } from 'react-router-dom' 
import axios from 'axios'
//import axios from '../../../axios-instance'
import Message from '../Message/Message'
import './QA.css'

class QA extends React.Component {
    
    state = {
        messages: [ {id:1, title:'Hello', writer:'Choi', views:0, dates:"00/00 00:00"} ],
        pageIndexes: [0],
        start: 0,
        end : 10
    }

    componentDidMount() {
        axios.get('/frontQABoard/getCount')     // get요청 or post요청
            .then(response => {
                const dataCount = response.data

                let pageCount = Math.floor(dataCount / 10)
                if (dataCount % 10 > 0) {
                    pageCount++
                }

                const pageIndexes = []
                for (let i = 0; i < pageCount; i++) {
                    pageIndexes.push(i)
                }

                this.setState( {pageIndexes: pageIndexes} )
            })
            .catch(error => console.log(error))

        axios.get('/frontQABoard/getList')      // ?index=0
            .then(response => {this.setState( {messages: response.data} )})
            .catch(error => console.log(error)) 
    }

    pageHandler = (pageIndex) => {
        pageIndex = pageIndex * 10

        axios.get('/frontQABoard/getList')      // ?index={pageIndex}
        .then(response => {this.setState( {messages: response.data} )})
        .catch(error => console.log(error))  
    }

    prevPagesHandler = () => {
        if (this.state.start > 0) {
            const start = this.state.start - 10
            const end = this.state.end - 10

            this.setState( {start: start, end: end} )
        }
    }

    nextPagesHandler = () => {
        if (this.state.pageIndexes.length > this.state.end) {
            const start = this.state.start + 10
            const end = this.state.end + 10

            this.setState( {start: start, end: end} )
        }
    }

    render() {      // 컴포넌트 쪼개기 
        return (
            <div className="QA-container">
                <section className="QA-section">
                    <table>
                        <tr>
                            <th className="head-col1" scope="col">number</th>
                            <th className="head-col2" scope="col">title</th>
                            <th className="head-col3" scope="col">writer</th>
                            <th className="head-col4" scope="col">view</th>
                            <th className="head-col5" scope="col">regdate</th>
                        </tr>

                        {this.state.messages.map(message => 
                        <tr>  
                            <td className="body-data1">{message.id}</td>
                            <td className="body-data2">
                                <Link to={"/message" + message.id} key={message.id}>{message.title}</Link>
                            </td>
                            <td className="body-data3">{message.writer}</td>
                            <td className="body-data4">{message.views}</td>
                            <td className="body-data5">{message.dates}</td>
                        </tr>)}
                    </table>
                </section>

                <div className="new-post">
                        <NavLink to={{pathname: '/new-post'}}>New Post</NavLink>
                </div> 

                <div className="pages">
                    <span>
                        <button onClick={this.prevPagesHandler}>prev</button>
                    </span>

                    {this.state.pageIndexes.slice(this.state.start, this.state.end).map(pageIndex => 
                        <span>
                            <button onClick={ () => this.pageHandler(pageIndex) } key={pageIndex}>{pageIndex + 1}</button>
                        </span>
                    )}
                        
                    <span>
                        <button onClick={this.nextPagesHandler}>next</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default QA
