import React, { Component } from 'react';

class ApiFun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = 'https://restcountries.eu/rest/v2/all';

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data,
        });
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    // console.log("BEEEEEER!!!!!", this.state.data)
    return (
      <div className="App">
        <marquee>Hello World</marquee>
      </div>
    );
  }
}

export default ApiFun;
