import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
//import {Link} from 'react-router-dom'
import Books from './Books'
import Main from './Main'

class Search extends Component {
    state = {
    search: '',
      searchedBooks: []
  }

  updateSearch = (search) => {
    this.setState({search: search })
    this.showResults(search)
  }

showResults = (search) => {
  if(search) {
	BooksAPI.search(search).then((searchedBooks) => {
      if(searchedBooks.error) {
        this.setState({ searchedBooks: []})
      }else{
            this.setState({searchedBooks:searchedBooks})
      }
    })
  }else{
    this.setState({ searchedBooks: []})
  }
}

  render() {
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <a to="/main" className="close-search" 
          // onClick={() => this.setState({ showSearchPage: false })}
>Close</a>
              <div className="search-books-input-wrapper">
              
                <input type="text" placeholder="Search by title or author"
value={this.state.search}
onChange={(event) => this.updateSearch(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
{this.state.searchedBooks.map(searchedBook => (<li key={searchedBook.id}>
 <Books
 book={searchedBook}
changeShelf={this.props.changeShelf}
/>
</li>
))}
</ol>
            </div>
          </div>
        )   
  }
}

export default Search
