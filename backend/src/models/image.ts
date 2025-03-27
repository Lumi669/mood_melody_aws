import db from "../config/database";
import { Image } from "../types/type";

export const insertManyImages = (imageArray: Image[]): void => {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO images (name, mood, url, ctg)
    VALUES (?, ?, ?, ?)
  `);

  const insertMany = db.transaction((images: Image[]) => {
    images.forEach(({ name, mood, url, ctg }) => {
      insert.run(name, mood, url, ctg);
    });
  });

  insertMany(imageArray);
};

export const getAllImages = (): Image[] => {
  return db.prepare("SELECT * FROM images").all() as Image[];
};

export const deleteAllImages = (): void => {
  db.prepare("DELETE FROM images").run();
};
