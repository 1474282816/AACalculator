import '@fontsource/inter';
import { Card } from '@mui/joy';
import { useEffect } from 'react';
import { useLocation } from 'umi';
export type BillProps = {};
export default function Bill(props: BillProps) {
  const location = useLocation();

  useEffect(() => {
    window.utools.db.promises.get('card' + location?.state.id);
  }, [location.state.id]);

  return (
    <Card
      color="neutral"
      invertedColors={false}
      orientation="vertical"
      size="md"
      variant="soft"
    ></Card>
  );
}
