#!
cd dist
cp ../firebase.json.EXAMPLE.MOVE.TO.DIST  firebase.json
cp ../security-rules.json .
firebase deploy
