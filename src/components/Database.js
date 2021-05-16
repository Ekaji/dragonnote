import React from 'react'
import * as SQLite from 'expo-sqlite'

//create a database instance
const db = SQLite.openDatabase('db.db')

// create database
const setupDatabaseAsync = async () => {
    return new Promise( ( resolve, reject ) => {
        db.transaction( tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)'
            );
        },
        ( _, error ) => { console.log( 'db error creating TABLES' ); console.log( error ); reject( error ) },
        ( _, success ) => { console.log( 'success setupDatabaseAsync' ) }
        )
    })
}

   const fetchData = (setNote) => {
        db.transaction(tx => {
          // sending 4 arguments in executeSql
          tx.executeSql('SELECT * FROM notes', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            ( _, { rows: { _array } }) => setNote({ _array }),
            // failure callback which sends two things Transaction object and Error
            ( _, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
      }


// create new notes
const insertNote = ( title, content ) => { 
    db.transaction( tx => { 
        tx.executeSql( 'INSERT INTO notes (title, content ) values(?, ?)', [title, content] )
    },
        ( t, error ) => { console.log( 'error inserting into notes'); console.log( error ) },
        //successFunc( ) refreshes the database after user has been inserted so change would be reflected
        ( t, success ) => { console.log('insertUser successfull') }
    )
}

//delete table
//comment out in production
const dropDatabaseTable = async () => {
    return new Promise( ( resolve, reject) => {
        db.transaction( tx => { 
            tx.executeSql('DROP TABLE notes', [],
            (_, result) => { resolve(result) },
            (_, error) => { console.log("error dropping users table"); reject(error) }
            )
        })
    })  
}

const setupUsersAsync = async () => {
    return new Promise((resolve, _reject) => {
      db.transaction( tx => {
          tx.executeSql( 'INSERT INTO notes (id, title, content) values (?,?,?)', [4, "Roses", "Roses are red"] );
        },
        (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
        (t, success) => { console.log('setupUsersAsync successfull'); resolve(success)}
      )
    })
  }

  export const database = {
      setupDatabaseAsync,
      dropDatabaseTable,
      setupUsersAsync,
      insertNote,
      fetchData,
  }