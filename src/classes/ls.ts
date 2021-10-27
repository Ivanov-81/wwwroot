export class LS {

    static get(name: string) {
        try {
            let ls = localStorage.getItem(name);
            return ls ? JSON.parse(ls) : ls;
        } catch (error) {
            throw error;
        }
    }

    static set(name: string, data: any) {
        localStorage.setItem(name, JSON.stringify(data));
    }
    
}
