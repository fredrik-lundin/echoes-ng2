import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EchoesState } from '../store';
import { PlayerActions, YoutubePlayerState } from '../store/youtube-player';

@Injectable()
export class YoutubePlayerService {
  public player: YT.Player;
  public player$: Observable<YoutubePlayerState>;
  private isFullscreen: boolean = false;
  private defaultSizes = {
      height: 270,
      width: 367
  };

  constructor (
    private store: Store<EchoesState>,
    private zone: NgZone,
    private playerActions: PlayerActions
    ) {
    this.player$ = this.store.select(state => state.player);
    this.player$.subscribe(player => { this.isFullscreen = player.isFullscreen; });
  }

  setupPlayer (player) {
    this.player = player;
  }

  play () {
    this.player.playVideo();
  }

  pause () {
    this.player.pauseVideo();
  }

  playVideo(media: any) {
    const id = media.id.videoId ? media.id.videoId : media.id;
    const loadedMedia = this.player.getVideoData();
    const loadedMediaId = loadedMedia.video_id;
    const isLoaded = '' !== loadedMediaId && id === loadedMediaId;
    if (!isLoaded) {
      this.player.loadVideoById(id);
    }
    this.play();
  }

  togglePlayer() {
    this.store.dispatch(this.playerActions.togglePlayer(true));
  }

  onPlayerStateChange (event) {
    const state = event.data;
    let autoNext = false;
    // play the next song if its not the end of the playlist
    // should add a "repeat" feature
    if (state === YT.PlayerState.ENDED) {
      // this.listeners.ended.forEach(callback => callback(state));
    }

    if (state === YT.PlayerState.PAUSED) {
      // service.playerState = YT.PlayerState.PAUSED;
    }
    if (state === YT.PlayerState.PLAYING) {
      // service.playerState = YT.PlayerState.PLAYING;
    }
    this.store.dispatch(this.playerActions.updateState(state));
  }

  setSize () {
    let { height, width } = this.defaultSizes;

    if (!this.isFullscreen) {
      height = window.innerHeight;
      width = window.innerWidth;
    }
    this.player.setSize(width, height);
    this.store.dispatch(this.playerActions.fullScreen());
  }

  setupDragListeners(player: HTMLElement) {
    const mouseup = Observable.fromEvent(document, 'mouseup');
    const mousemove = Observable.fromEvent(document, 'mousemove');
    const mousedown = Observable.fromEvent(player, 'mousedown');

    const mousedrag = mousedown.mergeMap((md: any) => {
      const startX = md.clientX + window.scrollX;
      const startY = md.clientY + window.scrollY;
      const startLeft = parseInt(player.style.left, 10) || 0;
      const startTop = parseInt(player.style.top, 10) || 0;

      return mousemove.map((mm: any) => {
        mm.preventDefault();

        return {
          x: startLeft + mm.clientX - startX,
          y: startTop + mm.clientY - startY
        };
      }).takeUntil(mouseup);
    });

    mousedrag.subscribe((pos) => {
      this.store.dispatch(this.playerActions.setPlayerPosition({
        y: pos.y,
        x: pos.x
      }));
    });
  }
}
