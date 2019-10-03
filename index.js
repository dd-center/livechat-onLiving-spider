const {getFirstContinuation,getActionAndContinuation} = require('./api');
const fs = require('fs');
const timeout =(delay)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
};

const listenLive = async (videoId)=>{
    let messages = new Map();
    let continuation = await getFirstContinuation(videoId);
    while (continuation){
        await timeout(8000);
        const res = await getActionAndContinuation(continuation);
        res.actions.forEach(action=>{
            if(action.addChatItemAction&&action.addChatItemAction.item.liveChatTextMessageRenderer){
                if(!messages.has(action.addChatItemAction.item.liveChatTextMessageRenderer.id)){
                    messages.set(action.addChatItemAction.item.liveChatTextMessageRenderer.id,{
                        id:action.addChatItemAction.item.liveChatTextMessageRenderer.id,
                        text:action.addChatItemAction.item.liveChatTextMessageRenderer.message.runs[0].text,
                        authorPhoto:action.addChatItemAction.item.liveChatTextMessageRenderer.authorPhoto.thumbnails,
                        authorName:action.addChatItemAction.item.liveChatTextMessageRenderer.authorName.simpleText,
                        timestampUsec:action.addChatItemAction.item.liveChatTextMessageRenderer.timestampUsec
                    });
                    console.log({
                        id:action.addChatItemAction.item.liveChatTextMessageRenderer.id,
                        text:action.addChatItemAction.item.liveChatTextMessageRenderer.message.runs[0].text,
                        authorPhoto:action.addChatItemAction.item.liveChatTextMessageRenderer.authorPhoto.thumbnails,
                        authorName:action.addChatItemAction.item.liveChatTextMessageRenderer.authorName.simpleText,
                        timestampUsec:action.addChatItemAction.item.liveChatTextMessageRenderer.timestampUsec
                    })
                }
            }
        })
    }
};
listenLive('EPIGSuwP1-c');