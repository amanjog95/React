import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

export default class App extends Component {
  render() {

    const router = createBrowserRouter([
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
    ]);

    return (
      <div>
          <Navbar />
          <News pageSize={8} country="us" category="entertainment" />
      </div>
    )
  }
}

