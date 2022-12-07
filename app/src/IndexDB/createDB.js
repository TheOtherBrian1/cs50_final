import Dexie from 'dexie';

// export default function createDB() {
//     if(owner){
//         const db = new Dexie(owner);
//         db.version(1).stores({

//         });
//         db.open().catch(function (err) {
//             console.error (err.stack || err);
//         });
//         return db;
//     }
//     else{
//         return null;
//     }
// }

const db = new Dexie("Database");
db.version(1).stores({

});
db.open().catch(function (err) {
    console.error (err.stack || err);
});
export default db;