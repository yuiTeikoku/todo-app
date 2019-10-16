import React from 'react';

const toListItems = (arr, decorator, otherProps) => arr.map(item => {
    const innerContent = decorator(item, otherProps);
    return <li className="list-group-item" key={item._id}> {innerContent} </li>
});

const TodoList = (props) => {
    const {listData, children: decorator, ...otherProps} = props;

    if (!listData)
        return (<div>Loading...</div>);

    return (
        <ul className="list-group">
            {toListItems(listData, decorator, otherProps)}
        </ul>
    )
}

export default TodoList;