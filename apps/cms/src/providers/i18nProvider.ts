// in src/i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import japaneseMessages from '@bicstone/ra-language-japanese';

export const i18nProvider = polyglotI18nProvider(() => japaneseMessages, 'ja');
