import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';

class EditFishForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    }
    
    handleChange = (event) => {
        //Update fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value,

        };
        this.props.updateFish(this.props.index, updatedFish)
    }
    render(){
        return (
                <div className="fish-edit">
                    <input name="name" onChange={this.handleChange} value={this.props.fish.name} type="text" placeholder="Name" />
                    <input name="price" onChange={this.handleChange} value={this.props.fish.price}  type="text" placeholder="Price" />
                    <select name="status" onChange={this.handleChange} value={this.props.fish.status} placeholder="Status" >
                        <option value="available">Fresh!</option>
                        <option value="unavailable">Sold out</option>
                    </select>
                    <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} placeholder="Description" />
                    <input name="image" onChange={this.handleChange} value={this.props.fish.image}  type="text" placeholder="Image" />
                    <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
                </div>
            )
    }
}

export default EditFishForm;