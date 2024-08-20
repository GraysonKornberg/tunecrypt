import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const SongHeader = () => {
    const [song, setSong] = useState<ISong>({
        title: 'Song Title',
        artist: 'Artist Name',
    })
    const [hideSong, setHideSong] = useState(true)
    return (
        <div className='mb-16'>
            <div className='flex justify-between'>
                <h1 className='font-indie text-5xl mr-5'>
                    {song.title} by {song.artist}
                </h1>
                <button
                    onClick={() => setHideSong(!hideSong)}
                    className='flex items-center'
                >
                    <p className='font-indie text-xl mr-2 mt-1 font-semibold'>
                        {hideSong ? 'reveal song' : 'hide song'}
                    </p>
                    <FontAwesomeIcon
                        icon={hideSong ? faEyeSlash : faEye}
                        size='2x'
                    />
                </button>
            </div>
            {/* horizontal divider */}
            <div className='bg-black h-[2px] my-5'></div>
        </div>
    )
}

export default SongHeader
