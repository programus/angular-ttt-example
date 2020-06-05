import { Component, OnInit } from '@angular/core';
import { HistoryItem } from '../_classes/history-item';
import { Step } from '../_classes/step';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  history: HistoryItem[] = [{
    squares: Array(9).fill(null),
  }];
  stepNumber = 0;
  xIsNext = true;

  constructor() { }

  ngOnInit() {
  }

  get currentSquares() {
    return this.history[this.stepNumber].squares;
  }

  get winner() {
    return this.calculateWinner(this.currentSquares);
  }

  get status() {
    return this.winner ? `Winner: ${this.winner}` : `Next player: ${this.xIsNext ? 'X' : 'O'}`;
  }

  get moves(): Step[] {
    return this.history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return {
        move: move,
        desc: desc,
      };
    })
  }

  jumpTo(move: number) {
    this.stepNumber = move;
    this.xIsNext = (move % 2) === 0;
  }

  handleClick(i: number): void {
    const hist = this.history.slice(0, this.stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.xIsNext ? 'X' : 'O';
    this.history = hist.concat([{
      squares: squares,
    }]);
    this.stepNumber = hist.length;
    this.xIsNext = !this.xIsNext;
  }

  calculateWinner(squares: (string|null)[]): (string|null) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

}