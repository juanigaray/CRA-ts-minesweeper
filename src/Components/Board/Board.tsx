import React from "react";
import "./Board.scss";
import { selectors } from "../../Redux/reducers/board/board";
import {
  BoardState,
  SquareMatrix,
} from "../../Redux/reducers/board/board-interfaces";
import { connect } from "react-redux";
import SquareRow from "../SquareRow/SquareRow";
import { AppState } from "../../Redux/AppState";

interface Props {
  boardSquares: SquareMatrix;
}

const mapStateToProps = (state: AppState) => ({
  boardSquares: selectors.board(state),
});

const Board = ({ boardSquares }: Props) => {
  return (
    <div className="Board">
      {boardSquares?.map((row) => (
        <SquareRow row={row} />
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Board);
