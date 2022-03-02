export default class BaseLocalStorageService {

    public static get<T>(key: string): T {

        const valor = localStorage.getItem(key) ?? ""
        const result:T = JSON.parse(valor)
        return result

    }

    public static delete(key: string): boolean {
        try {
            localStorage.removeItem(key)
            return true
        } catch (error) {
            return false
        }
    }
    public static set<T>(key: string, obj: T): void {
        localStorage.setItem(key, JSON.stringify(obj))
    }

}