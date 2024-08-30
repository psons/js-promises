
/**
 * from: 
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
 * """
 * Stack frames can be things other than explicit function calls, too. 
 * For example, event listeners, timeout jobs, and promise handlers all 
 * begin their own call chain. Source code within eval() and Function 
 * constructor calls also appear in the stack
 * """"
 */
function messager() {
    console.log(`Delayed message`);
}

console.log(`Immediate message`);

//console.trace(); //run with node, the trace here has 7 levels 
                 // with the top being:
                 // at Object.<anonymous> (/.../constructor-then.js:...) 
 
let myPromise = new Promise(function(myResolve, myReject) {
    // console.trace(); // adds expected 2 levels to stack, plus this line...
                        // Trace
                        //  at ... constructor-then.js:...
                        //  at new Promise (<anonymous>)
                        //  at Object.<anonymous> (constructor-then.js:28:17)

    console.log("In top of Promise constructor executor function");
    setTimeout(function() { myResolve("Delayed promised message!"); }, 3000); 
    console.log( new Error().stack );
    console.log("In bottom of Promise constructor executor function");

  });
console.log("Made a myPromise.  About to call myPromise.then(...)")
myPromise.then(
    function(value) {       // Starts a brand new stack with only 1 level
        // var stack = new Error().stack;
        // console.log( stack );
        messager(value);    // this outputs 3000ms after the "bottom of everything message"
    });

console.log("At the bottom of everything")  // but the above message prints after this line