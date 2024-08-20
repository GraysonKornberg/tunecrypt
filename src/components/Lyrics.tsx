import React, { useEffect } from 'react'
import Word from './Word'

const Lyrics = () => {
    const CreateCipher = () => {
        let cipher: ICipher = {}
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        let shuffled = [...alphabet].sort(() => Math.random() - 0.5)
        cipher = alphabet.reduce((acc: ICipher, letter, index) => {
            acc[letter] = { cipher: shuffled[index], current: null }
            return acc
        }, {})
        cipher[' '] = { cipher: ' ', current: null }
        return cipher
    }

    const [lyrics, setLyrics] = React.useState<string>(
        'these are the lyrics to the song these are the lyrics to the song these are the lyrics to the song these are the lyrics to the song'
    )
    const [cipher, setCipher] = React.useState<ICipher>(CreateCipher())
    const [selectedLetter, setSelectedLetter] = React.useState<ISelectedLetter>(
        { letter: '', index: -1 }
    )

    return (
        <div className='flex mx-10 justify-center flex-wrap gap-y-10 gap-x-10'>
            {lyrics.split(' ').map((word, index) => (
                <Word
                    key={index}
                    word={word}
                    cipher={cipher}
                    setCipher={setCipher}
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    letterStartIndex={
                        lyrics
                            .split(' ')
                            .slice(0, index + 1)
                            .join(' ').length - word.length
                    }
                    lyrics={lyrics}
                />
            ))}
        </div>
    )
}

export default Lyrics
