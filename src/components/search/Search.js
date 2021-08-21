import React from 'react'
import {useState, useEffect} from 'react'
import {SearchBar} from 'react-native-elements';

const Search = ({ filterResult }) => {

    const [search, setSearchFor] = useState('')


    useEffect(() => {
        filterResult(search)
    }, [])

    useEffect(() => {
        filterResult(search)
    }, [search])

    return (<SearchBar placeholder="Type Here..."
        onChangeText={
            (text) => setSearchFor(text)
        }
        round={true}
        lightTheme={true}
        value={search}
        containerStyle={
            {
                backgroundColor : '#f2f2f2',
                borderBottomColor : '#f2f2f2',
                borderTopColor : '#f2f2f2',
            }
        }/>)
}

export default Search;
