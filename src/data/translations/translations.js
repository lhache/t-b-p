import counterpart from 'counterpart'
import translations from './translations.json'
import _first from 'lodash/first'

// update in order to add languages
export const defaultLocale = "de-DE"
export const supportedLanguages = ['de-DE', 'en-US']

// loads all translation data to counterpart
export function registerTranslations () {
  supportedLanguages.forEach((lang) => {
    counterpart.registerTranslations(lang, translations[lang]);
  });

  setDefaultLocale();
}

export const getLocale = () => counterpart.getLocale()
export const getShortenedLocale = () => _first(counterpart.getLocale().split('-'))
export const getFullLocale = () => counterpart.getLocale()

function setDefaultLocale() {
  counterpart.setLocale(defaultLocale);
}
