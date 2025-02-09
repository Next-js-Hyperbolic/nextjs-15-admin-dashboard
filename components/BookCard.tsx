import { Book } from '@/types';
import Link from 'next/link';
import React from 'react';
import BookCover from './BookCover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import CalendarIcon from '@/public/icons/calendar.svg';

const BookCard = ({
  id,
  title,
  genre,
  colorHash,
  coverImageUrl,
  isBookLoaned = false,
}: Book) => (
  <li className={cn(isBookLoaned && 'xs:w-52 w-full')}>
    <Link
      href={`/books/${id}`}
      className={cn(isBookLoaned && 'w-full flex flex-col items-center')}
    >
      <BookCover coverColor={colorHash} coverImageUrl={coverImageUrl} />

      <div className={cn('mt-4', !isBookLoaned && 'xs:max-w-40 max-w-28')}>
        <p className='book-title'>{title}</p>
        <p className='book-genre'>{genre}</p>
      </div>

      {isBookLoaned && (
        <div className='mt-3 w-full'>
          <div className='book-loaned'>
            <Image
              height={20}
              width={20}
              src={CalendarIcon}
              alt='calendar'
              className='object-contain'
            />
            <p className='text-light-100'>11 days left to return</p>
          </div>

          <Button className='book-btn' variant='ghost'>
            Download Receipt
          </Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
