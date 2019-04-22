import React, {Component} from 'react'; 
import { connect } from 'react-redux';

const countries = [
    "--Choose--",
    "Finland", 
    "France", 
    "Germany",
    "Iceland",
    "Norway", 
    "Russia", 
    "Uganda", 
    "United Kingdom",
    "United States", 
]

class SecModal extends Component {
    state = {
        country: '', 
        isin: '', 
        message: null,
        name: ''
    }

    // Load the input fields with the security data if in edit mode 
    componentWillMount() {
        if (this.props.mode === 'edit') {
            let {name, isin, country} = this.props.securities[this.props.index]; 
            this.setState({name, isin, country}); 
        }
    }

    // Dispatch the delete security action and close the modal out 
    delete = () => {
        this.props.dispatch({type: "DELETESECURITY", data: {index: this.props.index}});
        this.props.closeModal(); 
    }

    // Save a new security, or save an edited version of an existing one 
    save = async () => {
        let {name, isin, country} = this.state; 
        if (name === "" || isin === "" || country === "--Choose--" || country === "") {
            await this.setState({message: 'All fields must be completed!'}); 
            return; 
        }
        if (this.props.mode === 'edit') {
            this.props.dispatch({
                type: "EDITSECURITY", 
                data: {index: this.props.index, edited: {name, isin, country}}
            })
        }
        else {
            this.props.dispatch({
                type: "ADDSECURITY", 
                data: {security: {name, isin, country, prices: []}}
            })
        }
        this.props.closeModal(); 
    }
   
    render() {
        const data = this.props.securities[this.props.index]; 
        return (
            <div> 
                <div className = "p-2"> 
                    <h5> {this.props.mode === 'edit' ? `Edit Security: ${data.name}` : "Add Security"} </h5> 
                    <div className = "row mb-3 mt-3 p-0"> 
                        <div className = "col-5 m-0"> 
                            <label> Name </label> 
                            <input className = "border" value = {this.state.name} onChange = {(e) => this.setState({name: e.target.value})}/> 
                        </div> 
                        <div className = "col-2"/>
                        <div className = "col-5 m-0"> 
                            <label style = {{display: 'block'}}> ISIN </label> 
                            <input className = "border" value = {this.state.isin} onChange = {(e) => this.setState({isin: e.target.value})}/> 
                        </div> 
                    </div> 
                    <label style = {{display: 'block'}}> Country </label> 
                    <select className = "border" onChange = {(e) => this.setState({country: e.target.value})} value = {this.state.country}> 
                        {countries.map((country, key) => (
                            <option key = {key}> {country} </option> 
                        ))}
                    </select> 
                </div> 
                <hr className = "my-2"/> 
                {this.state.message ? <p className = "text-danger ml-3"> {this.state.message} </p> : null}
                <div className = "p-2"> 
                    {this.props.mode === 'edit' ? 
                        <button className = "float-left btn" onClick = {() => this.delete()}> Delete </button> : null 
                    }
                    <button className = "float-right btn ml-3" onClick = {() => this.save()}> Save </button> 
                    <button className = "float-right btn" onClick = {() => this.props.closeModal()}> Cancel </button> 
                    <div style = {{clear: 'both'}}/> 
                </div> 
            </div> 
        )
    }
}

const mapStateToProps = (state) => ({
    securities: state.securities
})

export default connect(mapStateToProps)(SecModal); 