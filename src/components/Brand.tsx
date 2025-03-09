import { SortAscIcon, Vault } from 'lucide-react'
import React from 'react'

const Brand = ({ className }: { className?: string }) => {
    return (
        <span className='flex items-center gap-2'>
            <Vault className="h-8 w-8" />
            <h1
                className={`${className} text-2xl font-light projex flex items-end`}>
                Proje<span className='font-extrabold text-3xl '>X</span>
            </h1>
        </span>

    )
}

export default Brand