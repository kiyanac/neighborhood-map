import React, {Component} from 'react';


class ListItem extends Component {
  render = () => {
    return (
      <li className="listItem">
      	{this.props.venue.name}
      </li>
    );
  }
}

export default ListItem;
