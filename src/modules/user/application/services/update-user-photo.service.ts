import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/repositories/user.repository";
import { File } from "src/@types/utils";
import { directory } from "../../../../shared/config/user-file-path.config";
import { FileProviderToken, IFIleProvider } from "src/shared/providers/interface/file.provider";

@Injectable()
export class UpdateUserPhotoService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(FileProviderToken)
    private readonly fileProvider: IFIleProvider
  ){ }

  async execute(photo: File, userId: number){
    const user = await this.userRepository.findById(userId);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.");
    }

    const newPhotoName = await this.fileProvider.upload(directory, photo);

    user.photo = newPhotoName;

    console.debug(newPhotoName);

    // await this.userRepository.update(user);
  }
}