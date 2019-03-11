import { AsyncStorage } from "react-native";

const USER_KEY = "USER_KEY";

export function save(key) {
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(key));
}

export function load(callback) {
  return AsyncStorage.getItem(USER_KEY, callback);
}

export function remove(callback) {
  return AsyncStorage.removeItem(USER_KEY, callback);
}