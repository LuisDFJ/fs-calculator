import { useState, useEffect } from "react"

// Supported Operations ordered by presedence
const VALID_OPERATORS = ["+", "-", "*", "/"] as const;
type Operator = typeof VALID_OPERATORS[number];
function isOperator(char: string): char is Operator {
  return VALID_OPERATORS.includes(char as any);
}
function getPresedence(op : Operator): number {
  return VALID_OPERATORS.indexOf(op);
}

type ASTNode = BinaryExpr | Literal;

interface BinaryExpr {
  type: 'BinaryExpr';
  op: Operator;
  left: ASTNode;
  right: ASTNode;
}

interface Literal {
  type: 'Literal';
  val: number;
}

type Tokens = Operator | number;

function toTokens( expr : string ) : Tokens[] {
  var list : string[] = [];
  const expr_list = [...expr];
  expr_list.forEach((char,idx) => {
    if (isOperator(char) || idx === 0) {
      list.push(char);
    } else if (!isOperator(expr_list[idx-1])) {
      list[list.length - 1] += char;
    } else {
      list.push(char);
    }
  })
  return list.map( (token : string) => {
    if (!isOperator(token)) {
      const res = Number(token);
      if (Number.isNaN(res)) { throw new Error("Invalid Number") }
      return res;
    }
    return token;
  });
}

function toAST( tokens : Tokens[] ) {
  var operatorStack : Operator[] = []
  var nodeStack : ASTNode[] = []

  const build_node = () => {
    const op = operatorStack.pop();
    const right = nodeStack.pop();
    const left = nodeStack.pop();
    if (!op || !left || !right) {
      throw new Error("Ivalid Expression");
    }
    nodeStack.push( {type: 'BinaryExpr', op, left, right} )
  }

  for ( const token of tokens) {
    if ( typeof token === "number" ) {
      nodeStack.push({type: 'Literal',val: token})
    } else {
      while (
        operatorStack.length > 0 &&
        getPresedence(operatorStack.at(-1)!) > getPresedence(token)
      ){
        build_node();
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) { build_node() }

  if (nodeStack.length !== 1) {
    throw new Error("Invalid Expression")
  }
  return nodeStack[0]
}

export default function Calculator() {
  const [expr,setExpr] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  useEffect(() => {
    if (loading) {
      async function fetchSolve() {
        try {
          setLoading(false);
          console.log('Parsing Expression');
          const tokens = toTokens(expr);
          const ast = toAST(tokens);
          console.log('Fetching Solver');
          const res = await fetch(
            'http://localhost:8080/solve',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(ast)
            }
          );
          if (res.ok) {
            const result = await res.json();
            const val = result['val'];
            if (val !== undefined) {
              setExpr(`${val}`)
              setError('');
            } else {
              throw new Error( 'Undefined' )
            }
          } else {
            const errText = await res.text();
            throw new Error( `Server Error (${res.status}): ${errText.trim()}` );
          }
        } catch (err) {
          if (err instanceof Error) {
            setError( err.message );
          }
        }
      }
      fetchSolve();
    }
  },[loading]);
  const handleButtonClick = (key : string) => {
    setExpr( (prev) => prev + key )
    setError('')
  }
  const handleDelete = () => {
    setExpr( (prev) => prev.slice(0,-1) )
    setError('')
  }
  const handleClear = () => {
    setExpr('')
    setError('')
  }
  const handleSolve = () => {
    setLoading(true)
  }

  return (
    <div className="calc">
      { error && <div className="calc--error">
        {error}
      </div> }
      <div className="calc--display">
        {expr || '0'}
      </div>
      <div className="calc--keypad">
        <button className="key-ctl" onClick={()=>handleDelete()}>D</button>
        <button className="key-ctl" onClick={()=>handleClear()}>AC</button>
        <button className="key-ctl" onClick={()=>handleButtonClick('')}> </button>
        <button className="key-op"  onClick={()=>handleButtonClick('/')}>/</button>

        <button className="key-num" onClick={()=>handleButtonClick('7')}>7</button>
        <button className="key-num" onClick={()=>handleButtonClick('8')}>8</button>
        <button className="key-num" onClick={()=>handleButtonClick('9')}>9</button>
        <button className="key-op"  onClick={()=>handleButtonClick('*')}>*</button>

        <button className="key-num" onClick={()=>handleButtonClick('4')}>4</button>
        <button className="key-num" onClick={()=>handleButtonClick('5')}>5</button>
        <button className="key-num" onClick={()=>handleButtonClick('6')}>6</button>
        <button className="key-op"  onClick={()=>handleButtonClick('-')}>-</button>

        <button className="key-num" onClick={()=>handleButtonClick('1')}>1</button>
        <button className="key-num" onClick={()=>handleButtonClick('2')}>2</button>
        <button className="key-num" onClick={()=>handleButtonClick('3')}>3</button>
        <button className="key-op"  onClick={()=>handleButtonClick('+')}>+</button>

        <button className="key-num" onClick={()=>handleButtonClick('')}> </button>
        <button className="key-num" onClick={()=>handleButtonClick('0')}>0</button>
        <button className="key-num" onClick={()=>handleButtonClick('.')}>.</button>
        <button className="key-op"  onClick={()=>handleSolve()}>=</button>
      </div>
    </div>
  )

}
