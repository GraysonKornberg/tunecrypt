import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

interface KeyProps {
    letter: string
    decipher: IDecipher
    inputLetter: (userInput: string) => void
    inputBackspace: () => void
    keyWidth: number
    keyHeight: number
}

const Key = ({
    letter,
    decipher,
    inputLetter,
    inputBackspace,
    keyWidth,
    keyHeight,
}: KeyProps) => {
    const [duplicateHighlight, setDuplicateHighlight] = useState<boolean>(false)
    useEffect(() => {
        setDuplicateHighlight(decipher[letter]?.length > 1)
        console.log(keyWidth)
    }, [decipher])

    return letter === 'backspace' ? (
        <button
            className={`bg-light-blue font-indie sm:text-4xl text-xl rounded-lg border-2 border-black flex items-center justify-center`}
            onClick={() => {
                inputBackspace()
            }}
            style={{ width: keyWidth }}
        >
            <FontAwesomeIcon icon={faBackspace} />
        </button>
    ) : (
        <button
            className={`${
                decipher[letter].length === 0
                    ? 'bg-light-blue'
                    : 'bg-powder-blue'
            }  font-indie sm:text-4xl text-xl rounded-lg border-2 border-black ${
                duplicateHighlight && 'text-red-500'
            }`}
            style={{ width: keyWidth, height: keyHeight }}
            onClick={() => {
                inputLetter(letter)
            }}
        >
            {letter}
        </button>
    )
}

export default Key
