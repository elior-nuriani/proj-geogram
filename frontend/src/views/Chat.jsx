import React, { Component } from 'react';
import { connect } from 'react-redux'
import socketService from '../services/socketService';
import { updateUsers, showLoggedInUserProfileImg } from '../actions/usersActions';
import UnreadMsgs from '../components/UnreadMsgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-regular-svg-icons';

class Chat extends Component {
    state = {
        currUserId: null,
        user: null,
        channelName: null,
        msg: { txt: '', from: null }
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentUpdateUsers);
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.add('wide');


        const { loggedInUser, showLoggedInUserProfileImg } = this.props;

        this.setState((prevState) => {
            return {
                msg: {
                    ...prevState.msg,
                    from: loggedInUser._id
                }
            }
        })

        showLoggedInUserProfileImg(false);
    }

    componentUpdateUsers = () => {
        //Update the loggedInuser Before unmounting and refresh ! (msgs update mainly...)
        const { updateUsers, loggedInUser } = this.props;
        const user = Object.assign({}, loggedInUser);
        updateUsers(user);
    }

    setChannel = (e, currUserId, channelName) => {
        const { users } = this.props;
        const user = users.find((currUser) => {
            return currUser._id === currUserId;
        })
        this.setState({
            currUserId,
            channelName,
            user
        })
        socketService.emit('setChannel', channelName);

        //Set Active Class to preview 
        const elActive = document.querySelector('.active-chat');
        if (!elActive) e.currentTarget.classList.add('active-chat');
        else {
            elActive.classList.remove('active-chat');
            e.currentTarget.classList.add('active-chat');
        }
        if (window.innerWidth < 750) this.toggleOutputSection();

    }

    toggleOutputSection = () => {
        document.querySelector('.chat-output').classList.toggle('close')
    }

    setMsg = (e) => {
        const { value } = e.target;
        this.setState((prevState) => {
            return {
                msg: {
                    ...prevState.msg,
                    txt: value
                }
            }
        })
    }

    sendMsg = () => {
        const { msg, channelName, currUserId } = this.state;
        socketService.emit('sendNewMsg', { msg, channelName, to: currUserId });
    }

    handleSumbit = (e) => {
        e.preventDefault();
    }

    moveToProfilePage = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.history.push(`user/details/posts/${id}`)
    }


    render() {
        const { loggedInUser, users } = this.props;
        const { currUserId, msg, user, channelName } = this.state;

        //Object.keys.map Or for in loop ....
        //Object.keys Create array of id's !!!
        const elChats = (loggedInUser.chats) ? Object.keys(loggedInUser.chats).map((currUserId, idx) => {
            const { channelName } = loggedInUser.chats[currUserId];

            const msgs = loggedInUser.chats[currUserId].msgs.slice();
            const filterType = 'SINGLE';
            const user = users.find((currUser) => {
                return currUser._id === currUserId;
            })

            var elChatLastMsg;
            if (msgs.length) {
                const lastMsg = msgs[msgs.length - 1];
                const elLastMsgOrigin = (lastMsg && lastMsg.from === loggedInUser._id) ? 'you : ' : null;
                elChatLastMsg = (<div className="chat-last-msg">{elLastMsgOrigin}{lastMsg.txt}</div>)
            } else elChatLastMsg = (<div className="chat-last-msg">No Last Msgs</div>)

            return (
                <div key={idx} onClick={(e) => { this.setChannel(e, currUserId, channelName) }} className="chat-preview flex row center space-between">
                    <div key={idx} className="flex row center align-start">
                        <div className="chat-user-img btn" style={{ backgroundImage: `url(${user.imgUrl})` }} onClick={(e) => { this.moveToProfilePage(e, currUserId) }}></div>
                        <div className="chat-user-info flex column">
                            <div className="chat-userName">{user.userName}</div>
                            {elChatLastMsg}
                        </div>
                    </div>
                    <UnreadMsgs type={filterType} id={loggedInUser._id} msgs={msgs} />
                </div>
            )
        }) : null

        const elChatMsgs = (currUserId) ? loggedInUser.chats[currUserId].msgs.map((msg, idx) => {
            msg.isRead = true;

            if (msg.from === loggedInUser._id) {
                return (
                    <div key={idx} className="msg-wrapper flex row center justify-end">
                        <div className="chat-msg chat-msg-me">{msg.txt}</div>
                    </div>)
            } else {

                return (
                    <div key={idx} className="msg-wrapper flex row center justify-start">
                        <div className="chat-user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                        <div className="chat-msg">{msg.txt}</div>
                    </div>)
            }

        }) : (
                <h2 className="chat-welcome flex column center">
                    <span> Welocme to GeoChats</span>
                    <span className="msg-logo">
                        <FontAwesomeIcon icon={faComments} />
                    </span>
                    <div onClick={() => { this.toggleOutputSection() }} className="btn-goto-chats">Chats</div>
                </h2>)


        const hideClass = (channelName) ? '' : 'hide';

        return (
            <div className="chat-container flex row">
                <div className="chat-list">
                    <div className="header flex row center justify-start">
                        <h3>GeoChats</h3>
                    </div>
                    <div className="input-wrapper">
                        <input className="search" type="text" placeholder="Search..."></input>
                    </div>
                    <div>
                        {elChats}
                    </div>
                </div>
                <div className="chat-output flex column ">
                    <div className="header"></div>
                    <div className="chat-msg-container flex column">
                        {elChatMsgs}
                    </div>
                    <form className={`flex row center space-evenly ${hideClass}`} onSubmit={(e) => { this.handleSumbit(e) }}>
                        <input placeholder="Type your Message" value={msg.txt} onChange={(e) => { this.setMsg(e) }} type="text" />
                        <button className="btn send-message flex row center" onClick={() => { this.sendMsg() }}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        const { showLoggedInUserProfileImg } = this.props;
        this.componentUpdateUsers();
        window.removeEventListener('beforeunload', this.componentUpdateUsers);


        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.remove('wide');

        showLoggedInUserProfileImg(true)
    }
}


const mapStateToProps = (state) => {
    const { loggedInUser, users } = state.user;
    return {
        loggedInUser,
        users
    }
}

const mapDispatchToProps = {
    updateUsers,
    showLoggedInUserProfileImg
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)