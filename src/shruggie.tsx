import { Clipboard, showToast, Toast, closeMainWindow } from "@raycast/api";

export default async function Command() {
  try {
    await Clipboard.paste("¯\\_(ツ)_/¯");
    await closeMainWindow();
    await showToast({
      style: Toast.Style.Success,
      title: "¯\\_(ツ)_/¯",
      message: "Classic shrug pasted!",
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "Failed to paste shruggie",
    });
  }
}
