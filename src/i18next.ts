import i18next from "i18next"
import backend from "i18next-http-backend"
import yaml from "yaml"
import { initReactI18next } from "react-i18next"

i18next
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: "vi",
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.yaml",
      parse: (data: any) => yaml.parse(data)
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
