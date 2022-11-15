import { useEffect } from "react";
import { useState } from "react";
import ClientCollection from "../../firebase/db/ClientCollection";
import Client from "../core/Client";
import { ClientRepo } from "../core/ClientRepo";
import useTableToggle from "./useTableToggle";

export default function useClients() {
  const repo: ClientRepo = new ClientCollection();

  const { tableVisible, formVisible, showTable, showForm } = useTableToggle();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<"table" | "form">("table");

  useEffect(() => {
    getAllClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllClients() {
    await repo.getAll().then((clients) => {
      setClients(clients);
      showTable();
    });
  }

  function selectClient(client: Client) {
    setClient(client);
    showForm();
  }

  async function deleteClient(client: Client) {
    if (client.id) {
      await repo.delete(client?.id).then(async (client) => {
        await getAllClients();
      });
    }
  }

  async function saveClient(client: Client) {
    await repo.save(client);
    await getAllClients();
  }

  function newClient() {
    setClient(Client.empty());
    showForm();
  }

  return {
      newClient,
      saveClient,
      deleteClient,
      selectClient,
      client,
      clients,
      tableVisible,
      showTable,
  };
}
