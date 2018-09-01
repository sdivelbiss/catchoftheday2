import React from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    static propTypes= {
        deleteFishFromOrder: PropTypes.func,
        order: PropTypes.object,
        fishes: PropTypes.object
    }
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available'
        if(!fish) return null; //make sure data is loaded before we continue
        if(!isAvailable){
            return (
                <li key={key}>
                    Sorry {fish ? fish.name : 'fish'} is no longer available
                </li>
            )
        }
        return ( 
            <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}} >
                <li key={key}>
                     <span>
                     <TransitionGroup component="span" className="count">
                        <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                            <span> {count} </span>
                        </CSSTransition>
                    </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(fish.price)}
                        <button onClick={() => this.props.deleteFishFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }
    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if(isAvailable){
                return prevTotal + (count * fish.price)
            }
            return prevTotal;
        }, 0);
        return (
                <div className="order-wrap">
                   <h2> Order </h2>
                   <TransitionGroup component="ul" className="order">
                        {orderIds.map(this.renderOrder)}
                   </TransitionGroup>
                   <div className="total">
                        <strong>{formatPrice(total)}</strong>
                    </div>
                </div>
            )
    }
}

export default Order