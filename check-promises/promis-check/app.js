const userLeft = false
const userWatchingCatMeme = true

function watchTutorialPromise() {
    return new Promise((resolve,reject)=>{
    if (userLeft) {
        reject({
    name: 'User Left',
    message : ':('
   })
}
   else if(userWatchingCatMeme) {
    reject({
      name:'User watching cat meme',
      message : 'webDevsimplified < cat'
    })
   
    }
    else {
        resolve('Thumbs up and subscribe')
    }
    })
}

watchTutorialPromise().then((message)=>{
console.log('success ' + message)
}).catch((error)=>{
    console.log(error.name+ '' +error.message)
})