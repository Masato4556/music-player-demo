import { useRef, useState, useCallback } from 'react'
import { Seconds } from './Seconds'
import { Volume } from './Volume'

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const [currentTime, setCurrentTime] = useState(new Seconds(0))
  const [duration, setDuration] = useState(new Seconds(0))
  const [volume, setVolume] = useState(new Volume(100))

  const setAudio = useCallback(
    (filePath: string) => {
      audioRef.current.pause()
      audioRef.current = new Audio(filePath)
      audioRef.current.volume = volume.toHTMLAudioElementVolume()
      audioRef.current.onloadedmetadata = () => {
        setDuration(new Seconds(audioRef.current.duration))
      }
      audioRef.current.onerror = (error) => {
        console.error('Audio load error:', error)
      }
      const updateTime = async () => {
        setCurrentTime(new Seconds(audioRef.current.currentTime))
      }
      audioRef.current.addEventListener('timeupdate', updateTime)
      audioRef.current.load() // ロードを強制的に開始
    },
    [setDuration, setCurrentTime, volume]
  )

  const openAudio = useCallback(async () => {
    // TODO: blobURLに変換せずに直接srcに設定できないか検討する
    const filePath = await window.api.openFile()
    console.log(filePath)
    if (filePath === null) return

    const audioData = await window.api.readFile(filePath)
    if (audioData === null) return

    const blob = new Blob([audioData], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)

    setAudio(url)
  }, [setAudio])

  const play = () => {
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  const stop = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setCurrentTime(new Seconds(0))
  }

  const seek = (time: number) => {
    audioRef.current.currentTime = time
    setCurrentTime(new Seconds(time))
  }

  const changeVolume = (volume: Volume) => {
    audioRef.current.volume = volume.toHTMLAudioElementVolume()
    setVolume(volume)
  }

  return {
    setAudio,
    openAudio,
    play,
    pause,
    stop,
    currentTime,
    duration,
    seek,
    volume,
    changeVolume
  }
}
