import React, {Component} from 'react'; 
import {connect} from 'react-redux';

class PriceModal extends Component {
    state = {
        add: false,
        date: '', 
        edit: -1, 
        message: null,
        price: '',
        prices: [],
    }

    // Dispatch add price action 
    addPrice = async () => {
        let {date, price} = this.state;
        if (date === '' || price === '') {
            if (date === '' && price === '') await this.setState({message: 'Cannot submit a blank price'})
            else if (date === '') await this.setState({message: 'Invalid Date'});
            else if (price === '') await this.setState({message: 'Please enter a price'}); 
            return;
        } 
        let datesplit = date.split('-'); 
            date = new Date(datesplit[0], datesplit[1] - 1, datesplit[2]); 
        this.props.dispatch({
            type: "ADDPRICE", 
            data: {index: this.props.index, price: {date, price}}
        })
        await this.setState({date: '', price: '', message: null})
        this.toggleAdd(); 
    }

    // Save the prices array to the component state initially 
    componentWillMount() {
        this.setState({prices: this.props.securities[this.props.index].prices}); 
    }

    // Dipatch delete price action 
    delete = (index2) => {
        let prices = []; 
        for (let i = 0; i < this.state.prices.length; i++) {
            if (i !== index2) prices.push(this.state.prices[i]); 
        }
        this.props.dispatch({
            type: "DELETEPRICE", 
            data: {index: this.props.index, index2}
        }) 
        this.setState({prices})
    }

    // Dispatch edit price action after date formatting 
    editPrice = (index2) => {
        let date; 
        if (this.state.date) {
            let datesplit = this.state.date.split('-'); 
            date = new Date(datesplit[0], datesplit[1] - 1, datesplit[2]); 
        }
        else {
            date = this.props.securities[this.props.index].prices[index2].date; 
        }
        let price = this.state.price ? this.state.price : this.props.securities[this.props.index].prices[index2].price; 
        this.props.dispatch({
            type: "EDITPRICE", 
            data: {index: this.props.index, index2, edited: {date, price}}
        })
        this.setState({date: '', price: '', edit: -1})
    }

    // Initialize the input field with the correctly formatted date 
    openEdit = (price, key) => {
        let year = price.date.getFullYear(); 
        let month = price.date.getMonth() + 1; 
        let day = price.date.getDate(); 
        if (month < 10) month = "0" + month; 
        if (day < 10) day = "0" + day; 
        let date = year + '-' + month + '-' + day; 
        this.setState({edit: key, add: false, date, price: price.price})
    }

    // Open or close the 'add' field 
    toggleAdd = () => {
        this.setState({add: this.state.add ? false : true, edit: -1})
    }

    render() {
        const data = this.props.securities[this.props.index]; 
        return (
            <div> 
                <div className = "p-3"> 
                    <h5 className = "mb-3"> Prices </h5> 
                    {data.prices.map((price, key) => (
                        key === this.state.edit ? 
                            <div className = "row mb-2" key = {key}> 
                                <input type = "date" value = {this.state.date} className = "mr-2 border" onChange = {(e) => this.setState({date: e.target.value})}/>
                                <input type = "number" className = "mr-2 border" value = {this.state.price} onChange = {(e) => this.setState({price: e.target.value})}/>
                                <button className = "btn" onClick = {() => this.editPrice(key)}> Save </button> 
                            </div> : 
                            <div className = "row mb-2" key = {key} style = {{width: 400}}> 
                                <p className = "col-4"> {price.date.getMonth() + 1}/{price.date.getDate()}/{price.date.getFullYear()} </p> 
                                <p className = "col-4"> {price.price} </p> 
                                <p className = "col-3 mb-3" onClick = {() => this.openEdit(price, key)}> Edit </p> 
                                <button className = "btn" onClick = {() => this.delete(key)}> x </button> 
                            </div> 
                    ))}
                    {this.state.add ? 
                        <div className = "row mb-2 pl-3"> 
                            <input type = "date" className = "mr-2 border" onChange = {(e) => this.setState({date: e.target.value})}/> 
                            <input type = "number" className = "mr-2 border" placeholder = "price" onChange = {(e) => this.setState({price: e.target.value})}/> 
                            <button className = "btn" onClick = {() => this.addPrice()}> Add </button> 
                        </div> :
                        <button className = "btn" onClick = {() => this.toggleAdd()}> + Add </button> 
                    }
                </div> 
                <hr className = "my-3"/> 
                <div className = "p-3"> 
                    {this.state.message ? <p className = "text-danger"> {this.state.message} </p> : null}
                    <button className = " btn float-right" onClick = {() => this.props.closeModal()}> Close </button> 
                    <div style = {{clear: 'both'}}/> 
                </div> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    securities: state.securities 
})

export default connect(mapStateToProps)(PriceModal); 