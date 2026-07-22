const KEYS = {
  PIN: 'ptk_pin',
  HISTORY: 'ptk_login_history',
  BANNER: 'ptk_banner',
  BANNER_DISMISSED: 'ptk_banner_dismissed',
  DEVICE_ID: 'ptk_device_id'
}

const DEFAULT_PIN = '1234'

export function getDeviceId() {
  let id = localStorage.getItem(KEYS.DEVICE_ID)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(KEYS.DEVICE_ID, id)
  }
  return id
}

export function getPin() {
  return localStorage.getItem(KEYS.PIN) || DEFAULT_PIN
}

export function setPin(newPin) {
  localStorage.setItem(KEYS.PIN, newPin)
}

export function addLoginHistory(device, browser) {
  const all = getLoginHistoryAll()
  all.unshift({
    id: crypto.randomUUID(),
    deviceId: getDeviceId(),
    device,
    browser,
    time: new Date().toLocaleString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    timestamp: Date.now()
  })
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(all))
}

function getLoginHistoryAll() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]')
  } catch {
    return []
  }
}

export function getLoginHistory() {
  return getLoginHistoryAll().filter(h => h.deviceId === getDeviceId())
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
