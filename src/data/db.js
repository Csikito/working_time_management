import { openDB } from "idb";

const dbPromise = openDB("working-time-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("workEntries")) {
      db.createObjectStore("workEntries", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

export async function addWorkEntry(entry) {
  const db = await dbPromise;
  await db.add("workEntries", entry);
}

export async function getAllWorkEntries() {
  const db = await dbPromise;
  return await db.getAll("workEntries");
}

export async function deleteWorkEntry(id) {
  const db = await dbPromise;
  await db.delete("workEntries", id);
}

export async function updateWorkEntry(entry) {
  const db = await dbPromise;
  await db.put("workEntries", entry);
}
