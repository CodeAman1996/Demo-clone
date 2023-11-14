let p = new Promise((resolve,reject)=>{
    let a = 1+3;
    if(a == 2){
        resolve('success')
    }
    else{
        reject('failed')
    }
})

p.then((message)=>{
console.log('This process is a ' + message)
}).catch((error)=>{
    console.log('This process has ' + error)
});