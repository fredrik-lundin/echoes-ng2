import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from '../action-creator.util';

@Injectable()
export class PlayerActions {
  static PLAY = '[Player] PLAY';
  static LOAD_AND_PLAY = '[Player] LOAD_AND_PLAY';
  static QUEUE = '[Player] REMOVE';
  static PLAY_STARTED = '[Player] PLAY_STARTED';
  static TOGGLE_PLAYER = '[Player] TOGGLE_PLAYER';
  static STATE_CHANGE = '[Player] STATE_CHANGE';
  static FULLSCREEN = '[Player] FULLSCREEN';
  static RESET = '[Player] RESET';
  static SET_PLAYER_POSITION = '[Player] SET_PLAYER_POSITION';

  togglePlayer = ActionCreatorFactory.create<boolean>(PlayerActions.TOGGLE_PLAYER, true);

  playVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: PlayerActions.PLAY,
      payload: media
    };
  }

  loadAndPlay(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: PlayerActions.LOAD_AND_PLAY,
      payload: media
    };
  }

  playStarted(media): Action {
    return {
      type: PlayerActions.PLAY_STARTED
    };
  }

  updateState(state: number): Action {
    return {
      type: PlayerActions.STATE_CHANGE,
      payload: state
    };
  }

  fullScreen(): Action {
    return {
      type: PlayerActions.FULLSCREEN
    };
  }

  reset(): Action {
    return {
      type: PlayerActions.RESET
    };
  }

  setPlayerPosition(pos: {x: number, y: number}) {
    return {
      type: PlayerActions.SET_PLAYER_POSITION,
      payload: pos
    };
  }
}
