import React, {Component} from 'react'
//import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Main from './Main'

class BooksApp extends React.Component {

state = {

    books: []
  }

componentDidMount() {
   BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
}

changeShelf = (book, shelf) => {
  BooksAPI.update(book, shelf)
  
  BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
}

removeFromSearch() {
}

  render() {
    return (
      <div className="app">
                 <Search 
       changeShelf={this.changeShelf}
       />

        {this.state.showSearchPage ? (
          <Search />
        ) : (
<Main 
      books={this.state.books}
changeShelf={this.changeShelf}
      />
        )}

      </div>
    )
  }
}

export default BooksApp
