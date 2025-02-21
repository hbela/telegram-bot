import "./App.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Mock Telegram WebApp in development
    if (process.env.NODE_ENV === "development") {
      if (!window.Telegram) {
        window.Telegram = {
          WebApp: {
            initData: "",
            initDataUnsafe: {
              user: {
                id: 123456789,
                first_name: "Test",
                last_name: "User",
                language_code: "en",
              },
              themeParams: {
                bg_color: "#ffffff",
                text_color: "#000000",
              },
            },
            ready: () => console.log("Telegram Web App mocked as ready."),
            expand: () => console.log("Telegram Web App mocked expand."),
            close: () => console.log("Telegram Web App mocked close."),
            sendData: (data: string) => console.log("Mock sending data:", data),
            themeParams: {
              bg_color: "#ffffff",
              text_color: "#000000",
            },
            MainButton: {
              text: "",
              color: "#0088cc",
              textColor: "#ffffff",
              isVisible: false,
              isActive: true,
              setText: (text: string) =>
                console.log("MainButton setText:", text),
              onClick: (callback: () => void) => callback(),
              show: () => console.log("MainButton show"),
              hide: () => console.log("MainButton hide"),
              enable: () => console.log("MainButton enable"),
              disable: () => console.log("MainButton disable"),
            },
          },
        };
      }
    }

    // Initialize Telegram Web App
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.ready();
      console.log("Telegram Web App is ready!");
    } else {
      console.warn("Telegram Web App not available. Running outside Telegram?");
    }

    // Load initial translations
    const loadTranslations = async () => {
      const savedLang = localStorage.getItem("i18nextLng") || "en";
      try {
        await i18n.changeLanguage(savedLang);
        await i18n.reloadResources(savedLang, ["translation"]);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [i18n]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-telegram-primary">
          Telegram Language App
        </h1>
        <p className="text-lg md:text-xl text-center mb-8">{t("greeting")}</p>
        <LanguageSwitcher />
        <p className="text-sm md:text-base text-center text-gray-600 mt-4">
          {t("changeLanguage")}
        </p>
      </div>
    </div>
  );
}

export default App;
