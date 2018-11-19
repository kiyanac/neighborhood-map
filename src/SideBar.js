import React, {Component} from 'react';
import MallList from './MallList';
//import FourSquare from './API.js';


class SideBar extends Component {
  state = {
    search: '',
    searchedMall: []
  }
/*
showResults = () => {
  if (this.state.search !== "") {
    const searchedMall = this.props.venues.filter(venue => venue.name
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase())
                           );
    return searchedMall;
  }
  return this.props.venues;
};
*/

updateSearch = (search) => {
      this.setState({search: search })
      //this.showResults(search)
  console.log(search);
    }

/*
showResults = (search) => {
  if(search) {
		this.props.venue.name.search(search).then((searchedMall) => {
      if(searchedMall.error) {
        this.setState({ searchedMall: []})
      }else{
        this.setState({searchedMall:searchedMall, search:search})
      }
    })
  }else{
    this.setState({ searchedMall: []})
  }
}
*/
  render = () => {
    return (
      <div className="sideBar">
      	<input type="search" placeholder="Filter Locations" onChange={(event) => this.updateSearch(event.target.value)}/>
        <MallList {...this.props}
			//searchedMall={this.showResults()}
		/>
      </div>
    );
  }
}

export default SideBar;
