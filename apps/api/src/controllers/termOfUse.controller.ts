import TermOfUseService from '../services/termOfUse.service';
import { OK } from '../core/success.response';

class TeamOfUseController {
  getAll = async () => {
    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await TermOfUseService.getAll(),
    });
  };

  getCurrentTermOfUse = async () => {
    return new OK({
      message: 'get latest Term Of Use success!',
      metadata: await TermOfUseService.getCurrentTermOfUse(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Term Of Use by id success!',
      metadata: await TermOfUseService.getOneById(id),
    });
  };
}

const termOfUseController = new TeamOfUseController();
export default termOfUseController;
