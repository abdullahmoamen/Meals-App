import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import './Loader.css';

export default class App extends Component {
  //other logic
render() {
    return (
        <>
        <h1 className='loading'>Loading.....</h1>
    <Loader
        className='loader'
        type="Puff"
        color="#ee9ca7"
        height={150}
        width={200}
        timeout={2000} //3 secs
    />
    </>
    );
}
}