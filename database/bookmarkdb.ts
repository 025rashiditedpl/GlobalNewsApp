import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('Bookmark.db');

export default db;

export const createTables = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS Bookmarks (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id     TEXT,
      source_name   TEXT    NOT NULL,
      author        TEXT,
      title         TEXT,
      description   TEXT,
      url           TEXT    NOT NULL UNIQUE,
      urlToImage    TEXT,
      publishedAt   TEXT,
      content       TEXT
    );
  `);
};