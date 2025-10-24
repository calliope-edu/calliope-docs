import { persisted } from 'svelte-persisted-store'


export const languagesMeta = /** @type {const} */ ({
    "en": {
      "name": "English",
      "flag": "ðŸ‡¬ðŸ‡§",
      "code": "en-GB",
      "path": '/en/',
      "key": 'de'
    },
    "de": {
      "name": "Deutsch",
      "flag": "ðŸ‡©ðŸ‡ª",
      "code": "de-DE",
      "path": '/',
      "key": 'de'
    }
  })

export const defaultLanguage = languagesMeta['de'];

export const selectedBoardVersion = persisted('selectedBoardVersion', 3);
