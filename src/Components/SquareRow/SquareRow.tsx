import React from "react";
import { SquareRow as ModelSquareRow } from "../../Redux/reducers/board/board-interfaces";
import "./SquareRow.scss";
import Square from "../Square/Square";

interface Props {
  row: ModelSquareRow;
}

const SquareRow = ({ row }: Props) => {
  return (
    <div className="SquareRow">
      {row.map((square) => (
        <Square content={square.content} uncoveredState={square.state} />
      ))}
    </div>
  );
};

export default SquareRow;
