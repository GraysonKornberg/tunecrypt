import React, { useEffect, useRef, useState } from 'react'

interface LetterProps {
    letter: string
    cipher: ICipher
    setCipher: React.Dispatch<React.SetStateAction<ICipher>>
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    index: number
    lyrics: string
}

const Letter = ({
    letter,
    cipher,
    setCipher,
    selectedLetter,
    setSelectedLetter,
    index,
    lyrics,
}: LetterProps) => {
    const [altHighlight, setAltHighlight] = useState<boolean>(
        selectedLetter.letter === letter
    )
    const letterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setAltHighlight(selectedLetter.letter === letter)
        if (selectedLetter.index === index) {
            letterRef.current?.focus()
        }
    }, [selectedLetter])

    return (
        <div className='w-7'>
            <div
                ref={letterRef}
                className={`${
                    document.activeElement === letterRef.current
                        ? 'bg-light-blue'
                        : altHighlight && 'bg-powder-blue'
                } w-7 h-fit mb-1 cursor-pointer outline-none`}
                onFocus={() => {
                    if (selectedLetter.index === index) {
                        setAltHighlight(false)
                        setSelectedLetter({ letter: '', index: -1 })
                        return
                    }
                    setSelectedLetter({ letter, index })
                    setAltHighlight(true)
                }}
                onKeyDown={(e) => {
                    // If the key pressed is a letter, update the cipher
                    // If the key pressed is backspace, remove the letter from the cipher
                    // Make sure ctrl, alt, and shift are not pressed
                    // Set selected letter to the next null letter
                    if (e.ctrlKey || e.altKey || e.shiftKey) return
                    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                        setCipher((cipherPrev) => {
                            cipherPrev[letter].current = e.key.toLowerCase()
                            let newLyricsOrder =
                                lyrics.slice(index) + lyrics.slice(0, index)
                            for (let i = 0; i < newLyricsOrder.length; i++) {
                                if (
                                    cipherPrev[newLyricsOrder[i]].current ===
                                        null &&
                                    newLyricsOrder[i] !== ' '
                                ) {
                                    setSelectedLetter({
                                        letter: newLyricsOrder[i],
                                        index: (i + index) % lyrics.length,
                                    })
                                    break
                                }
                            }
                            return { ...cipherPrev }
                        })
                    } else if (e.key === 'Backspace') {
                        // If the letter is already blank, go to previous letter and set it to null
                        if (cipher[letter].current === null) {
                            let prevLetterIndex = index - 1
                            while (
                                lyrics[prevLetterIndex] === ' ' &&
                                prevLetterIndex >= 0
                            ) {
                                prevLetterIndex--
                            }
                            if (prevLetterIndex < 0) return
                            setSelectedLetter({
                                letter: lyrics[prevLetterIndex],
                                index: prevLetterIndex,
                            })
                            setCipher((cipherPrev) => {
                                cipherPrev[lyrics[prevLetterIndex]].current =
                                    null
                                return { ...cipherPrev }
                            })
                            return
                        }
                        setCipher((cipherPrev) => {
                            cipherPrev[letter].current = null
                            return { ...cipherPrev }
                        })
                    }
                }}
                tabIndex={0}
            >
                <p
                    className={`font-indie text-4xl text-center ${
                        cipher[letter].current === null && 'opacity-0'
                    }`}
                >
                    {cipher[letter].current ?? 'm'}
                </p>
            </div>
            {letter !== ' ' && <div className='bg-black h-[2px]'></div>}
            <p className='font-indie text-4xl text-center cursor-default select-none'>
                {cipher[letter].cipher}
            </p>
        </div>
    )
}

export default Letter
