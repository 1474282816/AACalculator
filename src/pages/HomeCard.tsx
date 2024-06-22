import '@fontsource/inter';
import {
  DeleteForever,
  EditRounded,
  InsertDriveFileRounded,
  MoreVertRounded,
  ShareRounded,
  WarningRounded
} from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardOverflow,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Typography
} from '@mui/joy';
import { ReactNode, useState } from 'react';

export type HomeCardProps = {
  id: string;
  title: ReactNode;
  image?: string;
  time: string;
  onClick?: () => void;
  onDelete?: (id: string) => void;
};
export default function HomeCard(props: HomeCardProps) {
  const { id, title, image, time, onClick, onDelete } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Card
      color="neutral"
      invertedColors={false}
      orientation="vertical"
      size="md"
      variant="soft"
    >
      <div>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{time}</Typography>
        <Dropdown>
          <MenuButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            onClick={event => event.stopPropagation()}
            slots={{ root: IconButton }}
            slotProps={{ root: { color: 'neutral' } }}
          >
            <MoreVertRounded />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: '99999',
              p: 1,
              gap: 1,
              '--ListItem-radius': 'var(--joy-radius-sm)'
            }}
          >
            <MenuItem>
              <EditRounded />
              重命名
            </MenuItem>
            <MenuItem>
              <ShareRounded />
              分享
            </MenuItem>
            <MenuItem
              variant="soft"
              color="danger"
              onClick={e => {
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <DeleteForever />
              </ListItemDecorator>{' '}
              删除账单
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {image && (
          <AspectRatio minHeight="80px" maxHeight="200px">
            <img src={image} loading="lazy" alt="图像" />
          </AspectRatio>
        )}
        {!image && (
          <CardOverflow
            sx={{
              borderTop: '1px solid',
              borderColor: 'neutral.outlinedBorder'
            }}
          >
            <AspectRatio ratio="16/9" color="primary">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <InsertDriveFileRounded />
              </Box>
            </AspectRatio>
          </CardOverflow>
        )}
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            确认
          </DialogTitle>
          <Divider />
          <DialogContent>确认删除？</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => onDelete?.(id)}
            >
              确认
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setConfirmOpen(false)}
            >
              取消
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
