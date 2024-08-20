import { faBars, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between px-5 bg-pink shadow-lg'>
            <div className='flex items-center'>
                <h1 className='font-indie text-7xl mr-7 mt-5 shadow-black text-shadow-sm'>
                    TuneCrypt
                </h1>
                <button>
                    <FontAwesomeIcon
                        icon={faChartSimple}
                        size='4x'
                        alignmentBaseline='baseline'
                    />
                </button>
            </div>
            <button className='flex items-center'>
                <FontAwesomeIcon icon={faBars} size='4x' />
            </button>
        </div>
    )
}

export default Header
