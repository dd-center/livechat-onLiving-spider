const got = require('got');

const headers = {
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
};
const getFirstContinuation = async (videoId)=>{
    const res = (await got('https://www.youtube.com/watch?v='+videoId,{
        headers
    })).body;
    try {
        return res.match(/"reloadContinuationData":{"continuation":".*?"/)[0].split('\"')[5];
    }catch (e) {
        console.log(e);
        return null;
    }
};
const getActionAndContinuation = async (loadContinuation)=>{
    const res = JSON.parse((await got('https://www.youtube.com/live_chat?continuation='+loadContinuation+'&hidden=false&pbj=1',{headers})).body);
    const continuation = res[1].response.continuationContents.liveChatContinuation.continuations[0].timedContinuationData.continuation;
    const actions = res[1].response.continuationContents.liveChatContinuation.actions;
    const timeoutMs = res[1].response.continuationContents.liveChatContinuation.continuations[0].timedContinuationData.timeoutMs;
    return {
        continuation,
        actions,
        timeoutMs
    }
};
module.exports = {
    getFirstContinuation,
    getActionAndContinuation
};