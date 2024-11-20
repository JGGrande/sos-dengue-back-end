import { OmitType } from "@nestjs/mapped-types";
import { Visit } from "../../domain/entities/visit.entity";
import { User } from "src/modules/user/domain/entities/user.entity";
import { Residence } from "src/modules/residence/domain/entites/residence.entity";

export class VisitWithUserAndResidenceDto extends OmitType(Visit, ['userId', 'residenceId']) {
  user: User;
  residence: Residence;
}