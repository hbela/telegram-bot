import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    try {
      i18n.changeLanguage(lng);
      localStorage.setItem("i18nextLng", lng);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base font-medium
          ${
            i18n.language === "en"
              ? "bg-telegram-primary text-white"
              : "bg-white text-telegram-primary border-2 border-telegram-primary hover:bg-telegram-primary hover:text-white"
          }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("hu")}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base font-medium
          ${
            i18n.language === "hu"
              ? "bg-telegram-primary text-white"
              : "bg-white text-telegram-primary border-2 border-telegram-primary hover:bg-telegram-primary hover:text-white"
          }`}
      >
        Hungarian
      </button>
    </div>
  );
}

export default LanguageSwitcher;
