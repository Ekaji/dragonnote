import React from 'react'
import * as SQLite from 'expo-sqlite'
import { Alert } from 'react-native'

//create a database instance
const db = SQLite.openDatabase('db.db')

// create database
const setupDatabaseAsync = async () => {
    return new Promise( ( resolve, reject ) => {
        db.transaction( tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes (id TEXT, title TEXT, content TEXT)'
            );
        },
        ( _, error ) => { console.log( 'db error creating TABLES' ); console.log( error ); reject( error ) },
        ( _, success ) => { console.log( 'success setupDatabaseAsync' ) }
        )
    })
}

//get item
   const fetchData = (getNote) => {
        db.transaction(tx => {
          // sending 4 arguments in executeSql
          tx.executeSql('SELECT * FROM notes', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            ( _, { rows: { _array } }) => getNote({ _array }),
            // failure callback which sends two things Transaction object and Error
            ( _, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
      }
    
    const upDateNote = (id, title, content ) => {
       db.transaction( tx => {
         tx.executeSql('UPDATE notes SET title = ?, content = ? WHERE id = ?',
         [title, content, id],
         (tx , results) => {
           if (results.rowsAffected > 0){
             console.log('success')
           } else {
             console.log('failed to update')
           }
         }
         )
       }) 
    }


// create new notes
const insertNote = ( noteTitle, noteContent ) => { 
  // if (title || content === null) { return }
  const date = new Date();
  const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  const id = creationDate.toString()
    db.transaction( tx => { 
        tx.executeSql( 'INSERT INTO notes (id, title, content ) values(?, ?, ?)', [id, noteTitle, noteContent] )
    },
        ( t, error ) => { console.log( 'error inserting into notes'); console.log( error ) },
        ( t, success ) => { console.log('insertUser successfull') }
    )
}


//comment out the below code in production
//delete table
// const dropDatabaseTable = async () => {
//     return new Promise( ( resolve, reject) => {
//         db.transaction( tx => { 
//             tx.executeSql('DROP TABLE notes', [],
//             (_, result) => { resolve(result); console.log( 'table droped' )},
//             (_, error) => { console.log("error dropping users table"); reject(error) }
//             )
//         })
//     })  
// }

// adds note setup for developement and tesytting
// const setupNoteAsync = async () => {
//     return new Promise((resolve, _reject) => {
//         const date = new Date();
//         const creationDate = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
//         const id = creationDate.toString()
//       db.transaction( tx => {
//           tx.executeSql( 'INSERT INTO notes (id, title, content) values (?,?,?)', [id, "Roses", "Roses are red"] );
//         },
//         (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
//         (t, success) => { console.log('setupUsersAsync successfull'); resolve(success)}
//       )
//     })
//   }

  export const database = {
//    setupNoteAsync,
//    dropDatabaseTable,
      setupDatabaseAsync,
      upDateNote,
      insertNote,
      fetchData,
  }