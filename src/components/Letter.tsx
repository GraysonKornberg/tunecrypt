import React, { useEffect, useRef, useState } from 'react'

interface LetterProps {
    character: { character: string; letter: boolean }
    cipher: ICipher
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    index: number
    lyrics: string
    inputLetter: (newLetter: string) => void
    inputBackspace: () => void
    decipher: IDecipher
}

const Letter = ({
    character,
    cipher,
    selectedLetter,
    setSelectedLetter,
    index,
    lyrics,
    inputLetter,
    inputBackspace,
    decipher,
}: LetterProps) => {
    const [altHighlight, setAltHighlight] = useState<boolean>(
        selectedLetter.letter === character.character
    )
    const [duplicateHighlight, setDuplicateHighlight] = useState<boolean>(false)
    const letterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setAltHighlight(selectedLetter.letter === character.character)
        if (selectedLetter.index === index) {
            letterRef.current?.focus()
        }
    }, [selectedLetter])

    useEffect(() => {
        setDuplicateHighlight(
            cipher[character.character].current !== null &&
                decipher[cipher[character.character].current!]?.length > 1
        )
    }, [decipher])

    const selectNextLetter = () => {
        for (let i = index + 1; i < lyrics.length; i++) {
            if (cipher[lyrics[i]].letter === true) {
                setSelectedLetter({ letter: lyrics[i], index: i })
                return
            }
        }
    }

    const selectPrevLetter = () => {
        for (let i = index - 1; i >= 0; i--) {
            if (cipher[lyrics[i]].letter === true) {
                setSelectedLetter({ letter: lyrics[i], index: i })
                return
            }
        }
    }

    return (
        <div className='w-7'>
            {/* If the letter is not a letter, return a blank div */}
            {!character.letter ? (
                <div className='w-7'>
                    <p className='font-indie text-4xl text-center cursor-default select-none'>
                        {character.character}
                    </p>
                </div>
            ) : (
                <div>
                    <div
                        ref={letterRef}
                        className={`${
                            document.activeElement === letterRef.current
                                ? 'bg-light-blue'
                                : altHighlight && 'bg-powder-blue'
                        } w-7 h-fit mb-1 cursor-pointer outline-none ${
                            duplicateHighlight && 'text-red-500'
                        }`}
                        onFocus={() => {
                            setSelectedLetter({
                                letter: character.character,
                                index,
                            })
                            setAltHighlight(true)
                        }}
                        onKeyDown={(e) => {
                            // If the key pressed is a letter, update the cipher
                            // If the key pressed is backspace, remove the letter from the cipher
                            // Make sure ctrl, alt, and shift are not pressed
                            // Set selected letter to the next null letter
                            if (e.ctrlKey || e.altKey) return
                            if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                                inputLetter(e.key.toLocaleLowerCase())
                            } else if (e.key === 'Backspace') {
                                inputBackspace()
                            } else if (e.key === 'ArrowRight') {
                                selectNextLetter()
                            } else if (e.key === 'ArrowLeft') {
                                selectPrevLetter()
                            }
                        }}
                        tabIndex={-1}
                    >
                        <p
                            className={`font-indie text-4xl text-center select-none ${
                                cipher[character.character].current === null &&
                                'opacity-0'
                            }`}
                        >
                            {cipher[character.character].current ?? 'm'}
                        </p>
                    </div>

                    <div className='bg-black h-[2px]'></div>

                    <p className='font-indie text-4xl text-center cursor-default select-none'>
                        {cipher[character.character].cipher}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Letter
