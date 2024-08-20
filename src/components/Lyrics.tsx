import React, { useEffect } from 'react'
import Word from './Word'

interface LyricsProps {
    lyrics: string
    cipher: ICipher
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    inputLetter: (newLetter: string) => void
    inputBackspace: () => void
    decipher: IDecipher
}

const Lyrics = ({
    lyrics,
    cipher,
    selectedLetter,
    setSelectedLetter,
    inputLetter,
    inputBackspace,
    decipher,
}: LyricsProps) => {
    return (
        <div className='flex mx-10 justify-center flex-wrap gap-y-10 gap-x-10 h-full overflow-y-scroll'>
            {lyrics.split(' ').map((word, index) => (
                <Word
                    key={index}
                    word={word}
                    cipher={cipher}
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    letterStartIndex={
                        lyrics
                            .split(' ')
                            .slice(0, index + 1)
                            .join(' ').length - word.length
                    }
                    lyrics={lyrics}
                    inputLetter={inputLetter}
                    inputBackspace={inputBackspace}
                    decipher={decipher}
                />
            ))}
        </div>
    )
}

export default Lyrics
