import React from 'react'
import SongHeader from './SongHeader'
import Lyrics from './Lyrics'

interface MainProps {
    lyrics: string
    cipher: ICipher
    selectedLetter: ISelectedLetter
    setSelectedLetter: React.Dispatch<React.SetStateAction<ISelectedLetter>>
    inputLetter: (newLetter: string) => void
    inputBackspace: () => void
    decipher: IDecipher
}

const Main = ({
    lyrics,
    cipher,
    selectedLetter,
    setSelectedLetter,
    inputLetter,
    inputBackspace,
    decipher,
}: MainProps) => {
    return (
        <div className='2xl:mx-96 xl:mx-10 pt-16 pb-8 h-5/6 flex flex-col'>
            <SongHeader />
            <Lyrics
                lyrics={lyrics}
                cipher={cipher}
                selectedLetter={selectedLetter}
                setSelectedLetter={setSelectedLetter}
                inputLetter={inputLetter}
                inputBackspace={inputBackspace}
                decipher={decipher}
            />
        </div>
    )
}

export default Main
