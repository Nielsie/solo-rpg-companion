import localforage from "localforage";
import {UUID} from "../utils/uuid.js";

const store = localforage.createInstance({
    name: "solo-rpg-companion-imagedb",
});

const setItem = async (value) => {
    const key = UUID.generate();
    await store.setItem(key, value);
    return key;
};

const getItem = async (key) => {
    return await store.getItem(key);
};

export const IMAGES_DB = {
    setItem,
    getItem,
    store,
};

