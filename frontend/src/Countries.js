import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import Select from 'react-select'
import CountryData from './CountryData'

export default class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCountries: null,
      selectedOption: null,
      countryData: null
    };

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch(`/api/countries/getAll`)
      .then(res => res.json())
      .then(allCountries => this.setState({ allCountries }))
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    if (this.state.allCountries === null) {
      return (
        <div>Loading...</div>
      )
    }

    if (this.state.allCountries.hasOwnProperty('error')) {
      return (
        <Alert color="danger">
          {this.state.allCountries.error}
        </Alert>
      )
    }

    // Populating an object to use the dropdown component
    let options = []
    this.state.allCountries.forEach(item => {
      options.push({
        label: item.name,
        value: item.name
      })
    })

    return (
      <div>
        <h1>Countries</h1>
        <p>Select a country to see its data:</p>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
        />

        <CountryData name={this.state.selectedOption?this.state.selectedOption.value:null} />
      </div>
    );
  }
}
