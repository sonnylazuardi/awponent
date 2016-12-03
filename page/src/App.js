import React, { Component } from 'react';
import './App.css';
import logo from './images/logo.png';
import phone from './images/phone.png';
import exponentlogo from './images/exponentlogo.png';
import downloadappstore from './images/downloadappstore.png';
import downloadplaystore from './images/downloadplaystore.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="container">
            <div className="logo-wrapper">
              <img src={logo} className="logo-image" />
            </div>

            <div className="row" className="header-content">
              <div className="col-md-6">
                <div className="phone-wrapper">
                  <img src={phone} className="phone-image" />
                </div>
              </div>
              <div className="col-md-6">
                <h1>
                  <div>Curated list of</div>
                  <div className="small1">awesome react native</div>
                  <div className="small2">components on exponent</div>
                </h1>
                <a href="#" className="btn btn-default">
                  <img src={exponentlogo} className="exponentlogo-image" /> Open in Exponent
                </a>
                <div className="small">coming soon</div>
                <div className="row" className="download-wrapper">
                  <div className="col-xs-6">
                    <img src={downloadappstore} className="downloadbutton" />
                  </div>
                  <div className="col-xs-6">
                    <img src={downloadplaystore} className="downloadbutton" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <h1><i className="fa fa-globe" /> Examples Scattered</h1>
            <p>
              Most of React Native ui related components is scattered over the github, hackernews, FB groups, reddit.
              Here we try to create a portal for everyone to easily browse and experience the components.
              <div className="media-wrapper">
                <i className="fa fa-github-square" /> 
                <i className="fa fa-hacker-news" /> 
                <i className="fa fa-facebook-square" /> 
                <i className="fa fa-reddit-square" /> 
              </div>
            </p>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <h1><i className="fa fa-calendar-check-o" /> Up-to-date Components</h1>
            <p>
              Browse the latest components and easily contribute to this project by adding component list. There is also 
              a featured list to be discovered.  
            </p>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <h1><i className="fa fa-heart" /> Favourite Feeds</h1>
            <p>
              Once you have seen and tried a component, and you liked it, you can directly save it and check it later 
              in Favourite Feeds.
            </p>
          </div>
        </div>
        <div className="content-inverse">
          <div className="container">
            <h1>Created By</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="avatar">
                  <img src="https://avatars3.githubusercontent.com/u/18402191?v=3&s=200" />
                  <div>Sung Woo Park</div>
                  <a className="github-button" href="https://github.com/ggomaeng" data-style="mega" data-count-href="/ggomaeng/followers" data-count-api="/users/ggomaeng#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @ggomaeng on GitHub">Follow @ggomaeng</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="avatar">
                  <img src="https://avatars2.githubusercontent.com/u/856609?v=3&s=200" />
                  <div>Sonny Lazuardi</div>
                  <a className="github-button" href="https://github.com/sonnylazuardi" data-style="mega" data-count-href="/sonnylazuardi/followers" data-count-api="/users/sonnylazuardi#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @sonnylazuardi on GitHub">Follow @sonnylazuardi</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
