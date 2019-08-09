import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Venue from './Venue.jsx';
import './App.css';

var clientId = 'FI0MIEKHEP3LBYTK2VQY1XBQLDYH0HMEHTVXZM5LXSY5ELQI';
var clientSecret = 'DYEO2BLDBP1UMI4EGCZIPWJS5A15HA550NX2COM5CDUEFBY1';

var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=20190808';

class App extends Component{
  constructor(props){
    super(props)

    this.state = {
      venues:[

        //hard coding the data -- this information is obtained with foursquare api

        // {
        //   id: "4b4d4133f964a52070cf26e3", 
        //   name: "Real Groovy", 
        //   address: [
        //     "369 Queen Street",
        //     "Auckland 1010",
        //   ], 
        //   category: "Record Shop",
        // },
        // {
        //   id: "4bc992e7b6c49c7401a28e91", 
        //   name: "Ken Yakitori", 
        //   address: [
        //     "89 Karangahape Rd.",
        //     "Auckland 1010",
        //   ], 
        //   category: "Japanese",
        // },
        // {
        //   id: "5add42f3e65d0c034c148e3a", 
        //   name: "Four Points by Sheraton Auckland", 
        //   address: [
        //     "396 Queen Street, Main Reception Entrance 110 Mayoral Dr",
        //     "Auckland 1010"
        //   ], 
        //   category: "Hotel",
        // },
      ],
      isModalOpen: false,
      venue: null,
    }
  }

  loadVenues = () => {

    var latlng1 = '-36.8559743,174.7632743'
    var venuesURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll='+latlng1;

    fetch(venuesURL)
      .then(res => res.json())
      .then((data)=>{
        return data.response.groups[0].items;
      })
      
      .then((data)=>{
        return data.map((item)=>{
          var venue = {
            id: item.venue.id,
            name: item.venue.name,
            address: item.venue.location.formattedAddress,
            category: item.venue.categories[0].shortName,
          }
          return venue;
        });
      })

      .then((data)=>{
        this.setState({venues: data});
      });
  }

  loadVenue = (venueId) => {

    var venueURL = 'https://api.foursquare.com/v2/venues/'+venueId+key;

    fetch(venueURL)
      .then(res => res.json())
      .then((data)=>{
      var item = data.response.venue;
      var venue = {
        name:item.name,
        description:item.description,
        category:item.categories[0].shortName,
        address:item.location.formattedAddress,
        photo:item.bestPhoto.prefix+'500x500'+item.bestPhoto.suffix,
      }

      // first 'venue' refer to this.state = venue, the second 'venue refers to the local bucket'
      // this.setState({venue: venue});

      this.setState({venue});
    });
  }

  componentDidMount(){
    this.loadVenues();
  }

  openModal = () => {
    this.setState({isModalOpen: true});
  }

  closeModal = () => {
    this.setState({isModalOpen: false});
  }

  render(){
    return(
        <div className="app">
          <div className="container">
            <div className="venues">

              {this.state.venues.map((venue) => {
                var venueProps = {
                  ...venue,
                  key: venue.id,
                  openModal: this.openModal,
                  loadVenue: this.loadVenue,
                }

                return (<Venue {...venueProps}/>)
              })
              }
            
            </div>

          <div className="venue-filters">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div role="group" className="btn-group btn-group-toggle">
                <label className="venue-filter btn active btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="all" defaultChecked=""/>All
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="food"/>Food
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="drinks"/>Drinks
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="others"/>Others
                </label>
              </div>
            </div>
          </div>
        </div>
        
          
          {/* for these functions below it is only one line therefore {} are not needed */}

          <Modal show={this.state.isModalOpen} onHide={() => this.closeModal()}>
            <Modal.Body>
              {
                this.state.venue !== null ? (
                  <div className="venue-popup-body row">
                    <div className="col-6">
                      <h1 className="venue-name">{this.state.venue.name}</h1>
                      <p>{this.state.venue.address[0]}</p>
                      <p>{this.state.venue.address[1]}</p>
                      <p>{this.state.venue.description}</p>
                      <p><span className="badge venue-type"></span>{this.state.venue.category}</p>
                    </div>
                    <div className="col-6">
                      <img src={this.state.venue.photo}/>
                    </div>
                  </div>
                ) : 'Loading...'
              }
              


            </Modal.Body>
          </Modal>

      </div>
    )
  }
}




export default App;
