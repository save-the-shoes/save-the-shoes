# save-the-shoes
An app for calculating O2 times for fire fighters entering buildings

Install
---

`npm install`

Development
---

`open ios/SaveTheShoes.xcodeproj`
`npm run autotest`

Tests
---

`npm test`

Release
---

```
  git fetch
  git checkout release
  git pull origin master
  react-native bundle
  git commit -am "Update bundle"
  <build and release with xcode>
```
