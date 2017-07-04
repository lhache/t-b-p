import React, { Component } from 'react';
import Translate from 'react-translate-component'
import './Header.css'

const Header = () => {
  let input

  return (
    <div>
      <h1>Toy project</h1>
      <Translate content="title" />
    </div>
  )
}


export default Header;
