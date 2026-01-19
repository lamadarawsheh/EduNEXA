import React, { useState } from 'react';

const LanguageSelector = ({ onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const languages = [
    { code: 'ar', name: 'Arabic', flagCode: 'sa', nativeName: 'العربية' },
    { code: 'en', name: 'English', flagCode: 'gb', nativeName: 'English' },
    { code: 'fr', name: 'French', flagCode: 'fr', nativeName: 'Français' },
    { code: 'de', name: 'German', flagCode: 'de', nativeName: 'Deutsch' },
    { code: 'es', name: 'Spanish', flagCode: 'es', nativeName: 'Español' },
    { code: 'it', name: 'Italian', flagCode: 'it', nativeName: 'Italiano' },
    { code: 'ru', name: 'Russian', flagCode: 'ru', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', flagCode: 'cn', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flagCode: 'jp', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flagCode: 'kr', nativeName: '한국어' },
    { code: 'hi', name: 'Hindi', flagCode: 'in', nativeName: 'हिन्दी' },
    { code: 'pt', name: 'Portuguese', flagCode: 'pt', nativeName: 'Português' },
    { code: 'tr', name: 'Turkish', flagCode: 'tr', nativeName: 'Türkçe' },
    { code: 'nl', name: 'Dutch', flagCode: 'nl', nativeName: 'Nederlands' },
    { code: 'pl', name: 'Polish', flagCode: 'pl', nativeName: 'Polski' },
    { code: 'sv', name: 'Swedish', flagCode: 'se', nativeName: 'Svenska' },
    { code: 'no', name: 'Norwegian', flagCode: 'no', nativeName: 'Norsk' },
    { code: 'da', name: 'Danish', flagCode: 'dk', nativeName: 'Dansk' },
    { code: 'fi', name: 'Finnish', flagCode: 'fi', nativeName: 'Suomi' },
    { code: 'el', name: 'Greek', flagCode: 'gr', nativeName: 'Ελληνικά' },
    { code: 'he', name: 'Hebrew', flagCode: 'il', nativeName: 'עברית' },
    { code: 'th', name: 'Thai', flagCode: 'th', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', flagCode: 'vn', nativeName: 'Tiếng Việt' },
    { code: 'id', name: 'Indonesian', flagCode: 'id', nativeName: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Malay', flagCode: 'my', nativeName: 'Bahasa Melayu' },
    { code: 'fa', name: 'Persian', flagCode: 'ir', nativeName: 'فارسی' },
    { code: 'ur', name: 'Urdu', flagCode: 'pk', nativeName: 'اردو' },
    { code: 'bn', name: 'Bengali', flagCode: 'bd', nativeName: 'বাংলা' },
    { code: 'uk', name: 'Ukrainian', flagCode: 'ua', nativeName: 'Українська' },
    { code: 'cs', name: 'Czech', flagCode: 'cz', nativeName: 'Čeština' },
    { code: 'hu', name: 'Hungarian', flagCode: 'hu', nativeName: 'Magyar' },
    { code: 'ro', name: 'Romanian', flagCode: 'ro', nativeName: 'Română' },
    { code: 'bg', name: 'Bulgarian', flagCode: 'bg', nativeName: 'Български' },
    { code: 'sr', name: 'Serbian', flagCode: 'rs', nativeName: 'Srpski' },
    { code: 'hr', name: 'Croatian', flagCode: 'hr', nativeName: 'Hrvatski' },
    { code: 'sk', name: 'Slovak', flagCode: 'sk', nativeName: 'Slovenčina' },
    { code: 'sl', name: 'Slovenian', flagCode: 'si', nativeName: 'Slovenščina' },
    { code: 'lt', name: 'Lithuanian', flagCode: 'lt', nativeName: 'Lietuvių' },
    { code: 'lv', name: 'Latvian', flagCode: 'lv', nativeName: 'Latviešu' },
    { code: 'et', name: 'Estonian', flagCode: 'ee', nativeName: 'Eesti' },
    { code: 'sq', name: 'Albanian', flagCode: 'al', nativeName: 'Shqip' },
    { code: 'mk', name: 'Macedonian', flagCode: 'mk', nativeName: 'Македонски' },
    { code: 'ka', name: 'Georgian', flagCode: 'ge', nativeName: 'ქართული' },
    { code: 'hy', name: 'Armenian', flagCode: 'am', nativeName: 'Հայերեն' },
    { code: 'az', name: 'Azerbaijani', flagCode: 'az', nativeName: 'Azərbaycan' },
    { code: 'kk', name: 'Kazakh', flagCode: 'kz', nativeName: 'Қазақша' },
    { code: 'uz', name: 'Uzbek', flagCode: 'uz', nativeName: 'Oʻzbek' },
    { code: 'sw', name: 'Swahili', flagCode: 'ke', nativeName: 'Kiswahili' },
    { code: 'af', name: 'Afrikaans', flagCode: 'za', nativeName: 'Afrikaans' },
    { code: 'am', name: 'Amharic', flagCode: 'et', nativeName: 'አማርኛ' },
    { code: 'ne', name: 'Nepali', flagCode: 'np', nativeName: 'नेपाली' },
    { code: 'si', name: 'Sinhala', flagCode: 'lk', nativeName: 'සිංහල' },
    { code: 'my', name: 'Burmese', flagCode: 'mm', nativeName: 'မြန်မာ' },
    { code: 'km', name: 'Khmer', flagCode: 'kh', nativeName: 'ខ្មែរ' },
    { code: 'lo', name: 'Lao', flagCode: 'la', nativeName: 'ລາວ' },
    { code: 'mn', name: 'Mongolian', flagCode: 'mn', nativeName: 'Монгол' },
    { code: 'is', name: 'Icelandic', flagCode: 'is', nativeName: 'Íslenska' },
    { code: 'mt', name: 'Maltese', flagCode: 'mt', nativeName: 'Malti' },
    { code: 'cy', name: 'Welsh', flagCode: 'gb-wls', nativeName: 'Cymraeg' },
    { code: 'ga', name: 'Irish', flagCode: 'ie', nativeName: 'Gaeilge' },
    { code: 'eu', name: 'Basque', flagCode: 'es', nativeName: 'Euskara' },
    { code: 'ca', name: 'Catalan', flagCode: 'es-ct', nativeName: 'Català' },
    { code: 'gl', name: 'Galician', flagCode: 'es-ga', nativeName: 'Galego' }
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
  };

  const handleChoose = () => {
    if (selectedLanguage) {
      const selected = languages.find(lang => lang.code === selectedLanguage);
      console.log('Selected language:', selected);
      alert(`Language changed to: ${selected.name} (${selected.nativeName})`);
      if (onBack) onBack();
    } else {
      alert('Please select a language first');
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex justify-center items-center p-5">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <button 
          className="flex items-center gap-2 bg-transparent border-none text-teal-600 text-sm cursor-pointer p-2 mb-5 hover:text-teal-800 transition-all"
          onClick={handleBackClick}
        >
          <span className="text-xl font-bold">←</span> Back
        </button>

        <div className="text-center">
          <h2 className="text-gray-800 text-2xl mb-5 font-semibold">Choose Language</h2>

          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search Language"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">🔍</span>
          </div>

          <div className="flex flex-col gap-2 mb-5 max-h-96 overflow-y-auto pr-1">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedLanguage === lang.code
                      ? 'border-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg'
                      : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:translate-x-1'
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <div className="w-10 h-8 rounded overflow-hidden flex-shrink-0 shadow-md border border-gray-200">
                    <img
                      src={`https://flagcdn.com/w80/${lang.flagCode}.png`}
                      alt={`${lang.name} flag`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://flagcdn.com/w80/${lang.flagCode.split('-')[0]}.png`;
                      }}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-800 text-sm font-semibold">{lang.name}</div>
                    <div className="text-gray-600 text-xs">{lang.nativeName}</div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <span className="text-teal-600 text-2xl font-bold">✓</span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                <p className="text-base">No languages found</p>
              </div>
            )}
          </div>

          <button 
            className={`w-full py-4 rounded-xl text-base font-semibold transition-all ${
              !selectedLanguage
                ? 'bg-gray-300 cursor-not-allowed opacity-60'
                : 'bg-teal-600 text-white cursor-pointer hover:bg-teal-700 hover:-translate-y-1 hover:shadow-2xl'
            }`}
            onClick={handleChoose}
            disabled={!selectedLanguage}
          >
            Choose
          </button>
        </div>
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #2c8b8b;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #1a5555;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;