declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    destroy(): void;
  }

  interface PlayerEvent {
    target: Player;
  }
}
