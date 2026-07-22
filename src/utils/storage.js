const KEYS = {
  PIN: 'ptk_pin',
  HISTORY: 'ptk_login_history',
  BANNER: 'ptk_banner',
  BANNER_DISMISSED: 'ptk_banner_dismissed'
}

const DEFAULT_PIN = '1234'

export function getPin() {
  return localStorage.getItem(KEYS.PIN) || DEFAULT_PIN
}

export function setPin(newPin) {
  localStorage.setItem(KEYS.PIN, newPin)
}

export function addLoginHistory(device, browser) {
  const list = getLoginHistory()
  list.unshift({
    id: crypto.randomUUID(),
    device,
    browser,
    time: new Date().toLocaleString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    timestamp: Date.now()
  })
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(list))
}

export function getLoginHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]')
  } catch {
    return []
  }
}

export function getBanner() {
  return localStorage.getItem(KEYS.BANNER) || ''
}

export function setBanner(text) {
  localStorage.setItem(KEYS.BANNER, text)
}

export function isBannerDismissed() {
  return localStorage.getItem(KEYS.BANNER_DISMISSED) === '1'
}

export function dismissBanner() {
  localStorage.setItem(KEYS.BANNER_DISMISSED, '1')
}

export function resetBannerDismiss() {
  localStorage.removeItem(KEYS.BANNER_DISMISSED)
}
