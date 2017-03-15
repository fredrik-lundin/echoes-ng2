import {
  inject,
  async,
} from '@angular/core/testing';

import { player, YoutubePlayerState } from './youtube-player.reducer';
import { PlayerActions } from './youtube-player.actions';
import { YoutubeMediaMock } from '../../../../../tests/mocks/youtube.media.item';

describe('The Youtube Player reducer', () => {
  const mockedState = {
    mediaId: { videoId: 'NONE' },
    index: 0,
    media: {},
    showPlayer: true,
    playerState: 0,
    isFullscreen: false,
    playerPosition: { x: 0, y: 0 }
  };
  it('should return current state when no valid actions have been made', () => {
    const state = Object.assign({}, mockedState);
    const actual = player(<YoutubePlayerState>state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should set the new media id by the new PLAYED youtube media item', () => {
    const state = Object.assign({}, mockedState);
    const actual = player(state, { type: PlayerActions.PLAY, payload: YoutubeMediaMock });
    expect(actual.mediaId.videoId).toBe(YoutubeMediaMock.id.videoId);
  });

  it('should toggle visibility of the player', () => {
    const state = Object.assign({}, mockedState, {
      mediaId: 'mocked',
      showPlayer: false
    });
    const actual = player(state, { type: PlayerActions.TOGGLE_PLAYER, payload: true });
    const expected = state;
    expect(actual.showPlayer).toBe(!expected.showPlayer);
  });

  it('should change the state of the player', () => {
    const state = Object.assign({}, mockedState, {
      mediaId: 'mocked',
      playerState: 0
    });
    const actual = player(state, { type: PlayerActions.STATE_CHANGE, payload: 1 });
    expect(actual.playerState).toBe(1);
  });

  it('should change the player position', () => {
    const state = Object.assign({}, mockedState, {
      mediaId: 'mocked',
      playerState: 0
    });

    const expectedX = 10;
    const expectedY = 70;
    const actual = player(state,
      { type: PlayerActions.SET_PLAYER_POSITION, payload: { x: expectedX, y: expectedY } });

    expect(actual.playerPosition.x).toBe(expectedX);
    expect(actual.playerPosition.y).toBe(expectedY);
  });

  it('should reset the correct fields', () => {
    const state = Object.assign({}, mockedState, {
      mediaId: 'mocked'
    });

    let changed = player(state, { type: PlayerActions.SET_PLAYER_POSITION, payload: { x: 99, y: 99 } });
    changed = player(changed, { type: PlayerActions.STATE_CHANGE, payload: 1 });
    changed = player(changed, { type: PlayerActions.FULLSCREEN, payload: true });

    expect(changed.isFullscreen).toBe(true);
    expect(changed.playerState).toBe(1);
    expect(changed.playerPosition.x).toBe(99);
    expect(changed.playerPosition.y).toBe(99);

    const resetState = player(changed, { type: PlayerActions.RESET });

    expect(resetState.isFullscreen).toBe(false);
    expect(resetState.playerState).toBe(0);
    expect(resetState.playerPosition.x).toBe(0);
    expect(resetState.playerPosition.y).toBe(0);
  });
});
