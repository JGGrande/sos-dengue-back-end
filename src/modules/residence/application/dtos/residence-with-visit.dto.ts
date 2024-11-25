import { Visit } from "src/modules/visit/domain/entities/visit.entity";
import { Residence } from "../../domain/entites/residence.entity";

export class ResidenceWithVisitDto extends Residence {
  visit: Visit | null;
}