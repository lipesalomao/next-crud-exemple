import Client from "../core/Client";
import { EditIcon, TrashIcon } from "./Icons";

interface ITableProps {
  clients: Client[];
  selectedClient?: (client: Client) => void;
  deletedClient?: (client: Client) => void;
}

export default function Table(props: ITableProps) {
  const showActions = props.selectedClient || props.deletedClient;

  function renderTableHeader() {
    return (
      <tr>
        <th className={`text-left p-4`}>ID</th>
        <th className={`text-left p-4`}>Name</th>
        <th className={`text-left p-4`}>Age</th>
        {showActions ? <th className={`p-4`}>Actions</th> : false}
      </tr>
    );
  }

  function renderTableData() {
    return props.clients?.map((client, index) => {
      const { id, name, age } = client; //destructuring
      return (
        <tr
          key={id}
          className={`${index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className={`text-left p-4`}>{id}</td>
          <td className={`text-left p-4`}>{name}</td>
          <td className={`text-left p-4`}>{age}</td>
          {showActions ? renderActions(client) : false}
        </tr>
      );
    });
  }

  function renderActions(client: Client) {
    return (
      <td className="flex justify-center">
        {props.selectedClient ? (
          <button
            onClick={() => props.selectedClient?.(client)}
            className={`
            flex justify-center items-center
          text-green-600 rounded-full p-2 m-1
          hover:bg-purple-50
        `}
          >
            {EditIcon}
          </button>
        ) : (
          false
        )}
        {props.deletedClient ? (
          <button
            onClick={() => props.deletedClient?.(client)}
            className={`
            flex justify-center items-center
          text-red-500 rounded-full p-2 m-1
          hover:bg-purple-50
        `}
          >
            {TrashIcon}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table
      className={`
      overflow-hidden
      w-full rounded-xl
    `}
    >
      <thead
        className={`
          bg-gradient-to-r from-purple-500 to-purple-800
          text-gray-100
          `}
      >
        {renderTableHeader()}
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
}
