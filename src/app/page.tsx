'use client'
import { useState ,useEffect} from "react";


export default function Home() {



  const [clickedCells, setClickedCells] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);


 


  const handleCellClick = (rowIndex: number, colIndex: number, cellValue: number | string) => {
    if (isGameOver) return;
    const cellKey = `${rowIndex}-${colIndex}`;
    if (!clickedCells.includes(cellKey)) {
      setClickedCells((prev) => [...prev, cellKey]);
      if (typeof cellValue === "number") {
        setPoints((prevPoints) => prevPoints + cellValue);
      }
      else if(cellValue === "bomb"){
        setMessage("Przegrałeś");
        setIsGameOver(true)
      }
    }
  
  };

  const numberList = [
    [12, 5, 9, 'bomb', 20],
    ['bomb', 5, 9, 'bomb', 20],
    [12, 7, 19, 9, 10],
    [7, 9, 12, 'bomb', 'bomb'],
  ];

  

  useEffect(() => {
    if (points > 100) {
      setMessage("Wygrałeś");
      setIsGameOver(true)
      return;
    }
 
  },[points])
  
  return (
    <div className="flex justify-center items-center flex-col text-center">
      <h2>Saper</h2>

      <table className="border-collapse">
        <tbody> 
          {numberList.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const isClicked = clickedCells.includes(cellKey);

                return (
                  <td
                    key={colIndex}
                    className={`border-2 border-black cursor-pointer ${
                      isClicked ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex,cell)}
                   
                  >
                    <div >{cell === 'bomb' ? '💣' : cell}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p>Punkty: <span id="points">{points}</span></p>

      <p id="message" className={`${message ? 'py-4 px-8 border-2 border-red-500 mt-8': ''}`}>{message ? message +'😊' : message}</p>
    </div>
  );
}
