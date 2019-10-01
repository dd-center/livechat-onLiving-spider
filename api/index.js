const got = require('got');

const headers = {
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
};
const timeout =(delay)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
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
// (async ()=>{
//     let continuation = await getFirstContinuation('L7K8jgHou6o');
//     let actions = [];
//     while (continuation){
//         await timeout(8000)
//         const res = await getActionAndContinuation(continuation);
//         continuation = res.continuation;
//         actions=[...actions,...res.actions];
//         console.log(JSON.stringify(actions))
//         console.log(res.timeoutMs)
//     }
// })()
module.exports = {
    getFirstContinuation,
    getActionAndContinuation
};