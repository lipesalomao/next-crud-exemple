import type { NextPage } from "next";
import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

const Home: NextPage = () => {
  const clientsArray = [
    new Client("Joe", 45, "1"),
    new Client("Mary", 23, "2"),
    new Client("Bob", 67, "3"),
  ];
  const [visible, setVisible] = useState<"table" | "form">("table");

  function selectedClient(client: Client) {
    console.log(client);
  }

  function deletedClient(client: Client) {
    console.log(client);
  }

  function saveClient(client: Client) {
    console.log(client);
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
              <Button
                onClick={() => setVisible("form")}
                color="green"
                className="mb-4"
              >
                Add new
              </Button>
            </div>
            <Table
              clients={clientsArray}
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            />
          </>
        ) : (
            <Form
              canceled={() => setVisible("table")}
              client={clientsArray[1]}
              clientChanged={saveClient}
            />
        )}
      </Layout>
    </div>
  );
};

export default Home;
