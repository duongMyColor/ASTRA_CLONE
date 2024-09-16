import { NextPage } from 'next';
import dynamic from 'next/dynamic';
const AdminApp = dynamic(() => import('@/views/AdminApp'), {
  ssr: false,
});
// Config run time to Edge
// https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime
// export const runtime = 'edge';

const Home: NextPage = () => <AdminApp />;

export default Home;
