import { getArguments, texToText } from './utils.js';
import type { GenericNode } from 'myst-common';
import type { Handler, ITexParser } from './types.js';

export const CUSTOM_HANDLERS: Record<string, Handler> = {
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
