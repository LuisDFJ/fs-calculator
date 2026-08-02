interface Props {
  onAppend(key:string):void,
  onDelete():void,
  onClear():void,
  onSolve():void,
}

export default function Keypad({onAppend,onDelete,onClear,onSolve} : Props) {
  return (
    <div className="calc--keypad">
      <button className="key-ctl" onClick={()=>onDelete()}>D</button>
      <button className="key-ctl" onClick={()=>onClear()}>AC</button>
      <button className="key-ctl" onClick={()=>onAppend('')}> </button>
      <button className="key-op"  onClick={()=>onAppend('/')}>/</button>

      <button className="key-num" onClick={()=>onAppend('7')}>7</button>
      <button className="key-num" onClick={()=>onAppend('8')}>8</button>
      <button className="key-num" onClick={()=>onAppend('9')}>9</button>
      <button className="key-op"  onClick={()=>onAppend('*')}>*</button>

      <button className="key-num" onClick={()=>onAppend('4')}>4</button>
      <button className="key-num" onClick={()=>onAppend('5')}>5</button>
      <button className="key-num" onClick={()=>onAppend('6')}>6</button>
      <button className="key-op"  onClick={()=>onAppend('-')}>-</button>

      <button className="key-num" onClick={()=>onAppend('1')}>1</button>
      <button className="key-num" onClick={()=>onAppend('2')}>2</button>
      <button className="key-num" onClick={()=>onAppend('3')}>3</button>
      <button className="key-op"  onClick={()=>onAppend('+')}>+</button>

      <button className="key-num" onClick={()=>onAppend('')}> </button>
      <button className="key-num" onClick={()=>onAppend('0')}>0</button>
      <button className="key-num" onClick={()=>onAppend('.')}>.</button>
      <button className="key-op"  onClick={()=>onSolve()}>=</button>
    </div>
  )
}
