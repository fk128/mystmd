import { getArguments, originalValue, texToText } from './utils.js';
import type { GenericNode } from 'myst-common';
import type { Handler, ITexParser } from './types.js';
import fs from 'fs';
import crypto from 'crypto';
import { mystParse } from 'myst-parser';
import { gridDirectives } from 'myst-ext-grid';
import { proofDirective } from 'myst-ext-proof';
import { exerciseDirectives } from 'myst-ext-exercise';
import { tabDirectives } from 'myst-ext-tabs';
import { cardDirective } from 'myst-ext-card';

export const CUSTOM_HANDLERS: Record<string, Handler> = {
  env_mystmd(node, state) {
    state.closeParagraph();
    let content = originalValue(state.tex, node);

    content = content
      .replace(/\\begin\{mystmd\}[\r\n]*/i, '')
      .replace(/\\end\{mystmd\}[\r\n]*/i, '');
    content = content.trim().replace(/^[ \t]+/gm, '');

    // Generate a unique hash for the content
    // const hash = crypto.createHash('md5').update(content).digest('hex');
    // const tempFilePath = `/tmp/mystmd_temp_${hash}.md`;
    // fs.writeFileSync(tempFilePath, content);
    // state.addLeaf('include', { file: tempFilePath });

    const parsed = mystParse(content, {
      markdownit: { linkify: true },
      directives: [
        cardDirective,
        ...gridDirectives,
        proofDirective,
        ...exerciseDirectives,
        ...tabDirectives,
        // ...(session.plugins?.directives ?? []),
      ],
      // extensions: {
      //   frontmatter: !opts?.ignoreFrontmatter,
      // },
      // roles: [buttonRole, ...(session.plugins?.roles ?? [])],
      // vfile,
    });
    console.log('Parsed MyST content:', parsed);
    state.pushNode(parsed as GenericNode);
  },

  macro_subfile(node, state) {
    const [content] = getArguments(node, 'group');
    const file = texToText(content);
    state.addLeaf('include', { file: file.endsWith('.tex') ? file : `${file}.tex` });
  },
  macro_texorpdfstring(node, state) {
    // This is used to set the text for a PDF bookmark, so we can ignore it
    const [content] = getArguments(node, 'group');
    state.renderChildren(content);
  },
  env_subfigure(node: GenericNode, state: ITexParser) {
    state.closeParagraph();
    const args = getArguments(node, 'group')?.[0]?.content ?? [];
    const widthValue = parseFloat(args[0]?.content);
    state.openNode('container', {
      kind: 'figure',
      ...(Number.isFinite(widthValue) ? { width: `${Math.round(widthValue * 100)}%` } : {}),
    });
    state.renderChildren(node);
    state.closeParagraph();
    state.closeNode();
  },
  env_tcolorbox(node, state) {
    state.closeParagraph();
    state.openNode('mathGroup');
    state.renderChildren(node);
    // const mathGroup = state.top();
    // transformSubEquations(mathGroup);
    state.closeNode();
  },
};
