// import React, {useRef} from 'react'

// export default function FormWithRefHook () {
//   const inputRef = useRef()
//   const textcontent = useRef()

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     console.log(inputRef.current);
//     console.log(inputRef.current);
//     console.log(inputRef.current);
//     console.log(textcontent.current);
//   }

//   return(
//     <form>
//        <input type="text" ref={textcontent} />
//       <div ref={inputRef}>hei</div>
//       <div ref={inputRef}>hola</div>
//       <div ref={inputRef}>hallow</div>
//       <input type="submit" value="Submit" onClick={handleSubmit}/>
//     </form>
//   )
// }










import React, { useRef, useEffect } from 'react';

const words = ['Many', 'Words', 'hei', 'say', 'bye'];

export const App = () => {
  const wordsRef = useRef([]);

  const displayWords = words.map((word, i) => {
     return (
      <React.Fragment key={i}>
        <span ref={el => {
           // console.log(el)
           console.log(wordsRef.current)
           // console.log((wordsRef.current = [...wordsRef.current, el]))
           return (wordsRef.current = wordsRef.current.concat(el))}
        }>
          {word}
        </span>
      </React.Fragment>
    )
  });

  useEffect(() => {
//     console.log(wordsRef);
//     console.log(wordsRef.current);
});

  return <div>{displayWords}</div>;
};
















