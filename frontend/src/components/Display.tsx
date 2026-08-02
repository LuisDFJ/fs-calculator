interface Props {
  value : string;
  error : string;
}

export default function Display({value, error}: Props) {
  return (
    <>
      { error && (
        <div className="calc--error">
          {error}
        </div> 
      )}
      <div className="calc--display">
        {value || '0'}
      </div>
    </>
  )
}
