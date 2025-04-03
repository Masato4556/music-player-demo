import { Seconds } from '../Seconds'
import { formatTime } from './formatTime'

describe('formatTime', () => {
  it('should format seconds to MM:SS', () => {
    const seconds = new Seconds(125)
    expect(formatTime(seconds)).toBe('02:05')
  })

  it('should format seconds less than 10 to MM:SS', () => {
    const seconds = new Seconds(5)
    expect(formatTime(seconds)).toBe('00:05')
  })

  it('should format seconds to MM:SS with leading zeros', () => {
    const seconds = new Seconds(60)
    expect(formatTime(seconds)).toBe('01:00')
  })

  it('should format zero seconds to MM:SS', () => {
    const seconds = new Seconds(0)
    expect(formatTime(seconds)).toBe('00:00')
  })

  it('should format seconds to HH:MM:SS when hours are present', () => {
    const seconds = new Seconds(3600 + 60 + 1)
    expect(formatTime(seconds)).toBe('1:01:01')
  })

  it('should format large durations to HH:MM:SS', () => {
    const seconds = new Seconds(3600 * 100 + 60 + 1)
    expect(formatTime(seconds)).toBe('100:01:01')
  })
})
