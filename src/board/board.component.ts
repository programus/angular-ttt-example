import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  rowIndice = Array.from(Array(3).keys());
  colIndice = Array.from(Array(3).keys());
  @Input() squares: (string|null)[];
  @Output() onPut: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  putStone(i: number): void {
    this.onPut.emit(i);
  }
}