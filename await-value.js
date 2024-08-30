
function doSomthingThatTakesAWhile(fileName) {
    return new Promise(function(myResolve, myReject) {
        setTimeout(function() { myResolve("some string value"); }, 2000); // 2 seconds
      });
}

// there is no implementation in the code for myResolve above.  What happened?
let longAwaitedString = await doSomthingThatTakesAWhile();  // await requires a "thenable":
                                                            // it provides a resolve som,thing like:
                                                            // resolve(value) { return value;}
console.log(`This is a value, not a promise-> ${longAwaitedString}`);
