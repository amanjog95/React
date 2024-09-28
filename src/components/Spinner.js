import React, { Component } from 'react'
import loder from './loader.gif'

export default class Spinner extends Component {
    
  render() {
    return (
      <div>
        <img className='d-block mx-auto' src={loder} alt="loader" />
      </div>
    )
  }
}
