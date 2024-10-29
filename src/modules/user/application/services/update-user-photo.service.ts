import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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

    const defaultUserPhotoFileName = "default-user-photo.png";

    if(user.photo !== defaultUserPhotoFileName){
      await this.fileProvider.delete(directory, user.photo);
    }

    try {
      user.photo = newPhotoName;

      const updatedUser = await this.userRepository.update(user);

      return updatedUser;
    } catch (error) {
      console.error(error);

      console.info(`Deleting photo ${newPhotoName} from directory ${directory}`);
      await this.fileProvider.delete(directory, newPhotoName);

      throw new InternalServerErrorException("Erro ao atualizar a foto do usuário.");
    }
  }
}