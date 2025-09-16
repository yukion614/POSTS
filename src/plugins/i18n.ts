// src/plugins/i18n.js
import { createI18n } from 'vue-i18n'
import zhTW from '../locales/zh-TW.json'
import enUS from '../locales/en-US.json'
import jaJP from '../locales/ja-JP.json'

const messages = {
  'zh-TW': zhTW,
  'en-US': enUS,
  'ja-JP': jaJP
}

export const i18n = createI18n({
  locale: 'zh-TW',
  fallbackLocale: 'en-US',
  messages
})
