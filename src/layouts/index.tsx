import Header from '@/components/Header';
import GlobalLayout from '@/components/Layout';
import { Outlet, useLocation } from 'umi';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <GlobalLayout.Root sx={{}}>
        <GlobalLayout.Header>
          <Header pathname={location.pathname} />
        </GlobalLayout.Header>
        <GlobalLayout.Main>
          <Outlet />
        </GlobalLayout.Main>
      </GlobalLayout.Root>
    </>
  );
}
