import { openDB } from 'idb';

const initdb = async () =>
  // We are creating a new database named 'contact' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function we will use to PUT (update) on the database.
export const putDb = async (content) => {
  console.log('PUT from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges (readwrite for PUT, POST, and DELETE).
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method to update a piece of data from the database based on the id.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request and print confirmation to console.
  const result = await request;
  console.log('🚀 data saved to the database', result.value);
};

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(1);

  // Get confirmation of the request and print confirmation to console.
  const result = await request;
  console.log('🚀 data retrieved from the database', result)
  console.log(result.value)
  return result?.value;
};

// Start the database
initdb();
