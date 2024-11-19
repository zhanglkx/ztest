let p1 = Promise.resolve('foo');
// 若调用then()时不传处理程序，则原样向后传￼​​​​
let p2 = p1.then();
setTimeout(console.log, 0, p2);
setTimeout(console.log, 0, p2 === p1);
// Promise <resolved>: foo￼​​​​// 这些都一样￼​​


let p3 = p1.then(() => undefined);
let p4 = p1.then(() => { });
let p5 = p1.then(() => Promise.resolve());
setTimeout(console.log, 0, p3)
setTimeout(console.log, 0, p4);
setTimeout(console.log, 0, p5);

// Promise <resolved>: undefined￼​​​​setTimeout(console.log, 0, p4);   
// Promise <resolved>: undefined￼​​​​setTimeout(console.log, 0, p5);   
// Promise <resolved>: undefined​​