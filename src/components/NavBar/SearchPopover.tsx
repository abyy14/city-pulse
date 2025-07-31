import React, { useRef, useEffect } from 'react';
import { Paper, List, ListItemButton, ListItemText, Popper, ClickAwayListener } from '@mui/material';

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  results: string[];
  onClose: () => void;
  onSelect: (value: string) => void;
};

const SearchPopover: React.FC<Props> = ({ open, anchorEl, results, onClose, onSelect }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1200 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper elevation={3} sx={{ width: 250, mt: 1 }}>
          <List>
            {results.map((res, idx) => (
              <ListItemButton key={idx} onClick={() => onSelect(res)}>
                <ListItemText primary={res} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default SearchPopover;
