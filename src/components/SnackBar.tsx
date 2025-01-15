import { Alert, Snackbar } from "@mui/material";

interface BannerProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  open: boolean;
  onClose: () => void;
}

export default function Banner({
  severity,
  message,
  open,
  onClose,
}: BannerProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", marginTop: 5 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
