import '@fontsource/inter';
import { AddRounded, PlaylistAddCheckCircleRounded } from '@mui/icons-material';
import { Box, Button, Card, Snackbar } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import { v4 as uuid } from 'uuid';
import HomeCard, { HomeCardProps } from './HomeCard';
import { DBType } from './index.d';

export default function Home() {
  const [cardList, setCardList] = useState<DBType<HomeCardProps>[]>([]);
  const [open, setOpen] = React.useState(false);

  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    getCardList();
  }, []);

  const message = {
    success: (msg: string) => {
      setAlertMsg(msg);
      setOpen(true);
    }
  };

  const getCardList = async () => {
    const res = await window.utools.db.allDocs('card');
    setCardList(
      res.sort((a: any, b: any) => {
        return dayjs(b.data.time).diff(dayjs(a.data.time));
      })
    );
  };

  const addCard = () => {
    fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response: any) => {
        const cardId = 'card' + uuid();
        window.utools.db.promises
          .put({
            _id: cardId,
            data: {
              title: '新账单',
              time: new Date().toLocaleString(),
              id: cardId,
              image: `https://cn.bing.com${response.images[0].url}`
            }
          })
          .then((res: any) => {
            if (res.ok) {
              message.success('添加成功');
              getCardList();
            }
          });
      });
  };

  const handleDeleteCard = async (id: string) => {
    window.utools.db.promises.remove(id).then((res: any) => {
      if (res.ok) {
        message.success('删除成功');
        getCardList();
      }
    });
  };

  const renderCard = useCallback(
    (data: DBType<HomeCardProps>[]) => {
      return data.map(item => (
        <HomeCard
          key={item.data?.id}
          {...item.data}
          onClick={() => {
            history.push('/bill', { id: item.data?.id });
            // const res = await window.services.readFile('/tsconfig.json');
            // console.log('res', res);
          }}
          onDelete={handleDeleteCard}
        />
      ));
    },
    [cardList]
  );

  return (
    <main>
      <CssBaseline />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(218px, 246px))',
          gap: 2
        }}
      >
        {/* 添加卡片按钮 */}
        <Card
          color="neutral"
          invertedColors={false}
          orientation="vertical"
          size="md"
          variant="soft"
          onClick={addCard}
          style={{ cursor: 'pointer', height: 200 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <AddRounded style={{ fontSize: '5rem' }} />
          </Box>
        </Card>
        {renderCard(cardList)}
      </Box>

      <Snackbar
        variant="soft"
        color="success"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        startDecorator={<PlaylistAddCheckCircleRounded />}
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            关闭
          </Button>
        }
      >
        {alertMsg}
      </Snackbar>
    </main>
  );
}
