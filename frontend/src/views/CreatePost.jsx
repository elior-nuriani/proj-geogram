import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import utilService, { DEFAULT_LAT, DEFAULT_LNG } from '../services/utilService';
import { addPost } from '../actions/postActions';
import { updateUserAlertMsg } from '../actions/usersActions';
import socketService from '../services/socketService';

class CreatePost extends Component {

    state = {
        title: null,
        where: null,
        desc: null,
        about: null,
        imgs: [],
        currentCoords: {
            lat: null,
            lng: null
        }
    }

    componentDidMount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.add('wide');

        if ("geolocation" in navigator) {
            console.log("Geolocaiton Available");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.setState((prevState) => {
                        return {
                            currentCoords: {
                                ...prevState.currentCoords,
                                lat: latitude,
                                lng: longitude
                            }
                        }
                    })
                },
                (error) => {
                    console.error("Custom Error Code = " + error.code + " - " + error.message);
                }
            );
        }
        else {
            console.log("Geolocation Not Available");
        }

    }

    handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    onImgInput = (e) => {
        var reader = new FileReader();
        reader.onload = (event) => {
            this.setState((prevState) => {
                return {
                    imgs: [...prevState.imgs, event.target.result]
                }
            })
        }
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    }

    chooseImg = () => {
        document.querySelector('.file-input').click();
    }

    handleInput = (e) => {
        const { value, id } = e.target;
        this.setState({
            [id]: value
        })
    }

    handleShare = () => {
        const { title, where, desc, about, imgs, currentCoords } = this.state;
        const { loggedInUser, addPost, updateUserAlertMsg } = this.props;

        if (title && where && desc && imgs.length && loggedInUser._id) {
            //Block scope
            //Todo use goole api to get geolocation base on country / city ....

            let coords = (currentCoords.lat && currentCoords.lng) ? Object.assign({}, currentCoords) : { lat: DEFAULT_LAT, lng: DEFAULT_LNG }
            let img = imgs.slice();
            let id = loggedInUser._id;
            const post = {
                //Temporary id = Db will update to the real id
                _id: utilService.makeRndChannel(),
                title,
                where,
                desc,
                about,
                imgs,
                createdById: id,
                coords,
                likes: 0,
                city: '',
                country: '',
                comments: []
            }
            addPost(post);
            socketService.emit('addPost', post);
            utilService.setAlertMessage('Post Has Been Created!', updateUserAlertMsg)
        } else utilService.setAlertMessage('Missing Required Fields', updateUserAlertMsg)

    }



    render() {
        const elImg = (this.state.imgs.length) ?
            (<div onClick={() => { this.chooseImg() }} className="post-img-preview" style={{ backgroundImage: `url(${this.state.imgs[0]})` }} ></div>) :
            (<div onClick={() => { this.chooseImg() }} className="post-img-preview">
                <span className="flex row center">
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </div>);


        return (
            <div className="create-post-container">
                <h2>Create Post</h2>
                <form className="flex column center align-start" onSubmit={(e) => { this.handleSubmit(e) }} className="">

                    <div className="file-input-wrapper flex row center ">
                        {elImg}
                        <input className="file-input btn" type="file" name="image" onChange={(e) => { this.onImgInput(e) }} accept="video/*,image/*" capture="user" />
                    </div>

                    <div>
                        <label htmlFor="title">Choose your title : </label>
                        <input onChange={(e) => { this.handleInput(e) }} id="title" type="text" placeholder="Post title"></input>
                    </div>
                    <div>
                        <label htmlFor="where">Where is your location ? </label>
                        <input onChange={(e) => { this.handleInput(e) }} id="where" type="text" placeholder="where ?"></input>
                    </div>


                    <div>
                        <label htmlFor="desc"> Share your thought's ( Your Preview sentence ) : </label>
                        <input onChange={(e) => { this.handleInput(e) }} id="desc" type="text" placeholder="What you want to share"></input>

                    </div>
                    <div>
                        <label htmlFor="about">what everyone need to know? </label>
                        <input onChange={(e) => { this.handleInput(e) }} id="about" type="text" placeholder="*optional - tell other's more about it"></input>
                    </div>
                    <button onClick={() => { this.handleShare() }} className="btn-share-post">Share</button>

                </form>
            </div>
        )
    }
    componentWillUnmount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.remove('wide');
    }
}

const mapStateToProps = (state) => {
    const { loggedInUser } = state.user;
    return {
        loggedInUser
    }
}

const mapDispatchToProps = {
    addPost,
    updateUserAlertMsg
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)