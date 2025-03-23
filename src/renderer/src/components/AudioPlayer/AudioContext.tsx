import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'

type AudioContextType = {
  setAudioSrc: (src: string) => void
  play: () => void
  pause: () => void
  stop: () => void
  currentTime: number
  duration: number
  seek: (time: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const setAudioSrc = useCallback(
    (src: string) => {
      audioRef.current.src = src
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration)
      }
    },
    [setDuration]
  )

  const play = () => {
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  const stop = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setCurrentTime(0)
  }

  const seek = (time: number) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  useEffect(() => {
    const updateTime = async () => {
      setCurrentTime(audioRef.current.currentTime)
    }
    audioRef.current.addEventListener('timeupdate', updateTime)
  }, [])

  return (
    <AudioContext.Provider value={{ setAudioSrc, play, pause, stop, currentTime, duration, seek }}>
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

export const useSetAudio = (): Pick<AudioContextType, 'setAudioSrc'> => {
  const { setAudioSrc } = useAudio()
  return { setAudioSrc }
}

export const useAudioProgress = (): Pick<AudioContextType, 'currentTime' | 'duration' | 'seek'> => {
  const { currentTime, duration, seek } = useAudio()
  return { currentTime, duration, seek }
}
