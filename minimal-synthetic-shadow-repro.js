/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  appendChild,
  insertBefore,
  removeChild,
  replaceChild,
} = Node.prototype;

const InternalSlot = new WeakMap();

function getInternalSlot(root) {
  return InternalSlot.get(root);
}

function getHost(root) {
  return getInternalSlot(root).host;
}

function attachShadow(elm, options) {
  const sr = document.createDocumentFragment();
  // creating shadow internal record
  const record = {
    host: elm,
    shadowRoot: sr,
  };
  InternalSlot.set(sr, record);
  Object.setPrototypeOf(sr, Object.create(DocumentFragment.prototype, NodePatchDescriptors));
  return sr;
}

const NodePatchDescriptors = {
  insertBefore: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild, refChild) {
      insertBefore.call(getHost(this), newChild, refChild);
      return newChild;
    },
  },
  removeChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(oldChild) {
      removeChild.call(getHost(this), oldChild);
      return oldChild;
    },
  },
  appendChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild) {
      appendChild.call(getHost(this), newChild);
      return newChild;
    },
  },
  replaceChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild, oldChild) {
      replaceChild.call(getHost(this), newChild, oldChild);
      return oldChild;
    },
  },
};

function attachShadowPatched(options) {
  return attachShadow(this, options);
}

//
// Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not five access to nodes beyond the immediate children.
Object.defineProperties(Element.prototype, {
  attachShadow: {
    value: attachShadowPatched,
    enumerable: true,
    writable: true,
    configurable: true,
  },
});
