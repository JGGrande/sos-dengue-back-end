import { VisitWithUserAndResidenceDto } from "src/modules/visit/application/dtos/visit-with-user-and-residence.dto";

export class FindAllVisitByResidencePresenter {
  static toHttpResponse(visits: VisitWithUserAndResidenceDto[]) {
    return visits.map(visit => ({
      ...visit,
      user: {
        id: visit.user.id,
        name: visit.user.name
      }
    }));
  }
}