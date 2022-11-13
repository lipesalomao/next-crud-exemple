import Client from "./Client";

export interface ClientRepo {
    save: (client: Client) => Promise<Client>;
    delete: (id: string) => Promise<void>;
    getAll: () => Promise<Client[]>;
}