# README

Basically, it contains

- `content/chapters` ~ all `114` chapters of Qur'an in `JSON` files with translations in English/Urdu and 5-volume commentary in English language.
- `content/json` ~ it contains
  - `allOfQuran.json.js` ~ All of the Qur'an in one file with translations and commentary
  - `allTopics.json` ~ List of broad range of topics (*contains duplicates*)
  - `topics.json.js` ~ List of broad range of **unique** topics
  - `topicVerses.json.js` ~ All the verses (with translations and commentary) grouped under unique topics
  - `sortedTopicsASC.json.js` ~ List of broad range of *unique* topics sorted by the number of verses per topic in **ascending** order
  - `sortedTopicsDESC.json.js` ~ List of broad range of *unique* topics sorted by the number of verses per topic in **descending** order

## Source

All the data that I have extracted is from this [`API`](https://www.alislam.org/quran/read/api.php?action=chapter&v=1:1)
