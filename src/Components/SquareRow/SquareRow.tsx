import React from "react";
import { SquareRow as ModelSquareRow } from "../../Redux/reducers/board/board-interfaces";
import "./SquareRow.scss";
import Square from "../Square/Square";

interface Props {
  row: ModelSquareRow;
  rowIndex: number;
}

const SquareRow = ({ row, rowIndex }: Props) => {
  return (
    <div className="SquareRow">
      {row.map((square, index) => (
        <Square
          key={index}
          content={square.content}
          uncoveredState={square.state}
          minesAround={square.surroundingBombs}
          rowIndex={rowIndex}
          colIndex={index}
        />
      ))}
    </div>
  );
};

export default SquareRow;
