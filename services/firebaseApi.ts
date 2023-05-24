import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { database } from "@/firebase.config";

type Contract = {
  address: string;
  IPFSURL: string;
};

export function firebaseApi() {
  const eventsCollectionRef = collection(database, "contracts");

  const getAllItems = async () => {
    const data = await getDocs(eventsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  const getItem = async (id: string) => {
    const item = await getDoc(doc(database, "contracts", id));
    if (item.exists()) {
      return item.data();
    } else {
      console.log("Note doesn't exist");
    }
  };

  const getItemByAddress = async (
    address: string
  ): Promise<Contract | null> => {
    const item = await getDocs(
      query(collection(database, "contracts"), where("address", "==", address))
    );

    if (item.docs.length === 0) {
      console.log(`No document with address "${address}" found`);
      return null;
    }

    const doc = item.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Contract;
  };

  const createItem = async (event: any) => {
    await addDoc(eventsCollectionRef, event);
    console.log("event: ", event);
    console.log("item created");
  };

  const updateItem = async (event: any) => {
    const userDoc = doc(database, "contracts", event.id);
    await updateDoc(userDoc, event);
    console.log("item updated");
  };

  const deleteItem = async (id: any) => {
    const userDoc = doc(database, "contracts", id);
    await deleteDoc(userDoc);
    console.log("item deleted");
  };

  return {
    getAllItems,
    getItem,
    getItemByAddress,
    createItem,
    updateItem,
    deleteItem,
  };
}
