/*
  Warnings:

  - You are about to drop the `RestaurantImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantImages";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RestaurantImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "RestaurantImage_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
