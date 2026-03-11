import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usFlag from '../us.png';
import spainFlag from '../spain.png';

interface LanguageOption {
  readonly code: 'en' | 'es';
  readonly nameKey: 'language.english' | 'language.spanish';
  readonly imageSrc: string;
  readonly fallbackEmoji: string;
}

const LANGUAGES: ReadonlyArray<LanguageOption> = [
  {
    code: 'en',
    nameKey: 'language.english',
    imageSrc: usFlag,
    fallbackEmoji: '🇺🇸',
  },
  {
    code: 'es',
    nameKey: 'language.spanish',
    imageSrc: spainFlag,
    fallbackEmoji: '🇪🇸',
  },
] as const;

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentLanguage =
    LANGUAGES.find((language) => language.code === i18n.language) ?? LANGUAGES[0];

  const handleSelect = (languageCode: 'en' | 'es') => {
    void i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-[#F2F4F7] px-3 py-2 text-sm font-medium text-[#181D27] shadow-sm hover:bg-[#E4E7EC] transition-colors cursor-pointer"
      >
        <img
          src={currentLanguage.imageSrc}
          alt={t(currentLanguage.nameKey)}
          className="h-5 w-5 rounded-full object-cover"
        />
        <span>{t(currentLanguage.nameKey)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] border border-[#EAECF0] z-50">
          <ul className="py-1">
            {LANGUAGES.map((language) => {
              const isActive = language.code === currentLanguage.code;
              return (
                <li key={language.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(language.code)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm rounded-full cursor-pointer ${
                      isActive ? 'bg-[#3553FF] text-white' : 'text-[#101828] hover:bg-[#F2F4F7]'
                    }`}
                  >
                    <img
                      src={language.imageSrc}
                      alt={t(language.nameKey)}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <span>{t(language.nameKey)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

