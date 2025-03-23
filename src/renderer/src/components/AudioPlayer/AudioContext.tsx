import React, { createContext, useContext, useRef } from 'react'

type AudioContextType = {
  setAudioSrc: (src: string) => void
  play: () => void
  pause: () => void
  stop: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio())
  const setAudioSrc = (src: string) => {
    audioRef.current.src = src
  }
  const play = () => {
    audioRef.current.play()
  }
  const pause = () => {
    audioRef.current.pause()
  }
  const stop = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return (
    <AudioContext.Provider value={{ setAudioSrc, play, pause, stop }}>
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
