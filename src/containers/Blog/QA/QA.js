import React from 'react'
import { NavLink, Link } from 'react-router-dom' 
import axios from 'axios'
//import axios from '../../../axios-instance'
import Message from '../Message/Message'
import './QA.css'

class QA extends React.Component {
    
    state = {
        messages: [{id:1, title:'Hello', writer:'choi', views:0, dates:"00/00 00:00"}],
        pageIndexList: [0],
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

                const pageIndexList = []
                for (let i = 0; i < pageCount; i++) {
                    pageIndexList.push(i)
                }

                this.setState( {pageIndexList: pageIndexList} )
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

    prevPagesHander = () => {
        if (this.state.start > 0) {
            const start = this.state.start - 10
            const end = this.state.end - 10

            this.setState( {start: start, end: end} )
        }
    }

    nextPagesHander = () => {
        if (this.state.pageIndexList.length > this.state.end) {
            const start = this.state.start + 10
            const end = this.state.end + 10

            this.setState( {start: start, end: end} )
        }
    }

    render() {
        return (
            <div className="QA-Container">
                <section className="QA-section">
                    <table>
                        <tr>
                            <th className="headCol1" scope="col">number</th>
                            <th className="headCol2" scope="col">title</th>
                            <th className="headCol3" scope="col">writer</th>
                            <th className="headCol4" scope="col">view</th>
                            <th className="headCol5" scope="col">regdate</th>
                        </tr>
                        {this.state.messages.map(message => 
                        <tr>  
                            <td className="bodyData1">{message.id}</td>
                            <td className="bodyData2" >
                                <Link to={"/message" + message.id} key={message.id}>{message.title}</Link>
                            </td>
                            <td className="bodyData3">{message.writer}</td>
                            <td className="bodyData4">{message.views}</td>
                            <td className="bodyData5">{message.dates}</td>
                        </tr>
                        )}  
                    </table>
                </section>

                <div className="newpost">
                    <NavLink to={{pathname: '/new-post'}}>New Post</NavLink>
                </div>

                <div className="pages">
                    <span>
                        <button onClick={this.prevPagesHander}>prev</button>
                    </span>

                    {this.state.pageIndexList.slice(this.state.start, this.state.end).map(pageIndex => 
                        <span>
                            <button onClick={ () => this.pageHandler(pageIndex) } key={pageIndex}>{pageIndex + 1}</button>
                        </span>
                    )}
                        
                    <span>
                        <button onClick={this.nextPagesHander}>next</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default QA
