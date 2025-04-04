import { Seconds } from '@renderer/components/AudioPlayer/Seconds'
import React, { createContext, useContext } from 'react'
import { useAudio } from './useAudio'
import { Volume } from './Volume'

type AudioContextType = {
  setAudio: (src: string) => void
  openAudio: () => Promise<void>
  play: () => void
  pause: () => void
  stop: () => void
  currentTime: Seconds
  duration: Seconds
  seek: (time: number) => void
  volume: Volume
  changeVolume: (volume: Volume) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
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
  } = useAudio()

  return (
    <AudioContext.Provider
      value={{
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
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}

export const useAudioControls = (): Pick<AudioContextType, 'play' | 'pause' | 'stop'> => {
  const { play, pause, stop } = useAudioContext()
  return { play, pause, stop }
}

export const useSetAudio = (): Pick<AudioContextType, 'setAudio' | 'openAudio'> => {
  const { setAudio, openAudio } = useAudioContext()
  return { setAudio, openAudio }
}

export const useAudioProgress = (): Pick<AudioContextType, 'currentTime' | 'duration' | 'seek'> => {
  const { currentTime, duration, seek } = useAudioContext()
  return { currentTime, duration, seek }
}

export const useAudioVolume = (): Pick<AudioContextType, 'volume' | 'changeVolume'> => {
  const { volume, changeVolume } = useAudioContext()
  return { volume, changeVolume }
}
