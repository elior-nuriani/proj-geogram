import React, { Component } from 'react';
import mockupMain from '../styles/imgs/appMockupMain.png'
import mockupSecond from '../styles/imgs/appMockup2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import userService from '../services/userService';
import utilService from '../services/utilService';
import { connect } from 'react-redux';
import { updateUserAlertMsg } from '../actions/usersActions';


class Signup extends Component {
    state = {
        userCred: {
            userName: null,
            password: null,
            firstName: null,
            lastName: null,
            about: ''
        }
    }

    componentDidMount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.add('wide');
    }

    handleInputChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => {
            return {
                userCred: {
                    ...prevState.userCred,
                    [id]: value
                }
            }
        })
    }

    moveToLogin = () => {
        const { history } = this.props;
        history.push('/');
    }

    doSignup = async () => {
        const { updateUserAlertMsg } = this.props;
        const { userName, password, firstName, lastName } = this.state.userCred;
        const { userCred } = this.state;
        if (userName && password && firstName && lastName) {
            await userService.signup(userCred);
            utilService.setAlertMessage('Successfully Signup', updateUserAlertMsg);
        } else utilService.setAlertMessage('Require Missing Fields', updateUserAlertMsg);

    }

    render() {
        const { loggedInUser } = this.props;
        const elLogg = (loggedInUser) ? loggedInUser.userName : null
        return (
            <div className="signup-container flex row center">
                <div className="mockups-container" >
                    <img src={mockupMain} alt="" className="mockup-main" />
                    <img src={mockupSecond} alt="" className="mockup-second" />
                </div>
                <div className="form-container flex column center justify-start">
                    <div className="form-wrapper flex column center">
                        <div className="signup-header-msg"></div>
                        <h2 className="signup-title flex row center">Geogram <span>.</span></h2>
                        <h4 className="signup-msg">Sign up to see photos and videos from your friends.</h4>
                        <form className="flex column center">
                            <input onChange={(e) => { this.handleInputChange(e) }} id="userName" placeholder="Username, Nickname" type="text"></input>
                            <input onChange={(e) => { this.handleInputChange(e) }} id="password" placeholder="Password" type="password"></input>
                            <input onChange={(e) => { this.handleInputChange(e) }} id="firstName" placeholder="First Name" type="text"></input>
                            <input onChange={(e) => { this.handleInputChange(e) }} id="lastName" placeholder="Last Name" type="text"></input>
                            <input onChange={(e) => { this.handleInputChange(e) }} className="textarea" id="about" placeholder="* What is your Motto?"></input>

                            <div className="btn-signup btn" onClick={() => { this.doSignup() }} type="button" value="send">Signup</div>
                        </form>
                        <div className="alternative-box flex column center">
                            <div className="line"> </div>
                            <div className="line-title">OR</div>
                        </div>
                        <div className="signup-facebook flex row center btn">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            <span>Signup with Facebook</span>
                        </div>
                        <span className="signup-terms">By signing up, you agree to our Terms , Data Policy and Cookies Policy </span>

                    </div>
                    <div className="signup-more flex column center">
                        <div>Have an Account ?
                            <span onClick={() => { this.moveToLogin() }} className="btn">Log In</span>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    componentWillUnmount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.remove('wide');
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    updateUserAlertMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
