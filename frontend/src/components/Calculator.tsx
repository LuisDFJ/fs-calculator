import Display from "./Display"
import Keypad from "./Keypad"
import { useCalculator } from "../hooks/useCalculator"

export default function Calculator() {
  const calc = useCalculator();
  return (
    <div className="calc">
      <Display
        value={calc.expr}
        error={calc.error}
      />
      <Keypad
        onAppend={calc.append}
        onDelete={calc.delete}
        onClear={calc.clear}
        onSolve={calc.solve}
      />
    </div>
  )
}
