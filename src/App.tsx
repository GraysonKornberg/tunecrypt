import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Keyboard from './components/Keyboard'

function App(): JSX.Element {
    const CreateCipher = (lyrics: string) => {
        let cipher: ICipher = {}
        let letterSet = new Set(lyrics.toLowerCase().replace(/[^a-z]/g, ''))
        let nonLetterSet = new Set(lyrics.toLowerCase().replace(/[a-z]/g, ''))
        let currLetters = [...letterSet].sort()
        // Shuffle the alphabet and make sure no letters are in the same index
        let shuffled = 'abcdefghijklmnopqrstuvwxyz'.split('')
        let b = shuffled.slice()
        for (let i = b.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            if (i === j) {
                j = (j + 1) % b.length
            }
            ;[b[i], b[j]] = [b[j], b[i]]
        }
        if (b[0] === 'a') {
            ;[b[0], b[1]] = [b[1], b[0]]
        }
        shuffled = b

        cipher = currLetters.reduce((acc: ICipher, letter) => {
            acc[letter] = {
                cipher: shuffled[letter.charCodeAt(0) - 97],
                current: null,
                letter: true,
            }
            return acc
        }, {})

        nonLetterSet.forEach((nonLetter) => {
            cipher[nonLetter] = {
                cipher: nonLetter,
                current: nonLetter,
                letter: false,
            }
        })
        return cipher
    }

    // const [lyrics, setLyrics] = useState<string>(`abcdefghijklmnopqrstuvwxyz`)
    const [lyrics, setLyrics] = useState<string>(
        `hey, y'all! these are the lyrics to the song! these are the lyrics to the song these are the lyrics to the song these are the lyrics to the song hey, y'all! these are the lyrics to the song! these are the lyrics to the song these are the lyrics to the song these are the lyrics to the song`
    )
    const [cipher, setCipher] = useState<ICipher>(() => CreateCipher(lyrics))
    const [decipher, setDecipher] = useState<IDecipher>({
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: [],
    })
    const [selectedLetter, setSelectedLetter] = useState<ISelectedLetter>({
        letter: '',
        index: -1,
    })
    const [correctCount, setCorrectCount] = useState<number>(
        new Set(lyrics.toLowerCase().replace(/[a-z]/g, '')).size
    )

    const inputLetter = (newLetter: string) => {
        if (selectedLetter.letter === '') return
        if (newLetter === cipher[selectedLetter.letter].cipher) return
        // Update the cipher
        setCipher((cipherPrev) => {
            if (cipherPrev[selectedLetter.letter].current !== newLetter) {
                if (newLetter === selectedLetter.letter) {
                    setCorrectCount(correctCount + 1)
                } else if (
                    cipherPrev[selectedLetter.letter].current ===
                    selectedLetter.letter
                ) {
                    setCorrectCount(correctCount - 1)
                }
                // Update the decipher
                let oldLetter = cipherPrev[selectedLetter.letter].current
                setDecipher((decipherPrev) => {
                    decipherPrev[newLetter].push(selectedLetter.letter)
                    if (oldLetter !== null) {
                        decipherPrev[oldLetter] = decipherPrev[
                            oldLetter
                        ].filter((letter) => letter !== selectedLetter.letter)
                    }
                    return { ...decipherPrev }
                })
                cipherPrev[selectedLetter.letter].current = newLetter
            }

            // Set selected letter to the next null letter
            let newLyricsOrder =
                lyrics.slice(selectedLetter.index) +
                lyrics.slice(0, selectedLetter.index)
            for (let i = 0; i < newLyricsOrder.length; i++) {
                if (cipherPrev[newLyricsOrder[i]].current === null) {
                    setSelectedLetter({
                        letter: newLyricsOrder[i],
                        index: (i + selectedLetter.index) % lyrics.length,
                    })
                    break
                }
            }
            return { ...cipherPrev }
        })
    }

    const inputBackspace = () => {
        if (selectedLetter.letter === '') return
        // If the letter is already blank, go to previous letter and set it to null
        if (cipher[selectedLetter.letter].current === null) {
            let prevLetterIndex = selectedLetter.index - 1
            // while the previous letter is not a letter, keep going back
            while (
                prevLetterIndex >= 0 &&
                !cipher[lyrics[prevLetterIndex]].letter
            ) {
                prevLetterIndex--
            }
            if (prevLetterIndex < 0) return
            setSelectedLetter({
                letter: lyrics[prevLetterIndex],
                index: prevLetterIndex,
            })
            setCipher((cipherPrev) => {
                if (
                    cipherPrev[lyrics[prevLetterIndex]].current ===
                    lyrics[prevLetterIndex]
                ) {
                    setCorrectCount(correctCount - 1)
                }
                let deletedLetter = cipherPrev[lyrics[prevLetterIndex]].current
                if (deletedLetter !== null) {
                    setDecipher((decipherPrev) => {
                        decipherPrev[deletedLetter] = decipherPrev[
                            deletedLetter
                        ].filter((letter) => letter !== lyrics[prevLetterIndex])
                        return { ...decipherPrev }
                    })
                }
                cipherPrev[lyrics[prevLetterIndex]].current = null
                return { ...cipherPrev }
            })

            return
        }

        // If the letter is not blank, set it to blank
        setCipher((cipherPrev) => {
            if (
                cipherPrev[selectedLetter.letter].current ===
                selectedLetter.letter
            ) {
                setCorrectCount(correctCount - 1)
            }
            let deletedLetter = cipherPrev[selectedLetter.letter].current
            if (deletedLetter !== null) {
                setDecipher((decipherPrev) => {
                    decipherPrev[deletedLetter] = decipherPrev[
                        deletedLetter
                    ].filter((letter) => letter !== selectedLetter.letter)
                    return { ...decipherPrev }
                })
            }
            cipherPrev[selectedLetter.letter].current = null
            return { ...cipherPrev }
        })
    }

    useEffect(() => {
        if (correctCount === Object.keys(cipher).length) {
            setTimeout(() => {
                alert('You win!')
            }, 500)
        }
    }, [correctCount])

    return (
        <div className='h-screen flex flex-col overflow-x-hidden'>
            <div className='flex flex-col h-[75vh] justify-stretch'>
                <Header />
                <Main
                    lyrics={lyrics}
                    cipher={cipher}
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    inputLetter={inputLetter}
                    inputBackspace={inputBackspace}
                    decipher={decipher}
                />
            </div>
            <div className='h-[25vh]'>
                <Keyboard
                    decipher={decipher}
                    inputLetter={inputLetter}
                    inputBackspace={inputBackspace}
                />
            </div>
        </div>
    )
}

export default App
