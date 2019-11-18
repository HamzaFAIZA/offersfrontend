import React from 'react'
import axios from 'axios';
import {DETAILED_VEHICLE as DETAILED_VEHICLE} from "../constants/links"

class DetailedVehicle extends React.Component {
    
state = {
    id : this.props.match.params.id,
    data : []
}
componentDidMount (){
    //this.setState({id: this.props.match.params.id})
    //console.log(this.props.match.params.id);
    axios.get(DETAILED_VEHICLE+this.state.id)
        .then(response => response = response.data)
        .then(res => {
            this.setState({data: res})
            
        })
        
}

  render() {
    return (
      <div>
        <h1>Detailed Vehicle</h1>
        {JSON.stringify(this.state.data)}
        <p>I displayed them witout style because of the time</p>
      </div>
    )
  }
}
export default DetailedVehicle