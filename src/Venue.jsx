import React, {Component} from 'react';
import './App.css'

class Venue extends Component{
    constructor(props){
      super(props);
    }

    handleVenueClick = () => {
      this.props.openModal();

      var id = this.props.id;
      this.props.loadVenue(id);
    }

  render(){
    return(
        <div className="card venue">
          <div className="card-body">
            <h1 className="venue-name" onClick={this.handleVenueClick}>{this.props.name}</h1>
            <p>{this.props.address[0]}</p>
            <p>{this.props.address[1]}</p>
            <p><span className="badge venue-type">{this.props.category}</span></p>
          </div>
        </div>
      )
  }
}

export default Venue;