import { addDoc, collection } from "firebase/firestore";
import { doc, deleteDoc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { ClientRepo } from "./../../src/core/ClientRepo";
import { app, db } from "../config";
import Client from "../../src/core/Client";
import firestore from "firebase/firestore";

export default class ClientCollection implements ClientRepo {
  clientConverter = {
    toFirestore(client: Client) {
      return {
        name: client.name,
        age: client.age,
      };
    },
    fromFirestore(
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions
    ): Client {
      const data = snapshot.data(options);
      return new Client(data?.name, data?.age, snapshot?.id);
    },
  };

  async save(client: Client): Promise<Client> {
    if (client.id) {
      await updateDoc(
        doc(db, `clients/${client.id}`).withConverter(this.clientConverter),
        {
          name: client.name,
          age: client.age,
        }
      );
      return client;
    }

    addDoc(
      collection(db, "clients").withConverter(this.clientConverter),
      client
    );
    return client;
  }

  async delete(id: string): Promise<void> {
    return deleteDoc(
      doc(db, `clients/${id}`).withConverter(this.clientConverter)
    );
  }

  async getAll(): Promise<Client[]> {
    return await getDocs(
      collection(db, "clients").withConverter(this.clientConverter)
    ).then((querySnapshot: firestore.QuerySnapshot<Client>) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  }
}
