import type { NextPage } from "next";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

const Home: NextPage = () => {
  const clientsArray = [
    new Client("Joe", 45, "1"),
    new Client("Mary", 23, "2"),
    new Client("Bob", 67, "3"),
  ];

  function selectedClient(client: Client) {
    console.log(client);
  }
  function deletedClient(client: Client) {
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
        <Table
          clients={clientsArray}
          selectedClient={selectedClient}
          deletedClient={deletedClient}
        />
      </Layout>
    </div>
  );
};

export default Home;
