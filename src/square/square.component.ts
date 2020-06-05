import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() value: string = null;
  @Output() onPut: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clicked(): void {
    this.onPut.emit(null);
  }
}