import React from 'react';
import { connect } from 'react-redux';

const toListItems = arr => arr.map(item => (
    <li className="list-group-item" key={item.id}> {item.name} </li>
));

const TodoList = (props) => {
    const {listData} = props;

    if (!listData)
        return ( <div>Loading...</div> );

    return (
        <ul className="list-group">
            {toListItems(listData)}
        </ul>
    )
}

const mapStateToProps = state => ({listData: state.products});
export default connect(mapStateToProps)(TodoList);