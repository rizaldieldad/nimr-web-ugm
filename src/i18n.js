import { createI18n } from "vue-i18n"
import id from "./locales/id.json"
import en from "./locales/en.json"

// load language from local storage with default english
const savedLocale = localStorage.getItem("locale") || "en"

const i18n = createI18n({
  legacy: false, // for composition api usage
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    id,
    en
  }
})

export default i18n