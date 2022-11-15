import type { NextPage } from "next";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

const Home: NextPage = () => {
  const {
    deleteClient,
    newClient,
    saveClient,
    selectClient,
    client,
    clients,
    tableVisible,
    showTable,
  } = useClients();

  return (
    <div
      className={`flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-400 to-purple-500
      text-white
      `}
    >
      <Layout title="Simple Registration Example">
        {tableVisible ? (
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
              selectedClient={selectClient}
              deletedClient={deleteClient}
            />
          </>
        ) : (
          <Form
            client={client}
            canceled={showTable}
            clientChanged={saveClient}
          />
        )}
      </Layout>
    </div>
  );
};

export default Home;
