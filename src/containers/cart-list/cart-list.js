import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import TodoList from '../../components/todo-list';
import {removeFromCart} from '../../store/actions';

const withChildrenFunction = (children) => (View) => {
    return (props) => (<View {...props}>{children}</View>);
}

const productsRenderItems = (item, {userId, removeFromCart}) => {
	const {id, name, width, depth, height, dimUnit, description,  productPicUrl} = item.product;

	const removeFromCartClick = (userId, itemId) => {
		removeFromCart(itemId);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId, itemId })
		};

		return fetch('/api/removeProductFromCart', requestOptions)
		.then(res => res.text())
		.then(message => console.log(message))
		.catch(err => console.error(err));
	}

	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="col-3"> 
				<img src={productPicUrl} width="100%" alt="no source" />
				<button 
					onClick={() => removeFromCartClick(userId, item._id)}
				>
					Delete
				</button>
			</div>
			<div className="col-9 prod-main"> 
				<div className="todo-list-item"> 
					<Link className="" to={"/products/" + id}> Модель: {name} </Link>
				</div>
				<hr />
				<div> <p> {description} </p> </div>

				<div> Ширина: {width} {dimUnit} </div>
				<div> Высота: {height} {dimUnit} </div>
				<div> Глубина: {depth} {dimUnit} </div>
			</div>
		</div>
	);
};

const CartList = withChildrenFunction(productsRenderItems)(TodoList);

const mapStateToProps = state => ({listData: state.cart, userId: state.user._id});
export default connect(mapStateToProps, {removeFromCart})(CartList);
