import React, {useState, useEffect, useContext} from 'react'

const [checkedIDS, setCheckedIDS] = useContext(DeleteContext);

const [checkedState, setCheckedState] = useState(false);

const handleCheckedState = () => {
    if (checkedState === !false) {
        return setCheckedIDS(() => checkedIDS.filter(checkedID => checkedID !== id))
    }
    return setCheckedIDS(() => checkedIDS.concat(id))
}

useEffect(() => {
    console.log(checkedIDS)


}, [checkedState])

