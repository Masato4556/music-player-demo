export class Seconds {
  private seconds: number
  constructor(seconds: number) {
    if (seconds < 0) {
      throw new Error('Seconds cannot be negative')
    }
    this.seconds = seconds
  }

  value(): number {
    return this.seconds
  }
}
