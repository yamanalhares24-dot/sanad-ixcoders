/**
 * Provides access to user authentication token storage.
 * Utilizes the `dataStorage` utility to persist and retrieve the user's token.
 */
import { dataStorage } from "../../../lib/storage";

export const userStorage = dataStorage<string>("token");
