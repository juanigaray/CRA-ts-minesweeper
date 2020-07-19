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

const getThingToShow = ({
  content,
  uncoveredState,
}: {
  content: SquareContent;
  uncoveredState: SquareState;
}): string => {
  if (uncoveredState === SquareState.Flagged) return "F";
  if (uncoveredState === SquareState.Unclicked) return "";
  if (uncoveredState === SquareState.Clicked) {
    if (content === SquareContent.Nothing) return "";
    if (content === SquareContent.Mine) return "*";
  }
  return "";
};

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
      disabled={
        uncoveredState === SquareState.Flagged ||
        uncoveredState === SquareState.Clicked
      }
      onClick={() =>
        onClickSquare({
          rowIndex,
          colIndex,
        })
      }
    >
      {getThingToShow({ content, uncoveredState })}
    </button>
  );
};

export default connect(null, mapDispatchToProps)(Square);
