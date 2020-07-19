import React from "react";
import {
  SquareState,
  SquareContent,
} from "../../Redux/reducers/board/board-interfaces";
import "./Square.scss";
import { squareWasClicked } from "../../Redux/reducers/board/events";
import { connect } from "react-redux";

interface SquareCoords {
  rowIndex: number;
  colIndex: number;
}

interface Props {
  content: SquareContent;
  uncoveredState: SquareState;
  rowIndex: number;
  colIndex: number;
  onClickSquare: (coords: SquareCoords) => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  onClickSquare: ({ rowIndex, colIndex }: SquareCoords) => {
    dispatch(
      squareWasClicked({
        iIndex: rowIndex,
        jIndex: colIndex,
      })
    );
  },
});

const Square = ({
  onClickSquare,
  content,
  uncoveredState,
  rowIndex,
  colIndex,
}: Props) => {
  return (
    <button
      type="button"
      className="Square"
      onClick={() =>
        onClickSquare({
          rowIndex,
          colIndex,
        })
      }
    >
      {uncoveredState === SquareState.Clicked ? content : ""}
    </button>
  );
};

export default connect(null, mapDispatchToProps)(Square);
