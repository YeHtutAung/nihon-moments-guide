import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageEffect = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update body data attribute for font styling
    document.body.setAttribute('data-lang', i18n.language);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
};
