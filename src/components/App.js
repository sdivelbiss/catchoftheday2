import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        // reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //Take a copy of existing state
        const fishes = {...this.state.fishes};
        //Add new fish to fishes const
        fishes[`fish${Date.now()}`] = fish;
        //Set new fishes object to state
        this.setState({
            fishes
        });
    };

    updateFish = (key, updatedFish) => {
        //Copy current state
        const fishes  = {...this.state.fishes}
        //Update state
        fishes[key] = updatedFish;
        //Set to state
        this.setState({
            fishes
        });
    }

    deleteFish = (key) => {
        //Copy state
        const fishes = {...this.state.fishes}
        //Remove Item from state
        fishes[key] = null;
        //Update state
        this.setState({
            fishes
        })
    }

    deleteFishFromOrder = (key) => {
        //Copy state
        const order = {...this.state.order}
        //Remove Item from state
        delete order[key]
        //Update state
        this.setState({
            order
        })
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        //Copy State
        const order = { ...this.state.order};
        //Add to order or update order 
        order[key] = order[key] + 1 || 1;
        //call setState
        this.setState({
            order
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes} deleteFishFromOrder={this.deleteFishFromOrder}/>
                <Inventory storeId={this.props.match.params.storeId} addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes}/>
            </div>
        )
    }
}

export default App;