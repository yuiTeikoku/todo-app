import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import TodoList from '../../components/todo-list';

const withChildrenFunction = (children) => (View) => {
    return (props) => (<View {...props}>{children}</View>);
}

const productsRenderItems = (item) => {
	const {id, name, width, depth, height, dimUnit, description,  productPicUrl} = item;

	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="col-3"> 
				<img src={productPicUrl} width="100%" alt="no source" />
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

const mapStateToProps = state => ({listData: state.cart});
export default connect(mapStateToProps)(CartList);
