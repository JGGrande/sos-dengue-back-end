import { File } from "src/@types/utils";

export interface IFIleProvider {
  upload(path: string, file: File): Promise<string>;
  delete(filePath: string, fileName: string): Promise<void>;
  createDirIfNotExists(directory: string, recursive: boolean): Promise<void>;
}

export const FileProviderToken = Symbol("FileProvider");