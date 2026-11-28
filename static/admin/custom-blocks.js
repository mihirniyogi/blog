// Custom blocks for the Sveltia CMS editor's Insert menu.
// Each block is a form that saves markup the theme already styles.

// ---------- Shared helpers ----------

// Make typed text safe to put inside HTML, and turn it back again
const escapeHtml = (text = "") =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");

const unescapeHtml = (text = "") =>
  text.replace(/&quot;/g, '"').replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// ---------- Picture ----------
// An image with alt text, an optional caption and a size.
// Styled by the .picture rules in the theme's prose.css.

const pictureHtml = ({ src, alt, caption, size }) =>
  `<figure class="picture picture-${size || "large"}">` +
  `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">` +
  (caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "") +
  `</figure>`;

CMS.registerEditorComponent({
  id: "picture",
  label: "Picture",
  fields: [
    { name: "src", label: "Image", widget: "image" },
    { name: "alt", label: "Alt text (describe the image)", widget: "string" },
    { name: "caption", label: "Caption", widget: "string", required: false },
    {
      name: "size",
      label: "Size",
      widget: "select",
      options: ["small", "medium", "large", "full"],
      default: "large",
    },
  ],
  pattern: /^<figure class="picture picture-(\w+)"><img src="([^"]*)" alt="([^"]*)">(?:<figcaption>(.*?)<\/figcaption>)?<\/figure>$/s,
  fromBlock: (match) => ({
    size: match[1],
    src: unescapeHtml(match[2]),
    alt: unescapeHtml(match[3]),
    caption: unescapeHtml(match[4] || ""),
  }),
  toBlock: pictureHtml,
  toPreview: pictureHtml,
});

// ---------- Callout ----------
// A GitHub-style alert (> [!NOTE]), turned into a callout box
// by the theme's render-blockquote.html hook.

CMS.registerEditorComponent({
  id: "callout",
  label: "Callout",
  fields: [
    {
      name: "type",
      label: "Type",
      widget: "select",
      options: [
        { label: "Note", value: "note" },
        { label: "Tip", value: "tip" },
        { label: "Warning", value: "warning" },
      ],
      default: "note",
    },
    { name: "text", label: "Text", widget: "text" },
  ],
  pattern: /^> \[!(NOTE|TIP|WARNING)\]((?:\n>.*)*)$/m,
  fromBlock: (match) => ({
    type: match[1].toLowerCase(),
    text: match[2]
      .replace(/^\n/, "")
      .split("\n")
      .map((line) => line.replace(/^> ?/, ""))
      .join("\n"),
  }),
  toBlock: ({ type, text = "" }) =>
    `> [!${(type || "note").toUpperCase()}]\n` +
    text.split("\n").map((line) => (line ? `> ${line}` : ">")).join("\n"),
  toPreview: ({ type, text = "" }) =>
    `<blockquote><strong>${escapeHtml(type || "note")}</strong><br>` +
    `${escapeHtml(text).replace(/\n/g, "<br>")}</blockquote>`,
});