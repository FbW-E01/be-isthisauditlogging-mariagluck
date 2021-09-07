import {Low, JSONFile } from 'lowdb';


const adapter = new JSONFile("./db.json");
const db = new Low(adapter);


await db.read();

db.data = db.data || { messages: [] };

const isoDate = new Date().toISOString() + " /secret accessed";
db.data.messages.push(isoDate);
console.log(db.data.messages);

await db.write();


