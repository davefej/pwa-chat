CALL npm run build
CALL robocopy dist ../chat-server/public /s /e /is /it
CALL echo "\r\n" >> ../chat-server/public/sw.js
CALL type static\swextra.js >> ..\chat-server\public\sw.js

