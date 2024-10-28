import { resolve } from "path";
import { Env } from "./config.module";

const { NODE_ENV } = process.env as Env;

const ambientPath = NODE_ENV === 'production' || NODE_ENV === 'homologacao';

const fileFolder = ambientPath
  ?  resolve(__dirname, "..", "..", "..", "..", "files", "user-photos")
  :  resolve(__dirname, "..", "..", "..", "files", "user-photos");

const directory = fileFolder;

export { directory}