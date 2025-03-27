import db from "../config/database";
import { Music } from "../types/type";

export const insertManyMusics = (musicArray: Music[]): void => {
  console.log("🎵 INSERTING MUSIC:", musicArray);

  const insert = db.prepare(`
    INSERT OR IGNORE INTO music (name, mood, url, ctg)
    VALUES (?, ?, ?, ?)
  `);

  const insertMany = db.transaction((musics: Music[]) => {
    musics.forEach(({ name, mood, url, ctg }) => {
      insert.run(name, mood, url, ctg);
    });
  });

  insertMany(musicArray);
};

export const getAllMusics = (): Music[] => {
  return db.prepare("SELECT * FROM music").all() as Music[];
};

export const deleteAllMusics = (): void => {
  db.prepare("DELETE FROM music").run();
};
