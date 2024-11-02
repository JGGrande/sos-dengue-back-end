import { Injectable } from "@nestjs/common";
import { IFIleProvider } from "../interface/file.provider";
import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { File } from "src/@types/utils";
import { join } from "path";

@Injectable()
export class FileInDiskProvider implements IFIleProvider {

  public async createDirIfNotExists(directory: string, recursive = false): Promise<void> {
    if(!existsSync(directory)){
      await mkdir(directory, { recursive });
    }
  }

  public async upload(path: string, file: File): Promise<string> {
    await this.createDirIfNotExists(path, true);

    const currentDateInUnix = new Date().getTime();

    const newFileName = `${currentDateInUnix}-${file.originalname}`;

    const filePath = join(path, newFileName);

    await writeFile(filePath, file.buffer);

    return newFileName;
  }

  public async delete(filePath: string, fileName: string): Promise<void> {
    const fileExists = existsSync(`${filePath}/${fileName}`);

    if(!fileExists){
      throw new Error("Arquivo não encontrado.");
    }

    const completePath = join(filePath, fileName);

    await unlink(completePath);
  }

}