import React from 'react'
import Letter from './Letter'

interface WordProps {
    word: string
    cipher: ICipher
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    letterStartIndex: number
    lyrics: string
    inputLetter: (newLetter: string) => void
    inputBackspace: () => void
    decipher: IDecipher
}

const Word = ({
    word,
    cipher,
    selectedLetter,
    setSelectedLetter,
    letterStartIndex,
    lyrics,
    inputLetter,
    inputBackspace,
    decipher,
}: WordProps) => {
    return (
        <div className='flex gap-x-1'>
            {word.split('').map((character, index) => (
                <Letter
                    key={index}
                    character={{ character, letter: cipher[character].letter }}
                    cipher={cipher}
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    index={letterStartIndex + index}
                    lyrics={lyrics}
                    inputLetter={inputLetter}
                    inputBackspace={inputBackspace}
                    decipher={decipher}
                />
            ))}
        </div>
    )
}

export default Word
