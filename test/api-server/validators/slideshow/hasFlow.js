/* global requireDatamodel, requireValidator, it */

const assert = require('assert');
const hasName = requireValidator('slideshow/hasFlow');
const flowTypeModel = requireDatamodel('flow-types');

it('Notify the developer that the property "flow" is missing on the req.body object', () => {
  const flow = undefined;
  return hasName(flow)
  .catch(err => {
    assert.equal('missingProperty', err.errorType);
  });
});

it('Notify the developer that the property "flow" should be an array', () => {
  const flow = 'Test';
  return hasName(flow)
  .catch(err => {
    assert.equal('shouldBeArray', err.errorType);
  });
});

it('Notify the developer that the property "flow" should be a collection', () => {

  const flow = [
    'test'
  ];

  return hasName(flow)
  .catch(err => {
    assert.equal('shouldBeCollection', err.errorType);
  });
});

it('Notify the developer that the content of the "flow" property is invalid', () => {
  const flow = [
    {
      test: '123'
    }
  ];

  return hasName(flow)
  .catch(err => {
    assert.equal('unknownFlowType', err.errorType);
  });
});

it('Call next when the property "flow" contains a correct static slide', () => {
  const flow = [
    flowTypeModel.staticSlide
  ];

  return hasName(flow)
  .then(result => {
    assert.equal(true, result);
  });
});

it('Call next when the property "flow" contains a correct filtered slide', () => {
  const flow = [
    flowTypeModel.filteredSlide
  ];

  return hasName(flow)
  .then(result => {
    assert.equal(true, result);
  });
});
