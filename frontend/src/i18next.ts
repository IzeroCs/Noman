import i18next from "i18next"
import { initReactI18next } from "react-i18next"

i18next
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        common: require("./locales/vi/common.json"),
        explorer: require("./locales/vi/explorer.json")
      }
    },
    lng: "vi",
    fallbackLng: "en",
    debug: true,
    defaultNS: "common",
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
