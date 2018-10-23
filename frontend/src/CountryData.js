import React, { Component } from 'react';
import {
  Alert,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle } from 'reactstrap'

export default class CountryData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      data: null
    };
  }

  fetchCountry() {
    if (this.state.name === null) return;

    fetch(`http://localhost:5000/api/countries/getByName?name=${this.state.name}`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.fetchCountry()
  }

  componentWillReceiveProps(props) {
    this.setState({name:props.name}, () => this.fetchCountry())
  }

  render() {
    if (this.state.data === null) return <div />

    if (this.state.data.hasOwnProperty("error")) {
      return (
        <Alert color="danger" className="my-5">
          {this.state.data.error}
        </Alert>
      )
    }

    let country = this.state.data

    return (
      <div className="row my-5">
        <div className="col-md-4">
          <Card>
            <CardImg top src={country.flag} alt={`Flag of ${country.name}`} />
            <CardBody>
              <CardTitle>{country.name}</CardTitle>
              <CardSubtitle>{country.nativeName}</CardSubtitle>
              <CardText></CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <p>
            <strong>Capital:</strong><br/>
            {country.capital}
          </p>
          <p>
            <strong>Population:</strong><br/>
            {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Languages:</strong><br/>
            <ul>
              {country.languages.map(lang => {
                return <li>{lang.name}</li>
              })}
            </ul>
          </p>
        </div>
      </div>
    )
  }
}
