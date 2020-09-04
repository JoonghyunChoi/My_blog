import React from 'react'
import './Search.css';
import { Input } from 'semantic-ui-react'

const Search = () => (
    <Input
    icon={{ name: 'search', circular: true, link: true }}
    placeholder='Search...'
    className="Search"
  />
)

export default Search
