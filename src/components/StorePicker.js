import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object
    }
    goToStore = (e) => {
        //Stop form from submitting
        e.preventDefault();
        //Get text from input
        console.log(this.myInput.value.value);
        //Update page
        this.props.history.push(`/store/${this.myInput.value.value}`)

    }
    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    required 
                    ref={this.myInput}
                    placeholder="Store Name" 
                    defaultValue={getFunName()} 
                    />
                <button type="submit">Visition Store --></button>
            </form>
        )
    }
}

export default StorePicker;