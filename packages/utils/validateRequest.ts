import { BadRequestError } from '../../apps/api/src/core/error.response';

export const validateIds = (ids: string) => {
  if (!ids) {
    throw new BadRequestError('Invalid ids');
  }

  // Validate that ids is a comma-separated list of numbers
  const regex = /^(\d+,)*\d+$/;
  if (!regex.test(ids)) {
    throw new BadRequestError('Invalid ids format. Expected format: 1,2,3,...');
  }
};

export const validateId = (id: string) => {
  if (!id || isNaN(parseInt(id, 10))) {
    throw new BadRequestError('Invalid id');
  }
};

export const validateBundleId = (bundleId: string) => {
  if (!bundleId) {
    throw new BadRequestError('Invalid bundleId');
  }
};

export const validateDate = (date: string) => {
  if (!date || isNaN(new Date(date).getTime())) {
    throw new BadRequestError('Invalid date');
  }
};
