interface GraphQLObject {
  _id: string
}

type FilmStub = Pick<Film, '_id' | 'title' | 'image'>

export interface Director extends GraphQLObject {
  lexKey: string
  name: string
  birthYear: number
  deathYear: number
  thumbnail?: { source: string }
  contentURLs: { desktop?: { page: string }; mobile?: { page: string } }
  extract: string
  extractHTML: string
  film: FilmStub
}

type DirectorStub = Pick<
  Director,
  '_id' | 'name' | 'lexKey' | 'birthYear' | 'deathYear'
>

type PlainTextHTML = {
  plainText: string
  html: string
}

export interface Film extends GraphQLObject {
  imdbID: string
  title: string
  year: number
  directors: DirectorStub[]
  directorsText: string
  image: string
  plot: string
  wikipedia: {
    url: string
    plotShort: PlainTextHTML
    plotFull: PlainTextHTML
  }
}

export type DirectorListItem = Pick<Director, '_id' | 'name' | 'lexKey' | 'birthYear' | 'deathYear' | 'film' | 'thumbnail'>

export type FilmListItem = Pick<Film, '_id' | 'title' | 'year' | 'directorsText' | 'image'> & {
  directors: DirectorStub[]
}

type ObjectResponse<Key extends string, T> = { [key in Key]: T }

type ListResponse<Key extends string, T> = { [key in Key]: T[] }

export type DirectorResponse = ObjectResponse<'director', Director>

export type DirectorListResponse = ListResponse<'directors', DirectorListItem>

export type FilmResponse = ObjectResponse<'film', Film>

export type FilmListResponse = ListResponse<'films', FilmListItem>

export const MAXINT32 = 0x7fffffff
