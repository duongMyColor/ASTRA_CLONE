import { withLifecycleCallbacks } from 'react-admin';

import baseDataProvider from './baseDataProvider';
import applicationMasterCallbackHandler from './applicationMasterCallbackHandlers';
import acstaManagementCallbackHandler from './acstaManagementCallbackHandlers';
import performanceManagementCallbackHandlers from './performanceManagementCallbackHandlers';
import termOfUseManagementCallbackHandlers from './termOfUseManagementCallbackHandlers';
import licenseManagementCallbackHandlers from './licenseManagementCallbackHandlers';
import forcedUpdateManagementCallbackHandlers from './forcedUpdateManagementCallbackHandlers';

/**
 * NOTE:Limitation of withLifecycleCallbacks
 * Ref: https://marmelab.com/react-admin/withLifecycleCallbacks.html#limitations
 * For some cases, withLifecycleCallbacks is hard to handle errors and can not guarantee data consistency. If needed, we can change business logic to handleSave function of Form: See `src\views\Animals\AnimalEdit.tsx`
 */
const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  // userCallbackHandler,
  forcedUpdateManagementCallbackHandlers,
  acstaManagementCallbackHandler,
  applicationMasterCallbackHandler,
  // acstaManagementCallbackHandler,
  // PerformanceTypeMasterCallbackHandler,
  performanceManagementCallbackHandlers,
  termOfUseManagementCallbackHandlers,
  licenseManagementCallbackHandlers,
]);

export default dataProvider;
