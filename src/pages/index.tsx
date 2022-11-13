import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ClientCollection from "../../firebase/db/ClientCollection";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import { ClientRepo } from "../core/ClientRepo";

const Home: NextPage = () => {
  const repo: ClientRepo = new ClientCollection();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<"table" | "form">("table");

  useEffect(() => {
    getAllClients;
  }, []);

  function getAllClients() {
    repo.getAll().then((clients) => {
      setClients(clients);
      setVisible("table");
    });
  }

  function selectedClient(client: Client) {
    setClient(client);
    setVisible("form");
  }

  function deletedClient(client: Client) {
    if (client.id) {
      repo.delete(client?.id).then((client) => {
        getAllClients();
      });
    }
  }

  async function saveClient(client: Client) {
    getAllClients();
    await repo.save(client);
  }

  function newClient() {
    setClient(Client.empty());
    setVisible("form");
  }

  return (
    <div
      className={`flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-400 to-purple-500
      text-white
      `}
    >
      <Layout title="Simple Registration Example">
        {visible === "table" ? (
          <>
            <div
              className={`
          flex justify-end
        `}
            >
              <Button onClick={newClient} color="green" className="mb-4">
                Add new
              </Button>
            </div>
            <Table
              clients={clients}
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            canceled={() => setVisible("table")}
            clientChanged={saveClient}
          />
        )}
      </Layout>
    </div>
  );
};

export default Home;
