import { useTranslation } from "react-i18next";
import { useCallback, useState, useEffect } from "react";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  // Initialize with user's Telegram language if available
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp?.initDataUnsafe?.user?.language_code) {
      i18n.changeLanguage(webApp.initDataUnsafe.user.language_code);
    }
  }, [i18n]);

  const changeLanguage = useCallback(
    async (lng: string) => {
      try {
        setIsChanging(true);
        await i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
        // Force reload translations
        await i18n.reloadResources(lng, ["translation"]);

        // Use Telegram's MainButton to confirm language change
        if (window.Telegram?.WebApp) {
          const webApp = window.Telegram.WebApp;
          // Send the language change back to the bot
          webApp.MainButton.setText(
            `Confirm ${lng === "en" ? "English" : "Hungarian"}`
          );
          webApp.MainButton.show();
          webApp.MainButton.onClick(() => {
            webApp.close();
          });
        }
      } catch (error) {
        console.error("Error changing language:", error);
      } finally {
        setIsChanging(false);
      }
    },
    [i18n]
  );

  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        onClick={() => changeLanguage("en")}
        disabled={isChanging}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base font-medium
          ${isChanging ? "opacity-50 cursor-not-allowed" : ""}
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
        disabled={isChanging}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base font-medium
          ${isChanging ? "opacity-50 cursor-not-allowed" : ""}
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
