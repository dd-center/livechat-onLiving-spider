const {getFirstContinuation,getActionAndContinuation} = require('api');
const timeout =(delay)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
};

const listenLive = async (videoId)=>{
    let continuation = getFirstContinuation(videoId);
    while (continuation){
        await timeout(8000);
        const res = getActionAndContinuation(continuation);
        console.log(res.timeoutMs);
    }
};
listenLive('EPIGSuwP1-c');