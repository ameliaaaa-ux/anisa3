
export interface Song {
  title: string;
  duration: string;
  year: number;
  streams?: string;
}

export interface Album {
  title: string;
  year: number;
  coverUrl: string;
  description: string;
}

export interface Achievement {
  award: string;
  year: number;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'Update' | 'Concert' | 'Release' | 'Award';
}

export interface Artist {
  name: string;
  genre: string;
  bio: string;
  origin: string;
  activeSince: string;
  imageUrl: string;
  officialUrl: string; 
  instagramUrl?: string;
  twitterUrl?: string;
  themeColor: string;
  popularTracks: Song[];
  albums: Album[];
  achievements: Achievement[];
  news: NewsItem[];
  stats: {
    monthlyListeners: string;
    globalRank: string;
    followers: string;
  };
}

export type ViewType = 'home' | 'profile' | 'songs' | 'gallery' | 'news' | 'contact' | 'admin';
