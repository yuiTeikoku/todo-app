import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import TodoList from '../../components/todo-list';
import {addToCart} from '../../store/actions';

const withChildrenFunction = (children) => (View) => {
    return (props) => (<View {...props}>{children}</View>);
}

const productsRenderItems = (item, {userId, addToCart}) => {
	const {id, name, width, depth, height, dimUnit, description,  productPicUrl} = item;

	const addToCartClick = (item, userId) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId, product: item })
		};

		return fetch('/api/addProductToCart', requestOptions) // add to db
		.then(res => res.text())
		.then(cartItem => {
			addToCart(JSON.parse(cartItem)); // and store
		}); 
	}

	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="col-3"> 
				<img src={productPicUrl} width="100%" alt="no source" />
				<div className="d-flex justify-content-between align-items-center"> 
					<div> Поместить в корзину </div>
                    <svg 
                        className="cart-icon"
						onClick = {() => addToCartClick(item, userId)}
						viewBox="0 0 510 510"
					>
						<path 
							d="M153,408c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S181.05,408,153,408z M0,0v51h51l91.8,193.8L107.1,306
							c-2.55,7.65-5.1,17.85-5.1,25.5c0,28.05,22.95,51,51,51h306v-51H163.2c-2.55,0-5.1-2.55-5.1-5.1v-2.551l22.95-43.35h188.7
							c20.4,0,35.7-10.2,43.35-25.5L504.9,89.25c5.1-5.1,5.1-7.65,5.1-12.75c0-15.3-10.2-25.5-25.5-25.5H107.1L84.15,0H0z M408,408
							c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S436.05,408,408,408z" 
							/>
					</svg>
				</div>
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

const ProductsList = withChildrenFunction(productsRenderItems)(TodoList);

const dataAfterFilter = (filter, listData) => {
	if (listData === null)
		return null;

	let result = [...listData];
	if (filter.category.length) {
		result = result.filter(item => filter.category.find(el => el === item))
	}

	const N = filter.pagination.show;
	const i = filter.pagination.currPage;
	return result.slice(i*N, (i+1)*N);
}	

const mapStateToProps = state => ({listData: dataAfterFilter(state.filter.products, state.products), userId: state.user._id});
export default connect(mapStateToProps, {addToCart})(ProductsList);
