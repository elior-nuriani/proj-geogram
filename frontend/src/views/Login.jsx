import React, { Component } from 'react';
import userService from '../services/userService';
import { connect } from 'react-redux';
import { setLoggedInUser, updateUserAlertMsg } from '../actions/usersActions';
import socketService from '../services/socketService';
import utilService from '../services/utilService';
import mockupMain from '../styles/imgs/appMockupMain.png';
import mockupSecond from '../styles/imgs/appMockup2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';



class Login extends Component {
    state = {
        userCred: {
            userName: null,
            password: null
        }
    }
    componentDidMount() {
        const { loggedInUser } = this.props
        if (loggedInUser) this.props.history.push('/feed')
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.add('wide');
    }

    moveToSignup = () => {
        const { history } = this.props;
        history.push('/signup')
    }

    handleInputChange = (e) => {
        const { value, id } = e.target;
        this.setState((prevState) => {
            return {
                userCred: {
                    ...prevState.userCred,
                    [id]: value
                }
            }
        })
    }
    handleSubmit = async () => {
        //Shallow Copy -- Can Be Done at usersActions ...
        const { setLoggedInUser, updateUserAlertMsg } = this.props;
        const userCred = Object.assign({}, this.state.userCred);
        const loggedInUser = await userService.login(userCred);
        if (loggedInUser) {
            await setLoggedInUser(loggedInUser);

            const { userName, _id } = loggedInUser;
            socketService.emit('setUserNameToSocket', { userName, id: _id })

            this.props.history.push('/feed')
        } else {
            utilService.setAlertMessage('Username and Password are Invalid', updateUserAlertMsg);
        }
    }

    render() {
        const { loggedInUser } = this.props;
        const elLogg = (loggedInUser) ? loggedInUser.userName : null
        return (
            <div className="login-container flex row center">
                <div className="mockups-container" >
                    <img src={mockupMain} alt="" className="mockup-main" />
                    <img src={mockupSecond} alt="" className="mockup-second" />
                </div>
                <div className="form-container flex column center justify-start">
                    <div className="form-wrapper flex column center">
                        <div className="login-header-msg"></div>
                        <h2 className="login-title flex row center">Geogram <span>.</span></h2>
                        <form className="flex column center">
                            {/* <div> */}
                            {/* <span>Username : </span> */}
                            <input id="userName" placeholder="Username, Nickname" onChange={(e) => { this.handleInputChange(e) }} type="text"></input>
                            {/* </div> */}

                            {/* <div> */}
                            {/* <span>Password : </span> */}
                            <input id="password" placeholder="Password" onChange={(e) => { this.handleInputChange(e) }} type="password"></input>
                            {/* </div> */}
                            <div className="btn-login btn" onClick={this.handleSubmit} type="button" value="send">Log In</div>
                        </form>
                        <div className="alternative-box flex column center">
                            <div className="line"> </div>
                            <div className="line-title">OR</div>
                        </div>
                        <div className="login-facebook flex row center btn">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            <span>Log In with Facebook</span>
                        </div>
                        <span className="forgot-btn btn">Forgot Password ?</span>

                    </div>
                    <div className="login-more flex column center">
                        <div>Don't Have and account ?
                        <span className="btn" onClick={() => { this.moveToSignup() }}>Sign up</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.remove('wide');
    }
}

const mapStateToProps = (state) => {
    const { loggedInUser } = state.user
    return {
        loggedInUser
    }
}

const mapDispatchToProps = {
    setLoggedInUser,
    updateUserAlertMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)





// (
//     <div className="login-container flex row">
//         <div className="aside-img" style={{ backgroundImage: `linear-gradient(to bottom, var(--image-layer-primary-login),var(--image-layer-second-login)), url(https://images.pexels.com/photos/1749855/pexels-photo-1749855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}>
//         </div>
//         <div className="form-wrapper flex column justify-start">
//             <h2 className="login-title">Geogram .</h2>
//             <form className="flex column">
//                 {/* <div> */}
//                 {/* <span>Username : </span> */}
//                 <input id="userName" placeholder="Username, Nickname" onChange={(e) => { this.handleInputChange(e) }} type="text"></input>
//                 {/* </div> */}

//                 {/* <div> */}
//                 {/* <span>Password : </span> */}
//                 <input id="password" placeholder="Password" onChange={(e) => { this.handleInputChange(e) }} type="password"></input>
//                 {/* </div> */}
//                 <div className="btn-login btn" onClick={this.handleSubmit} type="button" value="send">Log In</div>
//             </form>
//             <div className="login-more flex column center">
//                 <span>Forgot Password ?</span>
//                 <div>Don't Have and account ?
//                     <span className="btn">Sign up</span> </div>
//             </div>
//         </div>
//     </div>
// )