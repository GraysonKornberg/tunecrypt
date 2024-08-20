import React from 'react'
import Letter from './Letter'

interface WordProps {
    word: string
    cipher: ICipher
    setCipher: React.Dispatch<React.SetStateAction<ICipher>>
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    letterStartIndex: number
    lyrics: string
}

const Word = ({
    word,
    cipher,
    setCipher,
    selectedLetter,
    setSelectedLetter,
    letterStartIndex,
    lyrics,
}: WordProps) => {
    return (
        <div className='flex gap-x-1'>
            {word.split('').map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    cipher={cipher}
                    setCipher={setCipher}
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    index={letterStartIndex + index}
                    lyrics={lyrics}
                />
            ))}
        </div>
    )
}

export default Word
