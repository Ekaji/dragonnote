import React from 'react'
import * as SQLite from 'expo-sqlite'

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
        //successFunc( ) refreshes the database after user has been inserted so change would be reflected
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
      insertNote,
      fetchData,
  }