
export type Episode = {
    id: number;
    title: string;
    members: string;
    thumbnail: string;
    description: string;
    durationAsString: string;
    publishedAt: string;
    file:{
      url: string;
      type: string;
      duration: number;
    }
  }


export type Episodespage = {
    content?: Episode [];
    totalPages: number;
    totalElements?: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size?: number;
    number: number;
    empty?: boolean;
}