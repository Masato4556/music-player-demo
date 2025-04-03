import { renderHook } from '@testing-library/react'
import { useOnValueChange } from './useOnValueChange'

describe('useOnValueChange', () => {
  it('should call seek with the correct time when value changes', () => {
    const mockSeek = jest.fn()
    const duration = 200
    const { result } = renderHook(() => useOnValueChange(duration, mockSeek))

    const onValueChange = result.current
    onValueChange([50]) // 50% of 100 duration

    expect(mockSeek).toHaveBeenCalledWith(100)
  })

  it('should call seek with 0 when value is 0', () => {
    const mockSeek = jest.fn()
    const duration = 200
    const { result } = renderHook(() => useOnValueChange(duration, mockSeek))

    const onValueChange = result.current
    onValueChange([0])

    expect(mockSeek).toHaveBeenCalledWith(0)
  })

  it('should call seek with the full duration when value is 100', () => {
    const mockSeek = jest.fn()
    const duration = 200
    const { result } = renderHook(() => useOnValueChange(duration, mockSeek))

    const onValueChange = result.current
    onValueChange([100])

    expect(mockSeek).toHaveBeenCalledWith(200)
  })

  it('should throw error if value array is empty', () => {
    const mockSeek = jest.fn()
    const duration = 150
    const { result } = renderHook(() => useOnValueChange(duration, mockSeek))

    const onValueChange = result.current
    expect(() => onValueChange([])).toThrow('Value is undefined')
  })
})
