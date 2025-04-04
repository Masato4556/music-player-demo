export class Volume {
  private volume: number

  constructor(volume: number) {
    if (volume < 0 || volume > 100) {
      throw new Error('Volume must be between 0 and 100')
    }
    this.volume = volume
  }

  getValue(): number {
    return this.volume
  }

  toHTMLAudioElementVolume(): number {
    return this.volume / 100
  }
}
