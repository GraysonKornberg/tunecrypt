import React, { useEffect, useRef, useState } from 'react'
import Key from './Key'

interface KeyboardProps {
    decipher: IDecipher
    inputLetter: (newLetter: string) => void
    inputBackspace: () => void
}

const Keyboard = ({ decipher, inputLetter, inputBackspace }: KeyboardProps) => {
    const [keyWidth, setKeyWidth] = useState<number>(
        (window.innerWidth - 44) / 10
    )
    const keyboardContainerRef = useRef<HTMLDivElement>(null)
    const [keyHeight, setKeyHeight] = useState<number>(
        (keyboardContainerRef.current?.clientHeight ?? 48) / 3 - 16
    )
    useEffect(() => {
        let timeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setKeyWidth((window.innerWidth - 44) / 10)

                console.log(keyboardContainerRef.current?.clientHeight)
                setKeyHeight(
                    ((keyboardContainerRef.current?.clientHeight ?? 16) - 16) /
                        3
                )
            }, 200)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setKeyWidth((window.innerWidth - 44) / 10)
        setKeyHeight(
            ((keyboardContainerRef.current?.clientHeight ?? 16) - 16) / 3
        )
    }, [])

    return (
        <div
            ref={keyboardContainerRef}
            className='flex justify-center w-svw h-full'
        >
            <div className='flex flex-col gap-y-1 items-center bg-pink h-fit p-1'>
                <div className='flex gap-x-1'>
                    {'qwertyuiop'.split('').map((letter) => (
                        <Key
                            key={letter}
                            letter={letter}
                            decipher={decipher}
                            inputLetter={inputLetter}
                            inputBackspace={inputBackspace}
                            keyWidth={keyWidth}
                            keyHeight={keyHeight}
                        />
                    ))}
                </div>
                <div className='flex gap-x-1'>
                    {'asdfghjkl'.split('').map((letter) => (
                        <Key
                            key={letter}
                            letter={letter}
                            decipher={decipher}
                            inputLetter={inputLetter}
                            inputBackspace={inputBackspace}
                            keyWidth={keyWidth}
                            keyHeight={keyHeight}
                        />
                    ))}
                </div>
                <div className='flex gap-x-1'>
                    {'zxcvbnm'.split('').map((letter) => (
                        <Key
                            key={letter}
                            letter={letter}
                            decipher={decipher}
                            inputLetter={inputLetter}
                            inputBackspace={inputBackspace}
                            keyWidth={keyWidth}
                            keyHeight={keyHeight}
                        />
                    ))}
                    <Key
                        key='backspace'
                        letter='backspace'
                        decipher={decipher}
                        inputLetter={inputLetter}
                        inputBackspace={inputBackspace}
                        keyWidth={keyWidth}
                        keyHeight={keyHeight}
                    />
                </div>
            </div>
        </div>
    )
}

export default Keyboard
