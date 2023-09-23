export interface MovieResponse {
    title: string;
    id?: number;
    releaseYear: number;
    description: string;
    genres: string[];
}

export interface Movie {
    title: string;
    id?: number;
    releaseYear: number;
    description: string;
    genres: string[];
}

/*
* Usually we modify the response data in the Adapter() method
* Filtering, customizing, adding or removing actions are taken here
*/
export class MovieAdapter {
    adapt(res: MovieResponse): Movie {
        const movie: Movie = {
            title: res.title,
            id: res.id,
            releaseYear: res.releaseYear,
            description: res.description,
            genres: res.genres
        };

        return movie;
    }
}
