import React, { useState } from 'react';
import StoryTop from './StoryTop';
import StoryBottom from './StoryBottom';

export default function StoriesPlayer({ user, exitStoryPlayer }) {
    const [currIdx, setCurrIdx] = useState(0);
    const IMAGE_EXTENSIONS = '.jpg|.jpeg|.png|.gif';
    const storiesLength = (user.storiesUrl) ? user.storiesUrl.length : 0;

    function setIndex(storiesLength, factor) {
        if (currIdx + factor >= storiesLength || currIdx + factor < 0) {
            handleExitStory();
        } else setCurrIdx(currIdx + factor);
    }

    function handleExitStory() {
        setCurrIdx(0);
        exitStoryPlayer();
    }

    function handleStoryClicked(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    const stories = (user.storiesUrl) ? user.storiesUrl.map((story, idx) => {
        // const isCurrentStory = (currIdx === idx) ? 'current-story' : '';
        // const isNextStory = (currIdx + 1 === idx) ? 'next-story' : '';
        // const isPrevStory = (currIdx - 1 === idx) ? 'prev-story' : '';
        // const storyClass = isCurrentStory || isNextStory || isPrevStory;
        const storyClass = (currIdx === idx) ? 'current-story' : (currIdx + 1 === idx) ? 'next-story' : (currIdx - 1 === idx) ? 'prev-story' : '';

        //IMAGE OR VIDEO 
        const regex = new RegExp(`${IMAGE_EXTENSIONS}}`, "ig");

        const elStoryType = (regex.test(story.file)) ? (<div onClick={(e) => { handleStoryClicked(e) }} key={idx} className={`story ${storyClass}`} style={{ backgroundImage: `url(${story.file})` }} id={`story-${idx}`} data-story-idx={idx}>
            <StoryTop user={user} handleExitStory={handleExitStory} txt={story.txt} />
            <StoryBottom where={story.where} likes={story.likes} />
            <div onClick={() => { setIndex(storiesLength, -1) }} className="left-side"></div>
            <div onClick={() => { setIndex(storiesLength, 1) }} className="right-side"></div>
        </div>) : (
                <div onClick={(e) => { handleStoryClicked(e) }} key={idx} className={`story ${storyClass} video`} id={`story-${idx}`} data-story-idx={idx}>
                    <video muted autoPlay loop>
                        <source src={`${process.env.CLOUD_PATH}/${story.file}`}></source>
                    </video>
                    <StoryTop user={user} handleExitStory={handleExitStory} txt={story.txt} />
                    <StoryBottom where={story.where} likes={story.likes} />

                    <div onClick={() => { setIndex(storiesLength, -1) }} className="left-side"></div>
                    <div onClick={() => { setIndex(storiesLength, 1) }} className="right-side"></div>
                </div>
            )
        return (elStoryType)
    }) : null;

    return (
        <div onClick={() => { handleExitStory() }} className="stories-container">
            <div className="stories-wrapper">
                <div className="stories-list">
                    {stories}
                </div>
            </div>
        </div>
    )
}