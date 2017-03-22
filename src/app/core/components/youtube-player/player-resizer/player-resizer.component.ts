import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import './player-resizer.scss';

@Component({
  selector: 'player-resizer',
  template: `
    <button title="minimize / maximize player"
      [class.full-screen]="!fullScreen"
      (click)="togglePlayer()" 
      class="btn btn-sm btn-primary navbar-btn show-player pull-right">
        <i class="fa fa-chevron-down icon-minimize"></i>
        <i class="fa fa-expand icon-max"></i>
    </button>
    <button 
      *ngIf="playerMoved"
      title="reset player position"
      (click)="resetPlayerPosition.next()" 
      class="btn btn-sm btn-primary navbar-btn show-player pull-left">
        <i class="fa fa-undo"></i>
    </button>
  `
})
export class PlayerResizerComponent implements OnInit {
  @Input() fullScreen: boolean;
  @Input() playerMoved: boolean;
  @Output() toggle = new EventEmitter<void>();
  @Output() resetPlayerPosition = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  togglePlayer() {
    this.toggle.next();
  }
}
