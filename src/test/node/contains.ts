/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava';
import { documentForTesting as document } from '../../worker-thread/dom/Document';

test.beforeEach(t => {
  t.context = {
    node: document.createElement('div'),
    child: document.createElement('div'),
    childTwo: document.createElement('div'),
  };
});

test.afterEach(t => {
  document.body.childNodes.forEach(childNode => childNode.remove());
});

test('returns true for a node containing itself', t => {
  const { node } = t.context;

  t.is(node.contains(node), true);
});

test('returns false for a node not contained by a parent', t => {
  const { node, child } = t.context;

  t.is(node.contains(child), false);
});

test('returns false for a node not contained by a parent', t => {
  const { node, child } = t.context;

  t.is(node.contains(child), false);
});

test('returns true for a node contained in the document', t => {
  const { node, child } = t.context;

  node.appendChild(child);
  document.body.appendChild(node);
  t.is(document.contains(node), true);
});

test('returns true for a node contained deeper within a tree', t => {
  const { node, child, childTwo } = t.context;

  child.appendChild(childTwo);
  node.appendChild(child);
  t.is(node.contains(childTwo), true, 'for a node contained deeper within a tree, return true');
});

test('returns false for a node deep within a tree containing parents', t => {
  const { node, child, childTwo } = t.context;

  child.appendChild(childTwo);
  node.appendChild(child);
  t.is(childTwo.contains(node), false);
});
