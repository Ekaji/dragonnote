// import React,{ useState, useEffect } from 'react';
// import { View } from 'react-native';
// import MultiSelect from 'react-native-multiple-select';
// import { set } from 'react-native-reanimated';
// import { database } from '../../../src/components/multisellect/multisellectList';


// const ListItems = () => {
//     const [ note, getNote ] = useState([]);
//     const [setSelectedItems, selectedItems] = useState([])

//     const onSelectedItemsChange = () => {
//         setSelectedItems(selectedItems)
//     }

    
//     const loadDataAsync = async () => {
//         try{
//             // usefull in developement
//             database.dropDatabaseTable(); 
//             database.setupNoteAsync();
//             database.setupDatabaseAsync();
//             database.fetchData(getNote)
//         } catch(e){
//             console.error(e)
//         }
//     }

//     useEffect(() => {
//         //loads data when app starts the first time
//         loadDataAsync();
//    },[])

//     // useEffect(() => {
//     //     //fetch data when the home screen comes into focus
//     //     const reloadData = navigation.addListener('focus', () => {
//     //         loadDataAsync();
//     //         } )
//     //         return reloadData
//     // })

//     const items = note._array;



//     return(
//         <View  style={{flex: 1}} >
//           <MultiSelect 
//             items={ items }
//             uniqueKey='id'
//             onSelectedItemsChange={ onSelectedItemsChange }
//           />
//           <View>
//           { multiSelect.getSelectedItemsExt(selectedItems)}
//         </View>
//         </View>
//     )
// }

// export default ListItems;