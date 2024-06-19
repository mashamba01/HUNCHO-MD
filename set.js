const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0NvV2F1R1c4MHRDbEhza05sSkxWMEpIYVVKd2M3QUtYM2hDQlNwR0lHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGkrWTdyT1dBa2FzZnQ2VE9IbHlCR0ZNRnRxN2RrN0sxazdHa2ZpMFpVST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSXZMYnFZd2VVYmU2Q1ZiZnUya2NzSUtra2I2WEZiRmlJMHgvV1ZSeVUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQ05zblJOS3J6amxrc0lFd3Fsblh5ZEdmaERqTldQa0Zsb3diUWJPUFRzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVJUHlQQTZzTUxOcjMydzdvdEY5TGF0YzNOTTZGL2lUeitFSjd3TXV1RzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpuNC9laWlPWXhTbTlxTHpPdEl2SWV6NzNjT2ErK0ZUeW5adjdlbk81WDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUpna1ZyRjVzMHJvTVhha01xQWd3bzFzK3NYaENsVDlZR2lnSDVHVnNHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkVxSG92bFh4SmFtWEdyalREMlpuODhLdVF4cmNTdHZSZmxaZ0RDaXdBWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBEZUJiMUlTUExwcmhwL1M1Ty9Fc3g5WUdMUFl3ZHRvZjIvc0hMaURoanFpVnJPUnJiZXp1TWJ0Y0MrdWxMVStCVkI5d1BPUUR5QzF2U3A0Tm01cGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgxLCJhZHZTZWNyZXRLZXkiOiI3Zklad0xQV2NicXNMVEFaeGZ3SzA2eU1nMTFyUVh2ZVNqTGF0dmhMWkNrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NjQyNTAxMzE0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM2RjhERDM1RTQ0NjlGQUM0RTUwN0QwOTYxQjRBQTQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTg4MTM2OTl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NjQyNTAxMzE0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjUwM0IyNkRERjVCNEFCQjEwMjdGODA4QzJFNUEzRTYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTg4MTM2OTl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBrRjU4aTVyU01hRWlRT1pMV3MzY1EiLCJwaG9uZUlkIjoiZGQ4MTVkNjctM2UxMy00YzNjLTg1ZGMtNmY4ZTJkZDk5NTlhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllGZW5uR0orRDd1RDB1N0NJZzk1N2VsL2F5VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzQ3dnc3hpbExpWWhxaS9sSmkwcGJSU08ySjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUgzUzM0RzciLCJtZSI6eyJpZCI6IjI3NjQyNTAxMzE0OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2hhbWJmbGl4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMRCt1dmtCRVBHSHpMTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTZHYvWG1ZQm1iM05xYW1POGdmOGJkNHF6Z1p6bk1lMlZwdTZISk5QZ3dVPSIsImFjY291bnRTaWduYXR1cmUiOiJqZTFuSlNOOUsrNWFNT1c1MlBYbWdDMHVPZGFFL0Y0T3ZHSys4YlY3M1hYVHoycHlPREx3TTFoQStlK0tyWTFCSm5rWGRFWVlidDZvd05MSmZoa1NEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOWkyOGJBd0ttUTdvVVdzQ1ZMKzI0NHBNemEvVnU4Ymw2cVpRaXkvY05BbHV5OGRZTDNkaDdPQWpRaGJPTDhDRlgvMEsvcGJiZExnSUhSY3BzUlFRamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzY0MjUwMTMxNDo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVuYi8xNW1BWm05emFtcGp2SUgvRzNlS3M0R2M1ekh0bGFidWh5VFQ0TUYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg4MTM2OTUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDJuIn0=',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "Jr Shamblo",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "27642501314",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'SHAMBFLIX MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
