import {
  ActionPanel,
  Action,
  List,
  Clipboard,
  showToast,
  Toast,
  environment,
  closeMainWindow,
} from "@raycast/api";
import { existsSync } from "fs";
import { join } from "path";

interface ShrugItem {
  id: string;
  title: string;
  emoticon?: string;
  filePath?: string;
  type: "text" | "gif" | "image";
}

// Collection of shrug emoticons, images, and GIFs
const shrugItems: ShrugItem[] = [
  {
    id: "classic",
    title: "Classic Shrug",
    emoticon: "¯\\_(ツ)_/¯",
    type: "text",
  },
  {
    id: "unicode-shrug",
    title: "Unicode Shrug",
    emoticon: "🤷",
    type: "text",
  },
  {
    id: "unicode-woman",
    title: "Woman Shrugging",
    emoticon: "🤷‍♀️",
    type: "text",
  },
  {
    id: "unicode-man",
    title: "Man Shrugging",
    emoticon: "🤷‍♂️",
    type: "text",
  },
  {
    id: "confused-shrug",
    title: "Confused Shrug",
    emoticon: "¯\\(°_o)/¯",
    type: "text",
  },
  {
    id: "whatever-shrug",
    title: "Whatever Shrug",
    emoticon: "¯\\(◉◡◔)/¯",
    type: "text",
  },
  {
    id: "lenny-shrug",
    title: "Lenny Shrug",
    emoticon: "¯\\_(͡° ͜ʖ ͡°)_/¯",
    type: "text",
  },
  {
    id: "wide-eyes-shrug",
    title: "Wide Eyes Shrug",
    emoticon: "┐(͡◉ ͜ʖ ͡◉)┌",
    type: "text",
  },
  {
    id: "dunno-shrug",
    title: "Dunno Shrug",
    emoticon: "¯\\_(⊙︿⊙)_/¯",
    type: "text",
  },
  {
    id: "cool-shrug",
    title: "Cool Shrug",
    emoticon: "¯\\_(͠° ͟ʖ͠°)_/¯",
    type: "text",
  },
  {
    id: "angry-shrug",
    title: "Angry Shrug",
    emoticon: "¯\\_〳•̀ o •́〵_/¯",
    type: "text",
  },
  {
    id: "excited-shrug",
    title: "Excited Shrug",
    emoticon: "¯\\_ʘᗜʘ_/¯",
    type: "text",
  },
  {
    id: "wink-shrug",
    title: "Wink Shrug",
    emoticon: "¯\\_(͡~ ͜ʖ ͡°)_/¯",
    type: "text",
  },
  {
    id: "bufo-shrug",
    title: "Bufo Shrug",
    filePath: "bufo-shrug.png",
    type: "image",
  },
  {
    id: "boba-shrug",
    title: "Boba Shrug",
    filePath: "boba-shrug.png",
    type: "image",
  },
  {
    id: "grimace-shrug",
    title: "Grimace Shrug",
    filePath: "grimace-shrug.png",
    type: "image",
  },
  {
    id: "hotdog-shrug",
    title: "Hotdog Shrug",
    filePath: "hotdog-shrug.png",
    type: "image",
  },
  {
    id: "jeff-goldblum-shrug",
    title: "Jeff Goldblum Shrug",
    filePath: "jeff-goldblum-shrug.gif",
    type: "gif",
  },
  {
    id: "poop-shrug",
    title: "Poop Shrug",
    filePath: "poop-shrug.png",
    type: "image",
  },
  {
    id: "rip-shrug",
    title: "RIP Shrug",
    filePath: "rip-shrug.png",
    type: "image",
  },
  {
    id: "shrug-dog",
    title: "Shrug Dog",
    filePath: "shrug-dog.png",
    type: "image",
  },
  {
    id: "shrug-shark",
    title: "Shrug Shark",
    filePath: "shrug-shark.png",
    type: "image",
  },
  {
    id: "shrug-spin",
    title: "Spinning Shrug",
    filePath: "shrug-spin.gif",
    type: "gif",
  },
  {
    id: "skeletor-shrug",
    title: "Skeletor Shrug",
    filePath: "skeletor-shrug.png",
    type: "image",
  },
];

export default function Command() {
  const copyToClipboard = async (item: ShrugItem) => {
    try {
      if (item.type === "text") {
        await Clipboard.copy(item.emoticon || "");
        await showToast({
          style: Toast.Style.Success,
          title: "Copied!",
          message: `${item.title} copied to clipboard`,
        });
      } else if (item.type === "gif" || item.type === "image") {
        // For images/GIFs, copy the actual file to clipboard
        const filePath = join(environment.assetsPath, item.filePath!);
        if (!existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }
        await Clipboard.copy({ file: filePath });
        await showToast({
          style: Toast.Style.Success,
          title: "Image Copied!",
          message: `${item.title} copied to clipboard`,
        });
      }
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: `Failed to copy: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  };

  const pasteItem = async (item: ShrugItem) => {
    try {
      if (item.type === "text") {
        await Clipboard.paste(item.emoticon || "");
        await showToast({
          style: Toast.Style.Success,
          title: "Pasted!",
          message: `${item.title} pasted`,
        });
      } else if (item.type === "gif" || item.type === "image") {
        // For images/GIFs, copy to clipboard and close window for immediate pasting
        const filePath = join(environment.assetsPath, item.filePath!);
        if (!existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }

        // Copy the file to clipboard
        await Clipboard.copy({ file: filePath });

        // Close the main window so user can immediately paste with Cmd+V
        await closeMainWindow();

        // Show success toast briefly before closing
        await showToast({
          style: Toast.Style.Success,
          title: "Ready to Paste!",
          message: `${item.title} copied - press ⌘V to paste`,
        });
      }
    } catch (error) {
      console.error("Paste error:", error);
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: `Failed to prepare: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  };

  return (
    <List
      searchBarPlaceholder="⏎ to paste, ⌘C to copy to clipboard"
      filtering={true}
    >
      {shrugItems.map((item) => (
        <List.Item
          key={item.id}
          icon={
            item.type === "text"
              ? undefined
              : { source: join(environment.assetsPath, item.filePath!) }
          }
          title={
            item.type === "text" ? item.emoticon || item.title : item.title
          }
          actions={
            <ActionPanel>
              <Action
                title={item.type === "text" ? "Paste" : "Paste Image"}
                onAction={() => pasteItem(item)}
              />
              <Action
                title={
                  item.type === "text" ? "Copy to Clipboard" : "Copy Image"
                }
                onAction={() => copyToClipboard(item)}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
