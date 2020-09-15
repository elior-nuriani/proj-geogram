import React from 'react';
import { Switch } from 'react-router-dom';

export default function UnreadMsgs({ type, id, msgs }) {
    //COUNT ONLY 1 CHAT MSGS
    if (type === 'SINGLE') {
        const unreadMsgs = msgs.filter((msg) => {
            return (!msg.isRead);
        })
        return (unreadMsgs.length) ? (<div className="unreadMsgs-single">
            {unreadMsgs.length}
        </div>) : null;

        //COUNT ALL THE UNREAD MSGS FROM ALL THE CHATS AVAILABLE
    } else if (type === 'MULTI') {
        const filteredMsgs = msgs.filter((msg) => {
            return (msg.from !== id && !msg.isRead)
        })
        return (<div className="unread-msgs-icon-float">{filteredMsgs.length}</div>)

    }
}