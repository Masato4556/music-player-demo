import { Seconds } from '@renderer/components/AudioPlayer/Seconds'
import React, { createContext, useContext, useRef, useState, useCallback } from 'react'

type AudioContextType = {
  setAudio: (src: string) => void
  openAudio: () => Promise<void>
  play: () => void
  pause: () => void
  stop: () => void
  currentTime: Seconds
  duration: Seconds
  seek: (time: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const [currentTime, setCurrentTime] = useState(new Seconds(0))
  const [duration, setDuration] = useState(new Seconds(0))

  const setAudio = useCallback(
    (filePath: string) => {
      audioRef.current.pause()
      audioRef.current = new Audio(filePath)
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
    [setDuration]
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

  return (
    <AudioContext.Provider
      value={{ setAudio, openAudio, play, pause, stop, currentTime, duration, seek }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export const useAudioControls = (): Pick<AudioContextType, 'play' | 'pause' | 'stop'> => {
  const { play, pause, stop } = useAudio()
  return { play, pause, stop }
}

export const useSetAudio = (): Pick<AudioContextType, 'setAudio' | 'openAudio'> => {
  const { setAudio, openAudio } = useAudio()
  return { setAudio, openAudio }
}

export const useAudioProgress = (): Pick<AudioContextType, 'currentTime' | 'duration' | 'seek'> => {
  const { currentTime, duration, seek } = useAudio()
  return { currentTime, duration, seek }
}
