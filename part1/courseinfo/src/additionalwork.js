// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// const App = (props) => {
//   const [ counter, setCounter ] = useState(0)

//   const setToValue = (value) => () => setCounter(value)

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button
//         onClick={setToValue(counter + 1)}
//         text='plus'
//       />
//       <Button
//         onClick={setToValue(counter - 1)}
//         text='minus'
//       />
//       <Button
//         onClick={setToValue(0)}
//         text='reset'
//       />
//     </div>
//   )
// }

// const Display = ({ counter }) => <div>{counter}</div>

// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )

// let counter = 1

// ReactDOM.render(
//   <App counter={counter} />,
//   document.getElementById('root')
// );


// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )

// const App = (props) => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAllClicks] = useState([])

//   const handleLeftClick = () => {
//     setAllClicks(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAllClicks(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       <div>
//         {left}
//         <Button onClick={handleLeftClick} text='left' />
//         <Button onClick={handleRightClick} text='right' />
//         {right}
//         <History allClicks={allClicks} />
//       </div>
//     </div>
//   )
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );