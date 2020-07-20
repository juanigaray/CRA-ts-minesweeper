import React from "react";
import {
  SquareState,
  SquareContent,
} from "../../Redux/reducers/board/board-interfaces";
import "./Square.scss";
import { squareWasClicked } from "../../Redux/reducers/board/events";
import { connect } from "react-redux";
import { AppState } from "../../Redux/AppState";
import { selectors } from "../../Redux/reducers/board/board";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

interface SquareCoords {
  rowIndex: number;
  colIndex: number;
}

interface OwnProps {
  content: SquareContent;
  uncoveredState: SquareState;
  rowIndex: number;
  colIndex: number;
}

interface DispatchProps {
  onClickSquare: (coords: SquareCoords) => void;
}

interface StateProps {
  minesAroundSquare: number;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
): DispatchProps => ({
  onClickSquare: ({ rowIndex, colIndex }: SquareCoords): void => {
    dispatch(
      squareWasClicked({
        iIndex: rowIndex,
        jIndex: colIndex,
      })
    );
  },
});

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  minesAroundSquare: selectors.minesAroundSquare(state)({
    iIndex: ownProps.rowIndex,
    jIndex: ownProps.colIndex,
  }),
});

const getThingToShow = ({
  content,
  uncoveredState,
  minesAroundSquare,
}: {
  content: SquareContent;
  uncoveredState: SquareState;
  minesAroundSquare: number;
}): string => {
  if (uncoveredState === SquareState.Flagged) return "F";
  if (uncoveredState === SquareState.Unclicked) return "";
  if (uncoveredState === SquareState.Clicked) {
    if (content === SquareContent.Nothing) return String(minesAroundSquare);
    if (content === SquareContent.Mine) return "*";
  }
  return "";
};

type Props = OwnProps & DispatchProps & StateProps;

const Square = ({
  onClickSquare,
  content,
  uncoveredState,
  rowIndex,
  colIndex,
  minesAroundSquare,
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
      {getThingToShow({ content, uncoveredState, minesAroundSquare })}
    </button>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Square);
