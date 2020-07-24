import React from "react";
import {
  SquareState,
  SquareContent,
} from "../../Redux/reducers/board/board-interfaces";
import "./Square.scss";
import {
  squareWasClicked,
  squareFlagWasToggled,
} from "../../Redux/reducers/board/events";
import { selectors as gameSelectors } from "../../Redux/reducers/game/game";
import { connect } from "react-redux";
import { AppState } from "../../Redux/AppState";
import { selectors } from "../../Redux/reducers/board/board";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { GameStatus } from "../../Redux/reducers/game/game-interfaces";

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
  onClick: (coords: SquareCoords) => void;
  onRightClick: (coords: SquareCoords) => void;
}

interface StateProps {
  minesAroundSquare: number;
  gameStatus: GameStatus;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
): DispatchProps => ({
  onClick: ({ rowIndex, colIndex }: SquareCoords): void => {
    dispatch(
      squareWasClicked({
        iIndex: rowIndex,
        jIndex: colIndex,
      })
    );
  },
  onRightClick: ({ rowIndex, colIndex }: SquareCoords): void => {
    dispatch(
      squareFlagWasToggled({
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
  gameStatus: gameSelectors.gameStatus(state),
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
  if (uncoveredState === SquareState.Unclicked) return "";
  if (uncoveredState === SquareState.Flagged) return "🚩";
  if (uncoveredState === SquareState.Clicked) {
    if (content === SquareContent.Mine) return "💣";
    if (content === SquareContent.Nothing) return String(minesAroundSquare);
  }
  return "";
};

const classnamesByContent: {
  [x: string]: string;
} = {
  "1": "blue",
  "2": "green",
  "3": "red",
  "4": "darkBlue",
  "5": "bordeaux",
  "6": "aquamarine",
  "7": "violet",
  "8": "black",
};

const getClassnameByContentToShow = ({
  content,
  squareState,
}: {
  content: string;
  squareState: SquareState;
}) => {
  if (squareState === SquareState.Clicked) {
    return `clicked ${classnamesByContent[content] || ""}`;
  }
  return "";
};

type Props = OwnProps & DispatchProps & StateProps;

const Square = ({
  onClick,
  onRightClick,
  content,
  uncoveredState,
  rowIndex,
  colIndex,
  minesAroundSquare,
  gameStatus,
}: Props) => {
  const contentToShow = getThingToShow({
    content,
    uncoveredState,
    minesAroundSquare,
  });
  const fullClassname = `Square ${getClassnameByContentToShow({
    content: contentToShow,
    squareState: uncoveredState,
  })}`;

  return (
    <button
      type="button"
      className={fullClassname}
      disabled={
        uncoveredState === SquareState.Clicked || gameStatus === GameStatus.Lost
      }
      onClick={() =>
        onClick({
          rowIndex,
          colIndex,
        })
      }
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick({
          rowIndex,
          colIndex,
        });
      }}
    >
      {contentToShow}
    </button>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Square);
