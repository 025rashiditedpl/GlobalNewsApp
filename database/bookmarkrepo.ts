import { NewsItems } from "@/types/newsResponse";
import db from './bookmarkdb';
import { DbNews } from "@/types/dbnews";

export const addNews = (
  newsItem:DbNews
) => {
  try {
    db.runSync(
      'INSERT OR IGNORE INTO Bookmarks (source_id, source_name, author,title,description,url,urlToImage,publishedAt,content) VALUES (?, ?, ?,?,?,?,?,?,?)',
      [
        newsItem.source_id,
        newsItem.source_name,
        newsItem.author,
        newsItem.title,
        newsItem.description,
        newsItem.url,
        newsItem.urlToImage,
        newsItem.publishedAt,
        newsItem.content
      ]
    );
  } catch (error) {
    console.log('Insert Error:', error);
  }
};

export const getAllNews = (): DbNews[] => {
  try {
    const result = db.getAllSync('SELECT * FROM Bookmarks');

    return result as DbNews[]; 
  } catch (error) {
    console.log('Fetch Error:', error);
    return [];
  }
}

export const deleteNews = (id: number) => {
  try {
    db.runSync('DELETE FROM Bookmarks WHERE id = ?', [id]);
  } catch (error) {
    console.log('Delete Error:', error);
  }
};
export const deleteNewsByUrl = (url: string) => {
  try {
    db.runSync('DELETE FROM Bookmarks WHERE url = ?', [url]);
  } catch (error) {
    console.log('Delete by URL Error:', error);
  }
};
export const deleteAllNews = async () => {
  try {
    await db.runAsync('DELETE FROM Bookmarks');
  } catch (error) {
    console.log('Delete All Error:', error);
  }
};


;