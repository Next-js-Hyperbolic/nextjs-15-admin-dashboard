import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import BookCoverSvg from './BookCoverSvg'

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface BookCoverProps {
    variant?: BookCoverVariant,
    className?: string,
    coverColor: string,
    coverImageUrl: string
}

const BookCover = ({className, variant="regular", coverColor='#012B48', coverImageUrl='https://placehold.co/400x600.png' }: BookCoverProps) => {
  return (
    <div className={cn('relative transition-all duration-300', variantStyles[variant], className)}>
        <BookCoverSvg coverColor={coverColor} />
        <div className='absolute z-10' style={{ left: '12%', width: '87.5%', height: '88%'}}>
            <Image src={coverImageUrl} alt='Book cover' fill className='rounded-sm object-fill' sizes='default'/>
        </div>
    </div>
  )
}

export default BookCover