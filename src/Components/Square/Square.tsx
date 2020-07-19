import React from "react";
import {
  SquareState,
  SquareContent,
} from "../../Redux/reducers/board/board-interfaces";
import "./Square.scss";

interface Props {
  content: SquareContent;
  uncoveredState: SquareState;
}

const Square = ({ content, uncoveredState }: Props) => {
  return (
    <button type="button" className="Square">
      {uncoveredState === SquareState.Clicked ? content : ""}
    </button>
  );
};

export default Square;
