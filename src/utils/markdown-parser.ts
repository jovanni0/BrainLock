import MarkdownIt from "markdown-it";
import { katex } from "@mdit/plugin-katex";

import "katex/dist/katex.min.css";


const MarkdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
.use(katex, {
  throwOnError: false,
  errorColor: "#cc0000",
  displayMode: true,
});

export default MarkdownParser;
