import React, {Component} from 'react';
import ListItem from './ListItem';

/*
function showResults(search){
  return function(venues){
    return this.props.venues().includes(search.toLowerCase()) || !search;
  }
} 
*/

class MallList extends Component {
  render = () => {
    return (
      //this.props.venues.map(venue =>
      <ol className="mallList">
      {this.props.venues && this.props.venues.map((venue, i) => (
        <ListItem key={i} {...venue}/>
))}
{/*{this.props.searchedMall.map(searchedMall => {
     let name = "";
     
     this.props.venue.name.map(name => (
      name.id === searchedMall.id ?
      name = books.shelf : ''
    )} */}
      </ol>
    );
  }
}

export default MallList;
