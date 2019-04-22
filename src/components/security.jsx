import React, {Component} from 'react'; 
import Modal from 'react-modal'; 
import SecModal from './secModal'; 
import PriceModal from './priceModal'; 
import { connect } from 'react-redux'; 

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

class Security extends Component {
    state = {
        editModal: false, 
        pricesModal: false
    }
    render() {
        let security = this.props.securities[this.props.index];
        return (
            <div className = "p-3 border mt-3 mb-3"> 
                <h5 className = "float-left"> {security.name} </h5> 
                <div style = {{clear: 'both'}}/> 
                <div> 
                    <p className = "float-left"> {security.isin} </p> 
                    <p className = "float-left ml-5"> {security.country} </p> 
                    <p className = "float-left ml-5" onClick = {() => this.setState({pricesModal: true})}> <u> Prices </u> </p>
                    <Modal 
                        isOpen = {this.state.pricesModal}
                        onRequestClose = {() => this.setState({pricesModal: false})}
                        style = {modalStyle} 
                        contentLabel = "Prices" 
                        ariaHideApp = {false}
                    > 
                        <PriceModal index = {this.props.index} closeModal = {() => this.setState({pricesModal: false})}/> 
                    </Modal>  
                    <p className = "float-right" onClick = {() => this.setState({editModal: true})}> <u> Edit </u> </p> 
                    <Modal 
                        isOpen = {this.state.editModal} 
                        onRequestClose = {() => this.setState({editModal: false})}
                        style = {modalStyle} 
                        contentLabel = "Edit Security"
                        ariaHideApp = {false}
                    > 
                        <SecModal mode = "edit" index = {this.props.index} closeModal = {() => this.setState({editModal: false})}/> 
                    </Modal> 
                    <div style = {{clear: 'both'}}/> 
                </div> 
            </div> 
        )   
    }
}

const mapStateToProps = (state) => ({
    securities: state.securities
})

export default connect(mapStateToProps)(Security); 