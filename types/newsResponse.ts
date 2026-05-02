export type NewsSource = {
  id: string | null;
  name: string;
};
 
export type NewsItems = {
  source: NewsSource;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};
 
export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsItems[];
};
 