import React, { Component } from 'react';
import './App.css';
import Security from './components/security'; 
import SecModal from './components/secModal'; 
import Modal from 'react-modal'; 
import {connect} from 'react-redux'; 

const modalStyle = {
  content: {
      bottom: 'auto', 
      left: '50%', 
      marginRight: '-50%',
      right: 'auto', 
      top: '50%', 
      transform: 'translate(-50%, -50%)'
  }
}

class App extends Component {
  state = {
    addModal: false
  }
  render() {
    return (
      <div className="App container">
        <h3 className = "mt-4 mb-4 text-left"> Securities </h3> 
        {this.props.securities.map((sec, key) => (
          <Security index = {key}/> 
        ))}
        <button className = "btn float-left" onClick = {() => this.setState({addModal: true})}> Add </button> 
        <Modal 
          isOpen = {this.state.addModal} 
          onRequestClose = {() => this.setState({addModal: false})}
          style = {modalStyle} 
          contentLabel = "Add Security"
          ariaHideApp = {false}
        > 
          <SecModal mode = "add" closeModal = {() => this.setState({addModal: false})}/> 
        </Modal> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  securities: state.securities
})

export default connect(mapStateToProps)(App);
