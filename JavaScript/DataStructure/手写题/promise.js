class Promise1 {
  constructor(iterator) {

  }

  init(){
    this.state = 'pending';
    this.result = null;
  }

  then(){
    if (this.state !== 'pending')return;

    this.state; 
    
  }

  resovle(value){
    if (this.state !== 'pending')return;
    this.state = 'fulfilled';
    this.result = value instanceof Function ? value() : value;
  }


  reject(value){
    if (this.state !== 'pending')return;
    this.state = 'rejected';
    this.result = value instanceof Function ? value() : value;
  }

}
