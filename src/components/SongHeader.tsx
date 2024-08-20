import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const SongHeader = () => {
    const [song, setSong] = useState<ISong>({
        title: 'Test Song',
        artist: 'STupidhead!!!!!!!!!!!!',
    })
    const [hideSong, setHideSong] = useState(true)
    return (
        <div className='mb-16'>
            <div className='flex'>
                {hideSong ? (
                    <h1 className='font-indie text-5xl mr-5 select-none text-gray-500'>
                        song title by artist name
                    </h1>
                ) : (
                    <h1 className='font-indie text-5xl mr-5 select-none'>
                        {song.title} by {song.artist}
                    </h1>
                )}

                <button
                    onClick={() => setHideSong(!hideSong)}
                    className='flex items-center'
                >
                    <FontAwesomeIcon
                        icon={hideSong ? faEyeSlash : faEye}
                        size='2x'
                        color={hideSong ? 'gray' : 'black'}
                    />
                </button>
            </div>
            {/* horizontal divider */}
            <div className='bg-black h-[2px] my-5'></div>
        </div>
    )
}

export default SongHeader
