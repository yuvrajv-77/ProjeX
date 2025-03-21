import { SortAscIcon, Vault } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Brand = ({ className }: { className?: string }) => {
    return (
        <Link to={'/'}>
            <span className='flex items-center gap-2'>
                <Vault className="h-6 w-6" />
                <h1
                    className={`${className} text-xl font-light projex flex items-end`}>
                    Proje<span className='font-extrabold text-2xl '>X</span>
                </h1>
            </span>
        </Link>
    )
}

export default Brand