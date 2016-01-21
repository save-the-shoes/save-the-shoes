[![Stories in Ready](https://badge.waffle.io/save-the-shoes/save-the-shoes.png?label=ready&title=Ready)](https://waffle.io/save-the-shoes/save-the-shoes)
# save-the-shoes
> This is the best fucking thing I have seen for our crew in the 28 years I have been a firefighter

An app for calculating O2 times for fire fighters entering buildings

Install
---

`npm install`

Development - iOS
---

`open ios/SaveTheShoes.xcodeproj`
`npm run autotest`

Development - Android
---

`open an Android Emulator`
`react-native run-android`

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
