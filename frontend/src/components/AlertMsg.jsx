import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import utilService from '../services/utilService';

function AlertMsg({ userAlertMsg }) {

    function closeAlertMsg(){
        utilService._toggleAlertMsg();
    }

    if (!userAlertMsg) userAlertMsg = "Action Is Not Allowed"
    return (<div className="alert-box flex row center space-between ">
        <div className="flex row center">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="alert-content">
                {userAlertMsg}
            </span>
        </div>
        <span onClick={() => {closeAlertMsg()}} className="btn-close flex row center btn">
            <FontAwesomeIcon icon={faTimes} />
        </span>
    </div>)
}


const mapStateToProps = (state) => {
    const { userAlertMsg } = state.user;
    return {
        userAlertMsg
    }
}


export default connect(mapStateToProps)(AlertMsg)