export interface Book {
    id: number,
    title: string,
    author: string,
    genre: string,
    rating: number,
    totalCopies: number,
    availableCopies: number,
    description: string,
    colorHash: string,
    coverImageUrl: string
    isBookLoaned?: boolean
  }