import { useCallback, useRef, useState } from 'react'

const lookaheadMilliseconds = 25
const scheduleAheadSeconds = 0.1

export const useBpm = () => {
  const [bpm, setBpm] = useState(60)
  const currentNote = useRef(0)
  const nextNoteTime = useRef(0)
  const audioContext = useRef(new (window.AudioContext || window.AudioContext)())
  const callback = useRef<() => void>(() => {})
  const timerId = useRef<number | null>(null) // タイマーIDを保持

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / bpm
    nextNoteTime.current += secondsPerBeat
    currentNote.current++
  }, [bpm])

  const scheduleNote = useCallback((time: number) => {
    if (time < nextNoteTime.current + scheduleAheadSeconds) {
      callback.current()
      console.log('Note scheduled at time:', time)
    }
  }, [])

  const scheduler = useCallback(() => {
    while (nextNoteTime.current < audioContext.current.currentTime + scheduleAheadSeconds) {
      scheduleNote(nextNoteTime.current)
      nextNote()
    }
    timerId.current = window.setTimeout(scheduler, lookaheadMilliseconds) // タイマーIDを保存
  }, [scheduleNote, nextNote])

  const start = useCallback(() => {
    nextNoteTime.current = audioContext.current.currentTime
    if (timerId.current !== null) {
      clearTimeout(timerId.current) // 既存のタイマーをクリア
      timerId.current = null
    }
    scheduler()
  }, [scheduler])

  const stop = useCallback(() => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current) // タイマーをクリア
      timerId.current = null
    }
  }, [])

  const setBpmValue = useCallback(
    (value: number) => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current) // 既存のタイマーをクリア
        timerId.current = null
      }
      setBpm(value)
      nextNoteTime.current = audioContext.current.currentTime
      // scheduler() // 新しいBPMでスケジューラを再起動
    },
    [setBpm, audioContext]
  )

  const getBpm = useCallback(() => {
    return bpm
  }, [bpm])

  const setCallback = useCallback((cb: () => void) => {
    callback.current = cb
  }, [])

  return {
    setBpm: setBpmValue,
    getBpm,
    start,
    stop,
    nextNote,
    scheduleNote,
    scheduler,
    setCallback
  }
}
