import { Seconds } from './Seconds'

describe('Seconds', () => {
  it('should create an instance with positive seconds', () => {
    const seconds = new Seconds(10)
    expect(seconds.value()).toBe(10)
  })

  it('should throw an error when initialized with negative seconds', () => {
    expect(() => new Seconds(-5)).toThrow('Seconds cannot be negative')
  })

  it('should return the correct value', () => {
    const seconds = new Seconds(15)
    expect(seconds.value()).toBe(15)
  })
})
