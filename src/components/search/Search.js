import React from 'react'
import { useState, useEffect } from 'react'
import { SearchBar } from 'react-native-elements';

const Search = ({filterResult}) => {
    const [search, setSearchFor] = useState(null)

    useEffect(() => {
        filterResult(search)
    },[search])
    
    return(
        <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setSearchFor(text)}
        round={true}
        lightTheme={true}
        value={search}
      />
    )
}

export default Search;