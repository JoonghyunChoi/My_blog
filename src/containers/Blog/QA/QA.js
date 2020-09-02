import React from 'react'
import { NavLink, Link } from 'react-router-dom' 
import './QA.css'

class QA extends React.Component {
    
    render() {
        return (
            <div className="QA-Container">
                <section className="QA-section">
                    <table>
                        <tr>
                            <th className="QA-TableHeadCol1" scope="col">number</th>
                            <th className="QA-TableHeadCol2" scope="col">title</th>
                            <th className="QA-TableHeadCol3" scope="col">writer</th>
                            <th className="QA-TableHeadCol4" scope="col">view</th>
                            <th className="QA-TableHeadCol5" scope="col">regdate</th>
                        </tr>
                        <tr>  
                            <td className="QA-TableBodyData1">1</td>
                            <td className="QA-TableBodyData2" >
                                <Link to="/message">Hello</Link>
                            </td>
                            <td className="QA-TableBodyData3">Choi</td>
                            <td className="QA-TableBodyData4">100</td>
                            <td className="QA-TableBodyData5">2020-09-02 21:00</td>
                        </tr>  
                      </table>
                </section>
                <NavLink to={{pathname: '/new-post'}}>New Post</NavLink>
            </div>
        )
    }
}

export default QA