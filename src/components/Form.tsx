import { useState } from "react";
import Client from "../core/Client";
import Input from "./Input";
import Button from "./Button";

interface IFormProps {
  client: Client;
  canceled?: () => void;
  clientChanged?: (client: Client) => void;
}

export default function Form(props: IFormProps) {
  const client_id = props.client?.id;

  const [name, setName] = useState(props.client?.name ?? "");
  const [age, setAge] = useState(props.client?.age ?? 0);

  return (
    <div>
      {client_id ? <Input text="ID" value={client_id} readonly /> : false}
      <Input text="Name" value={name} valueChanged={setName} className="mb-5" />
      <Input
        text="Age"
        type="number"
        value={age}
        valueChanged={setAge}
        className="mb-5"
      />
      <div className="flex justify-end mt-3">
        <Button
          color="blue"
          className="mr-2"
          onClick={() =>
            props.clientChanged?.(new Client(name, +age, client_id))
          }
        >
          {client_id ? "Edit" : "Save"}
        </Button>
        <Button color="gray" onClick={props.canceled}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
