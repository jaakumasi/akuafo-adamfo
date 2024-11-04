import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  getLocalItem(key: string) {
    const item = globalThis.sessionStorage?.getItem(key)
    if (item) return JSON.parse(item)
    return null
  }

  setLocalItem(key: string, data: unknown) {
    globalThis.sessionStorage?.setItem(key, JSON.stringify(data))
  }

  removeItem(key: string) {
    globalThis.sessionStorage?.removeItem(key)
  }
}
