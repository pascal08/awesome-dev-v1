/* global requireValidator, it */

const assert = require('assert');
const hasContent = requireValidator('slide/hasContent');

it('Notify the developer that the property "content" is missing on the req.body object', () => {
  const content = undefined;
  return hasContent(content)
  .catch(result => assert.equal('missingProperty', result.errorType));

});

it('Notify the developer that the property "content" should be an object', () => {
  const content = 'test';
  return hasContent(content)
  .catch(result => assert.equal('shouldBeObject', result.errorType));
});

it('Notify the developer that the property "content" is in a wrong format', () => {
  const content = {test: 123};
  return hasContent(content)
  .catch(result => assert.equal('wrongFormat', result.errorType));
});

it('Notify the developer that the property "content" is using an unknown type', () => {
  const content = {type: 'test'};
  return hasContent(content)
  .catch(result => assert.equal('unknownType', result.errorType));
});

it('Notify the developer that the property "content" is not using the datamodel, matching the type', () => {
  const content = {type: 'image'};
  return hasContent(content)
  .catch(result => assert.equal('usingWrongDatamodel', result.errorType));
});

it('Notify the developer that the property "content" is not using the datamodel, matching the type', () => {
  const content = {type: 'template', html: ''};
  return hasContent(content)
  .catch(result => assert.equal('usingWrongDatamodel', result.errorType));
});

it('Call next when the property "content" is correct', () => {
  const content = {type: 'image', source: '/assets/images/test-slide.jpg'};
  return hasContent(content)
  .then(result => assert.equal(true, result));
});
