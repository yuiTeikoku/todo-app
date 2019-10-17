import React from 'react';
import {connect} from 'react-redux';
import {changeCurrPageAtTarget} from '../../store/actions';

const Pagination = ({targetFilter, currState, changeCurrPageAtTarget}) => {
    if (currState[targetFilter] === null)
        return <div></div>;

    const pageOption = currState.filter[targetFilter].pagination;
    const i = pageOption.currPage;
    const N = pageOption.show;   
    const dataLength = currState[targetFilter].length;
    const maxPages = parseInt(dataLength / N) + 1;

    const navItems = (currPage, maxPages, targetFilter, changeCurrPageAtTarget) => {
        let list = [];
        for (let i = 0; i < maxPages; i++) {
            list.push(
                <li 
                    key={i} 
                    className={ i === currPage ? "page-item active" : "page-item" }
                    onClick={() => changeCurrPageAtTarget(targetFilter, i)}
                > 
                    <span className="page-link"> {i+1} </span>    
                </li>
            )
        }            
        return list;
    }

    return (
        <div className="card pagination-main">
            <div className="card-body">
                <h5 className="card-title">Pagination</h5>
                <nav>
                    <ul className="pagination">
                    {
                        navItems(i, maxPages, targetFilter, changeCurrPageAtTarget)
                    }
                    </ul>
                </nav>
            </div>
        </div>        
    );
}
    

const mapStateToProps = state => ({currState: state});
export default connect(mapStateToProps, {changeCurrPageAtTarget})(Pagination);
