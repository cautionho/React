class PdaStorage {
  Get: (Key: string) => any = (Key: string): any => { return JSON.parse(localStorage.getItem(Key) || '{}') }
  Set: (Key: string, Val: any) => void = (Key: string, Val: any): void => { localStorage.setItem(Key, JSON.stringify(Val)) }
  Del: (Key: string) => void = (Key: string): void => { localStorage.removeItem(Key) }
}

export default new PdaStorage()