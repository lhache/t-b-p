import counterpart from 'counterpart';
import translations from './translations.json';
import _first from 'lodash/first';

// update in order to add languages
export const supportedLanguages = ['de', 'en'];

// loads all translation data to counterpart
export function registerTranslations () {
  supportedLanguages.forEach((lang) => {
    counterpart.registerTranslations(lang, translations[lang]);
  });

  setDefaultLocale();
}

function setDefaultLocale() {
  counterpart.setLocale(_first(supportedLanguages));
}
