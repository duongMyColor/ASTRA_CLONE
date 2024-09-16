import { OpenAPIHono } from '@hono/zod-openapi';

import applicationMaster from './application-master';
import acsta from './acsta';
import product from './product';
import license from './license';
import termsOfUse from './terms-of-use';
import updateCheck from './update-check';
import getData from './get-data';

// import { basicAuthMiddware } from '@/auth';

const app = new OpenAPIHono();

app.route('/application-masters', applicationMaster);
app.route('/acstas', acsta);
app.route('/products', product);
app.route('/terms-of-uses', termsOfUse);
app.route('/licenses', license);
app.route('/update-check', updateCheck);
app.route('/get-data', getData);

export default app;
