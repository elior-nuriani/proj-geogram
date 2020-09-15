import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSortBy } from '../actions/postActions';

class Sort extends Component {

    setFilter = (e) => {
        const value = e.target.id;
        this.props.changeSortBy(value);
        document.querySelector('.sortBy-active').classList.remove('sortBy-active');
        e.currentTarget.classList.add('sortBy-active');
    }

    render() {
        return (
            <div className="sort-container flex row">
                <div id="popular" className="btn sortBy-active" onClick={(e) => { this.setFilter(e) }}>Popular</div>
                <div id="random" className="btn" onClick={(e) => { this.setFilter(e) }}>Random</div>
            </div>
        )
    }

    componentWillUnmount() {
        //Reset sortBy
        this.props.changeSortBy('popular')
    }
}

const mapStateToProps = (state) => {
    const { sortBy } = state.post;
    return {
        sortBy
    }
}

const mapDispatchToProps = {
    changeSortBy
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
