import { renderHook, act } from '@testing-library/react'
import { useMusic } from './useAudio'

describe('useMusic', () => {
  let mockAudioPlay: jest.SpyInstance
  let mockAudioPause: jest.SpyInstance

  beforeEach(() => {
    mockAudioPlay = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())
    mockAudioPause = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should play the audio when play is called', () => {
    const { result } = renderHook(() => useMusic('test-audio.mp3'))

    act(() => {
      result.current.play()
    })

    expect(mockAudioPlay).toHaveBeenCalled()
  })

  it('should pause the audio when pause is called', () => {
    const { result } = renderHook(() => useMusic('test-audio.mp3'))

    act(() => {
      result.current.pause()
    })

    expect(mockAudioPause).toHaveBeenCalled()
  })

  it('should stop the audio when stop is called', () => {
    const { result } = renderHook(() => useMusic('test-audio.mp3'))

    act(() => {
      result.current.play()
    })

    act(() => {
      result.current.stop()
    })

    expect(mockAudioPause).toHaveBeenCalled()
    expect(result.current).toBeDefined()
  })
})
