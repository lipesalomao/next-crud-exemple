import { collection } from "firebase/firestore/lite";
import {
  getFirestore,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ClientRepo } from "./../../src/core/ClientRepo";
import app from "../config";
import Client from "../../src/core/Client";
import firestore from "firebase/firestore";

const db = getFirestore(app);

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
      return new Promise((resolve, reject) => {
        updateDoc(
          doc(db, `clients/${client?.id}`).withConverter(this.clientConverter),
          client
        )
          .then(() => resolve(client))
          .catch((err) => reject(err));
      });
    }

    return new Promise((resolve, reject) => {
      setDoc(doc(db, "clients").withConverter(this.clientConverter), client, {
        merge: true,
      })
        .then(() => resolve(client))
        .catch((err) => reject(err));
    });
  }
  async delete(id: string): Promise<void> {
    return deleteDoc(
      doc(db, `clients/${id}`).withConverter(this.clientConverter)
    );
  }

  async getAll(): Promise<Client[]> {
    return new Promise((resolve, reject) => {
      getDocs(collection(db, "clients"))
        .then((querySnapshot) => {
          const clients: Client[] = [];
          querySnapshot.forEach((doc) => {
            clients.push(doc.data().withConverter(this.clientConverter));
          });
          resolve(clients);
        })
        .catch((err) => reject(err));
    }) || [];
  }
}
