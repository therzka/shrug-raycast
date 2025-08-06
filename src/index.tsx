import {
  ActionPanel,
  Action,
  List,
  Clipboard,
  showToast,
  Toast,
} from "@raycast/api";

// Collection of shrug emoticons from textemoji.org and other sources
const shrugEmoticons = [
  {
    id: "classic",
    title: "Classic Shrug",
    emoticon: "¯\\_(ツ)_/¯",
  },
  {
    id: "unicode-shrug",
    title: "Unicode Shrug",
    emoticon: "🤷",
  },
  {
    id: "unicode-woman",
    title: "Woman Shrugging",
    emoticon: "🤷‍♀️",
  },
  {
    id: "unicode-man",
    title: "Man Shrugging",
    emoticon: "🤷‍♂️",
  },
  {
    id: "confused-shrug",
    title: "Confused Shrug",
    emoticon: "¯\\(°_o)/¯",
  },
  {
    id: "whatever-shrug",
    title: "Whatever Shrug",
    emoticon: "¯\\(◉◡◔)/¯",
  },
  {
    id: "lenny-shrug",
    title: "Lenny Shrug",
    emoticon: "¯\\_(͡° ͜ʖ ͡°)_/¯",
  },
  {
    id: "wide-eyes-shrug",
    title: "Wide Eyes Shrug",
    emoticon: "┐(͡◉ ͜ʖ ͡◉)┌",
  },
  {
    id: "dunno-shrug",
    title: "Dunno Shrug",
    emoticon: "¯\\_(⊙︿⊙)_/¯",
  },
  {
    id: "concerned-shrug",
    title: "Concerned Shrug",
    emoticon: "¯\\_(͠≖ ͜ʖ͠≖)_/¯",
  },
  {
    id: "cool-shrug",
    title: "Cool Shrug",
    emoticon: "¯\\_(͠° ͟ʖ͠°)_/¯",
  },
  {
    id: "angry-shrug",
    title: "Angry Shrug",
    emoticon: "¯\\_〳•̀ o •́〵_/¯",
  },
  {
    id: "grumpy-shrug",
    title: "Grumpy Shrug",
    emoticon: "┐(͡° ʖ̯ ͡°)┌",
  },
  {
    id: "excited-shrug",
    title: "Excited Shrug",
    emoticon: "¯\\_ʘᗜʘ_/¯",
  },
  {
    id: "wink-shrug",
    title: "Wink Shrug",
    emoticon: "¯\\_(͡~ ͜ʖ ͡°)_/¯",
  },
];

export default function Command() {
  const copyToClipboard = async (emoticon: string, title: string) => {
    try {
      await Clipboard.copy(emoticon);
      await showToast({
        style: Toast.Style.Success,
        title: "Copied!",
        message: `${title} copied to clipboard`,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: "Failed to copy to clipboard",
      });
    }
  };

  const pasteEmoticon = async (emoticon: string, title: string) => {
    try {
      await Clipboard.paste(emoticon);
      await showToast({
        style: Toast.Style.Success,
        title: "Pasted!",
        message: `${title} pasted`,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: "Failed to paste emoticon",
      });
    }
  };

  return (
    <List
      searchBarPlaceholder="⏎ to paste, ⌘C to copy to clipboard"
      filtering={true}
    >
      {shrugEmoticons.map((item) => (
        <List.Item
          key={item.id}
          title={item.emoticon}
          actions={
            <ActionPanel>
              <Action
                title="Paste"
                onAction={() => pasteEmoticon(item.emoticon, item.title)}
              />
              <Action
                title="Copy to Clipboard"
                onAction={() => copyToClipboard(item.emoticon, item.title)}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
