import { Visit as PrismaVisit, User as PrismaUser, Residence as PrismaResidence } from "@prisma/client";
import { Residence } from "src/modules/residence/domain/entites/residence.entity";
import { User } from "src/modules/user/domain/entities/user.entity";
import { VisitWithUserAndResidenceDto } from "../../application/dtos/visit-with-user-and-residence.dto";
import { Deposit } from "../../domain/types/deposit.type";
import { Sample } from "../../domain/types/sample.type";
import { Treatment } from "../../domain/types/treatment.type";

type PrismaVisitWithUserAndResidence = PrismaVisit & {
  user: PrismaUser;
  residence: PrismaResidence;
}

export class PrismaVisitMapper {
  static toDomainWithUserAndResidence(visits: PrismaVisitWithUserAndResidence[]): VisitWithUserAndResidenceDto[] {
    return visits.map(visit => {
      const user = new User(visit.user);

      const residence = new Residence(({
        ...visit.residence,
        lat: visit.residence.lat.toNumber(),
        lng: visit.residence.lng.toNumber(),
      }));

      return {
        ...visit,
        deposit: visit.deposit as Deposit,
        sample: visit.sample as Sample,
        treatment: visit.treatment as Treatment,
        user: user,
        residence: residence
      }
    });
  }
}