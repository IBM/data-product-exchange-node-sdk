/**
 * (C) Copyright IBM Corp. 2026.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');
const DphV1 = require('../../dist/dph/v1');

const dphServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://ibm.com/123456',
};

const dphService = new DphV1(dphServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(dphService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('DphV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DphV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DphV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DphV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DphV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = DphV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DphV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new DphV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new DphV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DphV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getInitializeStatus', () => {
    describe('positive tests', () => {
      function __getInitializeStatusTest() {
        // Construct the params object for operation getInitializeStatus
        const containerId = 'testString';
        const getInitializeStatusParams = {
          containerId,
        };

        const getInitializeStatusResult = dphService.getInitializeStatus(getInitializeStatusParams);

        // all methods should return a Promise
        expectToBePromise(getInitializeStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/initialize/status',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInitializeStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getInitializeStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getInitializeStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInitializeStatusParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getInitializeStatus(getInitializeStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.getInitializeStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getServiceIdCredentials', () => {
    describe('positive tests', () => {
      function __getServiceIdCredentialsTest() {
        // Construct the params object for operation getServiceIdCredentials
        const getServiceIdCredentialsParams = {};

        const getServiceIdCredentialsResult = dphService.getServiceIdCredentials(
          getServiceIdCredentialsParams
        );

        // all methods should return a Promise
        expectToBePromise(getServiceIdCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/credentials',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServiceIdCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getServiceIdCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getServiceIdCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServiceIdCredentialsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getServiceIdCredentials(getServiceIdCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.getServiceIdCredentials({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('initialize', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      function __initializeTest() {
        // Construct the params object for operation initialize
        const container = containerReferenceModel;
        const include = [
          'delivery_methods',
          'domains_multi_industry',
          'data_product_samples',
          'workflows',
          'project',
          'catalog_configurations',
        ];
        const initializeParams = {
          container,
          include,
        };

        const initializeResult = dphService.initialize(initializeParams);

        // all methods should return a Promise
        expectToBePromise(initializeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/initialize',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.container).toEqual(container);
        expect(mockRequestOptions.body.include).toEqual(include);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __initializeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __initializeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __initializeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const initializeParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.initialize(initializeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.initialize({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getDeliveryConfiguration', () => {
    describe('positive tests', () => {
      function __getDeliveryConfigurationTest() {
        // Construct the params object for operation getDeliveryConfiguration
        const containerId = 'testString';
        const getDeliveryConfigurationParams = {
          containerId,
        };

        const getDeliveryConfigurationResult = dphService.getDeliveryConfiguration(
          getDeliveryConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(getDeliveryConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/delivery',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDeliveryConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDeliveryConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDeliveryConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDeliveryConfigurationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDeliveryConfiguration(getDeliveryConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.getDeliveryConfiguration({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateDeliveryConfiguration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDeliveryConfigurationTest() {
        // Construct the params object for operation updateDeliveryConfiguration
        const containerId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const updateDeliveryConfigurationParams = {
          containerId,
          jsonPatchOperation,
        };

        const updateDeliveryConfigurationResult = dphService.updateDeliveryConfiguration(
          updateDeliveryConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDeliveryConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/delivery',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchOperation);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDeliveryConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDeliveryConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDeliveryConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const containerId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDeliveryConfigurationParams = {
          containerId,
          jsonPatchOperation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDeliveryConfiguration(updateDeliveryConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDeliveryConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDeliveryConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('manageApiKeys', () => {
    describe('positive tests', () => {
      function __manageApiKeysTest() {
        // Construct the params object for operation manageApiKeys
        const manageApiKeysParams = {};

        const manageApiKeysResult = dphService.manageApiKeys(manageApiKeysParams);

        // all methods should return a Promise
        expectToBePromise(manageApiKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/configuration/rotate_credentials',
          'POST'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __manageApiKeysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __manageApiKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __manageApiKeysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const manageApiKeysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.manageApiKeys(manageApiKeysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.manageApiKeys({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDataAssetVisualization', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Visualization
      const visualizationModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContainerReference
      const containerReferenceModel = {
        id: '2be8f727-c5d2-4cb0-9216-f9888f428048',
        type: 'catalog',
      };

      // AssetReference
      const assetReferenceModel = {
        id: 'caeee3f3-756e-47d5-846d-da4600809e22',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ErrorMessage
      const errorMessageModel = {
        code: 'testString',
        message: 'testString',
      };

      // DataAssetRelationship
      const dataAssetRelationshipModel = {
        visualization: visualizationModel,
        asset: assetReferenceModel,
        related_asset: assetReferenceModel,
        error: errorMessageModel,
      };

      function __createDataAssetVisualizationTest() {
        // Construct the params object for operation createDataAssetVisualization
        const assets = [dataAssetRelationshipModel];
        const createDataAssetVisualizationParams = {
          assets,
        };

        const createDataAssetVisualizationResult = dphService.createDataAssetVisualization(
          createDataAssetVisualizationParams
        );

        // all methods should return a Promise
        expectToBePromise(createDataAssetVisualizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_asset/visualization',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.assets).toEqual(assets);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataAssetVisualizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataAssetVisualizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataAssetVisualizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataAssetVisualizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataAssetVisualization(createDataAssetVisualizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.createDataAssetVisualization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('reinitiateDataAssetVisualization', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Visualization
      const visualizationModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContainerReference
      const containerReferenceModel = {
        id: '2be8f727-c5d2-4cb0-9216-f9888f428048',
        type: 'catalog',
      };

      // AssetReference
      const assetReferenceModel = {
        id: 'caeee3f3-756e-47d5-846d-da4600809e22',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ErrorMessage
      const errorMessageModel = {
        code: 'testString',
        message: 'testString',
      };

      // DataAssetRelationship
      const dataAssetRelationshipModel = {
        visualization: visualizationModel,
        asset: assetReferenceModel,
        related_asset: assetReferenceModel,
        error: errorMessageModel,
      };

      function __reinitiateDataAssetVisualizationTest() {
        // Construct the params object for operation reinitiateDataAssetVisualization
        const assets = [dataAssetRelationshipModel];
        const reinitiateDataAssetVisualizationParams = {
          assets,
        };

        const reinitiateDataAssetVisualizationResult = dphService.reinitiateDataAssetVisualization(
          reinitiateDataAssetVisualizationParams
        );

        // all methods should return a Promise
        expectToBePromise(reinitiateDataAssetVisualizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_asset/visualization/reinitiate',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.assets).toEqual(assets);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __reinitiateDataAssetVisualizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __reinitiateDataAssetVisualizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __reinitiateDataAssetVisualizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const reinitiateDataAssetVisualizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.reinitiateDataAssetVisualization(reinitiateDataAssetVisualizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.reinitiateDataAssetVisualization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listDataProducts', () => {
    describe('positive tests', () => {
      function __listDataProductsTest() {
        // Construct the params object for operation listDataProducts
        const limit = 200;
        const start = 'testString';
        const listDataProductsParams = {
          limit,
          start,
        };

        const listDataProductsResult = dphService.listDataProducts(listDataProductsParams);

        // all methods should return a Promise
        expectToBePromise(listDataProductsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/data_products', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDataProductsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDataProductsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDataProducts(listDataProductsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.listDataProducts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('DataProductsPager tests', () => {
      const serviceUrl = dphServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"name":"name"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"name":"name"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          limit: 10,
        };
        const allResults = [];
        const pager = new DphV1.DataProductsPager(dphService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          limit: 10,
        };
        const pager = new DphV1.DataProductsPager(dphService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDataProduct', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DataProductDraftVersionRelease
      const dataProductDraftVersionReleaseModel = {
        id: '18bdbde1-918e-4ecf-aa23-6727bf319e14',
      };

      // DataProductIdentity
      const dataProductIdentityModel = {
        id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
        release: dataProductDraftVersionReleaseModel,
      };

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // UseCase
      const useCaseModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'testString',
        type: 'terms_and_conditions',
        name: 'testString',
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // Domain
      const domainModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractAuthoritativeDefinition
      const contractAuthoritativeDefinitionModel = {
        id: 'auth-def-001',
        url: 'https://data.example.com/authoritative-source',
        type: 'database',
        description: 'This is the primary authoritative source for customer data',
      };

      // Overview
      const overviewModel = {
        api_version: 'v3.1.0',
        kind: 'DataContract',
        status: 'proposed',
        name: 'Sample Data Contract',
        version: '0.0.0',
        domain: domainModel,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        tenant: 'tenant1',
        data_product: 'Customer Data Product',
        contract_created_ts: '2024-01-15T09:30:00.000Z',
        tags: ['testString'],
      };

      // ContractTemplateCustomProperty
      const contractTemplateCustomPropertyModel = {
        id: 'custom-prop-001',
        property: 'customPropertyKey',
        value: 'customPropertyValue',
        description: 'This is a custom property for tracking purposes',
      };

      // Description
      const descriptionModel = {
        purpose: 'Used for customer behavior analysis.',
        limitations: 'Data cannot be used for marketing.',
        usage: 'Data should be used only for analytics.',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTemplateMember
      const contractTemplateMemberModel = {
        id: 'member-001',
        user_id: 'IBMid-691000IN4G',
        name: 'John Doe',
        role: 'owner',
        description: 'Responsible for data quality and governance',
        date_in: '2024-01-15',
        date_out: '2024-12-31',
        replaced_by_username: 'jane_smith',
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractTermsTeam
      const contractTermsTeamModel = {
        id: 'team-001',
        name: 'Data Governance Team',
        description: 'Team responsible for data governance and quality',
        members: [contractTemplateMemberModel],
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // Roles
      const rolesModel = {
        id: 'role-001',
        role: 'owner',
        access: 'read',
        first_level_approvers: 'manager_user',
        second_level_approvers: 'director_user',
        description: 'Administrator role with full access',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // Pricing
      const pricingModel = {
        id: 'price-001',
        amount: '100.0',
        currency: 'USD',
        unit: 'megabyte',
      };

      // ContractTemplateSLAProperty
      const contractTemplateSlaPropertyModel = {
        id: 'sla-prop-001',
        property: 'Uptime Guarantee',
        value: '99.9',
        value_ext: 'extended_value',
        unit: 'd',
        element: 'column1,column2',
        driver: 'regulatory',
        description: 'Guaranteed uptime for the service',
        scheduler: 'cron',
        schedule: '0 20 * * *',
      };

      // ContractTemplateSLA
      const contractTemplateSlaModel = {
        default_element: 'Standard SLA Policy',
        properties: [contractTemplateSlaPropertyModel],
      };

      // ContractTemplateSupportAndCommunication
      const contractTemplateSupportAndCommunicationModel = {
        id: 'support-001',
        channel: 'Email Support',
        url: 'https://support.example.com',
        description: 'Primary support channel for technical issues',
        tool: 'slack',
        scope: 'interactive',
        invitation_url: 'https://slack.com/invite/abc123',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTestSummary
      const contractTestSummaryModel = {
        status: 'testString',
        check: 'testString',
        asset_name: 'testString',
        records_returned: 'testString',
      };

      // ContractTest
      const contractTestModel = {
        status: 'pass',
        last_tested_time: '2019-01-01T12:00:00.000Z',
        data_contract_id: 'testString',
        project_id: 'testString',
        message: 'testString',
        test_run_id: 'testString',
        test_summary: [contractTestSummaryModel],
      };

      // ContractAsset
      const contractAssetModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContractServer
      const contractServerModel = {
        id: 'testString',
        server: 'testString',
        asset: contractAssetModel,
        connection_id: 'testString',
        type: 'testString',
        description: 'testString',
        environment: 'testString',
        account: 'testString',
        catalog: 'testString',
        database: 'testString',
        dataset: 'testString',
        delimiter: 'testString',
        endpoint_url: 'testString',
        format: 'testString',
        host: 'testString',
        location: 'testString',
        path: 'testString',
        port: 'testString',
        project: 'testString',
        region: 'testString',
        region_name: 'testString',
        schema: 'testString',
        service_name: 'testString',
        staging_dir: 'testString',
        stream: 'testString',
        warehouse: 'testString',
        roles: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractLogicalTypeOptions
      const contractLogicalTypeOptionsModel = {
        format: 'date-time',
        minimum: '0',
        maximum: '100',
        min_length: 1,
        max_length: 255,
        pattern: '^[A-Z][a-z]+$',
        exclusive_maximum: 'testString',
        exclusive_minimum: 'testString',
        timezone: true,
        default_timezone: 'UTC',
        multiple_of: 72.5,
        max_properties: 0,
        min_properties: 0,
        required: ['testString'],
        max_items: 0,
        min_items: 0,
        unique_items: true,
      };

      // ContractQualityRule
      const contractQualityRuleModel = {
        id: 'quality-rule-001',
        type: 'sql',
        description: 'testString',
        tags: ['testString'],
        metric: 'testString',
        threshold: 'testString',
        valid_values: ['testString'],
        dimension: 'testString',
        method: 'testString',
        severity: 'testString',
        business_impact: 'testString',
        scheduler: 'testString',
        schedule: 'testString',
        rule: 'testString',
        implementation: 'testString',
        engine: 'testString',
        must_be_less_than: 'testString',
        must_be_less_or_equal_to: 'testString',
        must_be_greater_than: 'testString',
        custom_properties: [contractTemplateCustomPropertyModel],
        must_be_greater_or_equal_to: 'testString',
        must_be_between: ['testString'],
        must_not_be_between: ['testString'],
        must_be: 'testString',
        must_not_be: 'testString',
        name: 'testString',
        unit: 'testString',
        query: 'testString',
        arguments: { threshold: 0.95, column: 'status' },
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractSchemaRelationship
      const contractSchemaRelationshipModel = {
        type: 'foreignKey',
        from: ['testString'],
        to: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractSchemaProperty
      const contractSchemaPropertyModel = {
        id: 'testString',
        name: 'testString',
        primary_key: true,
        primary_key_position: 0,
        logical_type: 'testString',
        logical_type_options: contractLogicalTypeOptionsModel,
        physical_type: 'testString',
        required: true,
        unique: true,
        description: 'testString',
        business_name: 'testString',
        tags: ['testString'],
        examples: ['testString'],
        partitioned: true,
        partition_key_position: 0,
        classification: 'testString',
        quality: [contractQualityRuleModel],
        physical_name: 'testString',
        encrypted_name: 'testString',
        transform_source_objects: ['testString'],
        transform_logic: 'testString',
        transform_description: 'testString',
        critical_data_element: true,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractSchema
      const contractSchemaModel = {
        id: 'schema-001',
        asset_id: '2b0bf220-079c-41ee-be56-0242ac120002',
        connection_id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        type: 'table',
        description: 'testString',
        connection_path: 'testString',
        physical_type: 'testString',
        business_name: 'testString',
        logical_type: 'testString',
        physical_name: 'testString',
        data_granularity_description: 'testString',
        physical_schema: 'testString',
        server: 'testString',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        properties: [contractSchemaPropertyModel],
        quality: [contractQualityRuleModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractTerms
      const contractTermsModel = {
        asset: assetReferenceModel,
        id: 'testString',
        documents: [contractTermsDocumentModel],
        error_msg: 'testString',
        overview: overviewModel,
        description: descriptionModel,
        team: contractTermsTeamModel,
        roles: [rolesModel],
        price: pricingModel,
        sla: contractTemplateSlaModel,
        support: [contractTemplateSupportAndCommunicationModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        contract_test: contractTestModel,
        servers: [contractServerModel],
        schema: [contractSchemaModel],
      };

      // AssetPartReference
      const assetPartReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
        type: 'data_asset',
      };

      // EngineDetailsModel
      const engineDetailsModelModel = {
        display_name: 'Iceberg Engine',
        engine_id: 'presto767',
        engine_port: '34567',
        engine_host: 'a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud',
        engine_type: 'spark',
        associated_catalogs: ['testString'],
      };

      // ProducerInputModel
      const producerInputModelModel = {
        engine_details: engineDetailsModelModel,
        engines: [engineDetailsModelModel],
      };

      // DeliveryMethodPropertiesModel
      const deliveryMethodPropertiesModelModel = {
        producer_input: producerInputModelModel,
      };

      // DeliveryMethod
      const deliveryMethodModel = {
        id: '09cf5fcc-cb9d-4995-a8e4-16517b25229f',
        container: containerReferenceModel,
        getproperties: deliveryMethodPropertiesModelModel,
      };

      // DataProductPart
      const dataProductPartModel = {
        asset: assetPartReferenceModel,
        delivery_methods: [deliveryMethodModel],
      };

      // DataProductCustomWorkflowDefinition
      const dataProductCustomWorkflowDefinitionModel = {
        id: '18bdbde1-918e-4ecf-aa23-6727bf319e14',
      };

      // DataProductOrderAccessRequest
      const dataProductOrderAccessRequestModel = {
        task_assignee_users: ['testString'],
        pre_approved_users: ['testString'],
        custom_workflow_definition: dataProductCustomWorkflowDefinitionModel,
      };

      // DataProductWorkflows
      const dataProductWorkflowsModel = {
        order_access_request: dataProductOrderAccessRequestModel,
      };

      // AssetListAccessControl
      const assetListAccessControlModel = {
        owner: 'IBMid-696000KYV9',
      };

      // ContainerIdentity
      const containerIdentityModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
      };

      // AssetPrototype
      const assetPrototypeModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        container: containerIdentityModel,
      };

      // DataProductDraftPrototype
      const dataProductDraftPrototypeModel = {
        version: '1.0.0',
        state: 'draft',
        data_product: dataProductIdentityModel,
        name: 'My New Data Product',
        description: 'This is a description of My Data Product.',
        tags: ['testString'],
        use_cases: [useCaseModel],
        types: ['data'],
        contract_terms: [contractTermsModel],
        domain: domainModel,
        parts_out: [dataProductPartModel],
        workflows: dataProductWorkflowsModel,
        dataview_enabled: true,
        comments:
          'Comments by a producer that are provided either at the time of data product version creation or retiring',
        access_control: assetListAccessControlModel,
        last_updated_at: '2019-01-01T12:00:00.000Z',
        created_date: '2019-01-01T12:00:00.000Z',
        sub_container: containerIdentityModel,
        is_restricted: true,
        asset: assetPrototypeModel,
      };

      function __createDataProductTest() {
        // Construct the params object for operation createDataProduct
        const drafts = [dataProductDraftPrototypeModel];
        const limit = 200;
        const start = 'testString';
        const createDataProductParams = {
          drafts,
          limit,
          start,
        };

        const createDataProductResult = dphService.createDataProduct(createDataProductParams);

        // all methods should return a Promise
        expectToBePromise(createDataProductResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/data_products', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.drafts).toEqual(drafts);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataProductTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataProductTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const drafts = [dataProductDraftPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductParams = {
          drafts,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataProduct(createDataProductParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDataProduct({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDataProduct();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProduct', () => {
    describe('positive tests', () => {
      function __getDataProductTest() {
        // Construct the params object for operation getDataProduct
        const dataProductId = 'testString';
        const getDataProductParams = {
          dataProductId,
        };

        const getDataProductResult = dphService.getDataProduct(getDataProductParams);

        // all methods should return a Promise
        expectToBePromise(getDataProductResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataProductTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataProductTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataProduct(getDataProductParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataProduct({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataProduct();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('completeDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      function __completeDraftContractTermsDocumentTest() {
        // Construct the params object for operation completeDraftContractTermsDocument
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const completeDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const completeDraftContractTermsDocumentResult =
          dphService.completeDraftContractTermsDocument(completeDraftContractTermsDocumentParams);

        // all methods should return a Promise
        expectToBePromise(completeDraftContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}/complete',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __completeDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __completeDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __completeDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const completeDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.completeDraftContractTermsDocument(completeDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.completeDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.completeDraftContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDataProductDrafts', () => {
    describe('positive tests', () => {
      function __listDataProductDraftsTest() {
        // Construct the params object for operation listDataProductDrafts
        const dataProductId = 'testString';
        const assetContainerId = 'testString';
        const version = 'testString';
        const limit = 200;
        const start = 'testString';
        const listDataProductDraftsParams = {
          dataProductId,
          assetContainerId,
          version,
          limit,
          start,
        };

        const listDataProductDraftsResult = dphService.listDataProductDrafts(
          listDataProductDraftsParams
        );

        // all methods should return a Promise
        expectToBePromise(listDataProductDraftsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['asset.container.id']).toEqual(assetContainerId);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductDraftsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDataProductDraftsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDataProductDraftsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductDraftsParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDataProductDrafts(listDataProductDraftsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.listDataProductDrafts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.listDataProductDrafts();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DataProductDraftsPager tests', () => {
      const serviceUrl = dphServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products/testString/drafts';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"drafts":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"drafts":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          version: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new DphV1.DataProductDraftsPager(dphService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          version: 'testString',
          limit: 10,
        };
        const pager = new DphV1.DataProductDraftsPager(dphService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDataProductDraft', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerIdentity
      const containerIdentityModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
      };

      // AssetPrototype
      const assetPrototypeModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        container: containerIdentityModel,
      };

      // DataProductDraftVersionRelease
      const dataProductDraftVersionReleaseModel = {
        id: '8bf83660-11fe-4427-a72a-8d8359af24e3',
      };

      // DataProductIdentity
      const dataProductIdentityModel = {
        id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
        release: dataProductDraftVersionReleaseModel,
      };

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // UseCase
      const useCaseModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'testString',
        type: 'terms_and_conditions',
        name: 'testString',
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // Domain
      const domainModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractAuthoritativeDefinition
      const contractAuthoritativeDefinitionModel = {
        id: 'auth-def-001',
        url: 'https://data.example.com/authoritative-source',
        type: 'database',
        description: 'This is the primary authoritative source for customer data',
      };

      // Overview
      const overviewModel = {
        api_version: 'v3.1.0',
        kind: 'DataContract',
        status: 'proposed',
        name: 'Sample Data Contract',
        version: '0.0.0',
        domain: domainModel,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        tenant: 'tenant1',
        data_product: 'Customer Data Product',
        contract_created_ts: '2024-01-15T09:30:00.000Z',
        tags: ['testString'],
      };

      // ContractTemplateCustomProperty
      const contractTemplateCustomPropertyModel = {
        id: 'custom-prop-001',
        property: 'customPropertyKey',
        value: 'customPropertyValue',
        description: 'This is a custom property for tracking purposes',
      };

      // Description
      const descriptionModel = {
        purpose: 'Used for customer behavior analysis.',
        limitations: 'Data cannot be used for marketing.',
        usage: 'Data should be used only for analytics.',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTemplateMember
      const contractTemplateMemberModel = {
        id: 'member-001',
        user_id: 'IBMid-691000IN4G',
        name: 'John Doe',
        role: 'owner',
        description: 'Responsible for data quality and governance',
        date_in: '2024-01-15',
        date_out: '2024-12-31',
        replaced_by_username: 'jane_smith',
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractTermsTeam
      const contractTermsTeamModel = {
        id: 'team-001',
        name: 'Data Governance Team',
        description: 'Team responsible for data governance and quality',
        members: [contractTemplateMemberModel],
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // Roles
      const rolesModel = {
        id: 'role-001',
        role: 'owner',
        access: 'read',
        first_level_approvers: 'manager_user',
        second_level_approvers: 'director_user',
        description: 'Administrator role with full access',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // Pricing
      const pricingModel = {
        id: 'price-001',
        amount: '100.0',
        currency: 'USD',
        unit: 'megabyte',
      };

      // ContractTemplateSLAProperty
      const contractTemplateSlaPropertyModel = {
        id: 'sla-prop-001',
        property: 'Uptime Guarantee',
        value: '99.9',
        value_ext: 'extended_value',
        unit: 'd',
        element: 'column1,column2',
        driver: 'regulatory',
        description: 'Guaranteed uptime for the service',
        scheduler: 'cron',
        schedule: '0 20 * * *',
      };

      // ContractTemplateSLA
      const contractTemplateSlaModel = {
        default_element: 'Standard SLA Policy',
        properties: [contractTemplateSlaPropertyModel],
      };

      // ContractTemplateSupportAndCommunication
      const contractTemplateSupportAndCommunicationModel = {
        id: 'support-001',
        channel: 'Email Support',
        url: 'https://support.example.com',
        description: 'Primary support channel for technical issues',
        tool: 'slack',
        scope: 'interactive',
        invitation_url: 'https://slack.com/invite/abc123',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTestSummary
      const contractTestSummaryModel = {
        status: 'testString',
        check: 'testString',
        asset_name: 'testString',
        records_returned: 'testString',
      };

      // ContractTest
      const contractTestModel = {
        status: 'pass',
        last_tested_time: '2019-01-01T12:00:00.000Z',
        data_contract_id: 'testString',
        project_id: 'testString',
        message: 'testString',
        test_run_id: 'testString',
        test_summary: [contractTestSummaryModel],
      };

      // ContractAsset
      const contractAssetModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContractServer
      const contractServerModel = {
        id: 'testString',
        server: 'testString',
        asset: contractAssetModel,
        connection_id: 'testString',
        type: 'testString',
        description: 'testString',
        environment: 'testString',
        account: 'testString',
        catalog: 'testString',
        database: 'testString',
        dataset: 'testString',
        delimiter: 'testString',
        endpoint_url: 'testString',
        format: 'testString',
        host: 'testString',
        location: 'testString',
        path: 'testString',
        port: 'testString',
        project: 'testString',
        region: 'testString',
        region_name: 'testString',
        schema: 'testString',
        service_name: 'testString',
        staging_dir: 'testString',
        stream: 'testString',
        warehouse: 'testString',
        roles: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractLogicalTypeOptions
      const contractLogicalTypeOptionsModel = {
        format: 'date-time',
        minimum: '0',
        maximum: '100',
        min_length: 1,
        max_length: 255,
        pattern: '^[A-Z][a-z]+$',
        exclusive_maximum: 'testString',
        exclusive_minimum: 'testString',
        timezone: true,
        default_timezone: 'UTC',
        multiple_of: 72.5,
        max_properties: 0,
        min_properties: 0,
        required: ['testString'],
        max_items: 0,
        min_items: 0,
        unique_items: true,
      };

      // ContractQualityRule
      const contractQualityRuleModel = {
        id: 'quality-rule-001',
        type: 'sql',
        description: 'testString',
        tags: ['testString'],
        metric: 'testString',
        threshold: 'testString',
        valid_values: ['testString'],
        dimension: 'testString',
        method: 'testString',
        severity: 'testString',
        business_impact: 'testString',
        scheduler: 'testString',
        schedule: 'testString',
        rule: 'testString',
        implementation: 'testString',
        engine: 'testString',
        must_be_less_than: 'testString',
        must_be_less_or_equal_to: 'testString',
        must_be_greater_than: 'testString',
        custom_properties: [contractTemplateCustomPropertyModel],
        must_be_greater_or_equal_to: 'testString',
        must_be_between: ['testString'],
        must_not_be_between: ['testString'],
        must_be: 'testString',
        must_not_be: 'testString',
        name: 'testString',
        unit: 'testString',
        query: 'testString',
        arguments: { threshold: 0.95, column: 'status' },
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractSchemaRelationship
      const contractSchemaRelationshipModel = {
        type: 'foreignKey',
        from: ['testString'],
        to: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractSchemaProperty
      const contractSchemaPropertyModel = {
        id: 'testString',
        name: 'testString',
        primary_key: true,
        primary_key_position: 0,
        logical_type: 'testString',
        logical_type_options: contractLogicalTypeOptionsModel,
        physical_type: 'testString',
        required: true,
        unique: true,
        description: 'testString',
        business_name: 'testString',
        tags: ['testString'],
        examples: ['testString'],
        partitioned: true,
        partition_key_position: 0,
        classification: 'testString',
        quality: [contractQualityRuleModel],
        physical_name: 'testString',
        encrypted_name: 'testString',
        transform_source_objects: ['testString'],
        transform_logic: 'testString',
        transform_description: 'testString',
        critical_data_element: true,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractSchema
      const contractSchemaModel = {
        id: 'schema-001',
        asset_id: '2b0bf220-079c-41ee-be56-0242ac120002',
        connection_id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        type: 'table',
        description: 'testString',
        connection_path: 'testString',
        physical_type: 'testString',
        business_name: 'testString',
        logical_type: 'testString',
        physical_name: 'testString',
        data_granularity_description: 'testString',
        physical_schema: 'testString',
        server: 'testString',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        properties: [contractSchemaPropertyModel],
        quality: [contractQualityRuleModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractTerms
      const contractTermsModel = {
        asset: assetReferenceModel,
        id: 'testString',
        documents: [contractTermsDocumentModel],
        error_msg: 'testString',
        overview: overviewModel,
        description: descriptionModel,
        team: contractTermsTeamModel,
        roles: [rolesModel],
        price: pricingModel,
        sla: contractTemplateSlaModel,
        support: [contractTemplateSupportAndCommunicationModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        contract_test: contractTestModel,
        servers: [contractServerModel],
        schema: [contractSchemaModel],
      };

      // AssetPartReference
      const assetPartReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
        type: 'data_asset',
      };

      // EngineDetailsModel
      const engineDetailsModelModel = {
        display_name: 'Iceberg Engine',
        engine_id: 'presto767',
        engine_port: '34567',
        engine_host: 'a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud',
        engine_type: 'spark',
        associated_catalogs: ['testString'],
      };

      // ProducerInputModel
      const producerInputModelModel = {
        engine_details: engineDetailsModelModel,
        engines: [engineDetailsModelModel],
      };

      // DeliveryMethodPropertiesModel
      const deliveryMethodPropertiesModelModel = {
        producer_input: producerInputModelModel,
      };

      // DeliveryMethod
      const deliveryMethodModel = {
        id: '09cf5fcc-cb9d-4995-a8e4-16517b25229f',
        container: containerReferenceModel,
        getproperties: deliveryMethodPropertiesModelModel,
      };

      // DataProductPart
      const dataProductPartModel = {
        asset: assetPartReferenceModel,
        delivery_methods: [deliveryMethodModel],
      };

      // DataProductCustomWorkflowDefinition
      const dataProductCustomWorkflowDefinitionModel = {
        id: '18bdbde1-918e-4ecf-aa23-6727bf319e14',
      };

      // DataProductOrderAccessRequest
      const dataProductOrderAccessRequestModel = {
        task_assignee_users: ['testString'],
        pre_approved_users: ['testString'],
        custom_workflow_definition: dataProductCustomWorkflowDefinitionModel,
      };

      // DataProductWorkflows
      const dataProductWorkflowsModel = {
        order_access_request: dataProductOrderAccessRequestModel,
      };

      // AssetListAccessControl
      const assetListAccessControlModel = {
        owner: 'IBMid-696000KYV9',
      };

      function __createDataProductDraftTest() {
        // Construct the params object for operation createDataProductDraft
        const dataProductId = 'testString';
        const asset = assetPrototypeModel;
        const version = '1.2.0';
        const state = 'draft';
        const dataProduct = dataProductIdentityModel;
        const name = 'testString';
        const description = 'testString';
        const tags = ['testString'];
        const useCases = [useCaseModel];
        const types = ['data'];
        const contractTerms = [contractTermsModel];
        const domain = domainModel;
        const partsOut = [dataProductPartModel];
        const workflows = dataProductWorkflowsModel;
        const dataviewEnabled = true;
        const comments = 'testString';
        const accessControl = assetListAccessControlModel;
        const lastUpdatedAt = '2019-01-01T12:00:00.000Z';
        const createdDate = '2019-01-01T12:00:00.000Z';
        const subContainer = containerIdentityModel;
        const isRestricted = true;
        const createDataProductDraftParams = {
          dataProductId,
          asset,
          version,
          state,
          dataProduct,
          name,
          description,
          tags,
          useCases,
          types,
          contractTerms,
          domain,
          partsOut,
          workflows,
          dataviewEnabled,
          comments,
          accessControl,
          lastUpdatedAt,
          createdDate,
          subContainer,
          isRestricted,
        };

        const createDataProductDraftResult = dphService.createDataProductDraft(
          createDataProductDraftParams
        );

        // all methods should return a Promise
        expectToBePromise(createDataProductDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.asset).toEqual(asset);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.body.data_product).toEqual(dataProduct);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.use_cases).toEqual(useCases);
        expect(mockRequestOptions.body.types).toEqual(types);
        expect(mockRequestOptions.body.contract_terms).toEqual(contractTerms);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.parts_out).toEqual(partsOut);
        expect(mockRequestOptions.body.workflows).toEqual(workflows);
        expect(mockRequestOptions.body.dataview_enabled).toEqual(dataviewEnabled);
        expect(mockRequestOptions.body.comments).toEqual(comments);
        expect(mockRequestOptions.body.access_control).toEqual(accessControl);
        expect(mockRequestOptions.body.last_updated_at).toEqual(lastUpdatedAt);
        expect(mockRequestOptions.body.created_date).toEqual(createdDate);
        expect(mockRequestOptions.body.sub_container).toEqual(subContainer);
        expect(mockRequestOptions.body.is_restricted).toEqual(isRestricted);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const asset = assetPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductDraftParams = {
          dataProductId,
          asset,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataProductDraft(createDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      function __createDraftContractTermsDocumentTest() {
        // Construct the params object for operation createDraftContractTermsDocument
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const type = 'terms_and_conditions';
        const name = 'Terms and conditions document';
        const url = 'testString';
        const createDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          type,
          name,
          url,
        };

        const createDraftContractTermsDocumentResult = dphService.createDraftContractTermsDocument(
          createDraftContractTermsDocumentParams
        );

        // all methods should return a Promise
        expectToBePromise(createDraftContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const type = 'terms_and_conditions';
        const name = 'Terms and conditions document';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          type,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDraftContractTermsDocument(createDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDraftContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDataContractTestRun', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ServerMapping
      const serverMappingModel = {
        server_name: 'Server name from contract',
        connection_id: '2b0bf220-079c-41ee-be56-0242ac120002',
      };

      function __createDataContractTestRunTest() {
        // Construct the params object for operation createDataContractTestRun
        const dataProductId = 'testString';
        const projectId = 'f29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const catalogId = 'd29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractName = 'My Data Contract';
        const contractYaml = 'version: 1.0';
        const assetIds = [
          'b50c42eb-7100-4b7a-8257-c196dbcca1cd',
          'c69c42eb-7100-4b7a-8257-c196dbcca1cd',
        ];
        const serverMapping = [serverMappingModel];
        const dataContractId = '58be8340-2844-47ab-9528-c6d0cb235354';
        const createDataContractTestRunParams = {
          dataProductId,
          projectId,
          catalogId,
          contractName,
          contractYaml,
          assetIds,
          serverMapping,
          dataContractId,
        };

        const createDataContractTestRunResult = dphService.createDataContractTestRun(
          createDataContractTestRunParams
        );

        // all methods should return a Promise
        expectToBePromise(createDataContractTestRunResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/data_quality/test_data_contract',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.project_id).toEqual(projectId);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.contract_name).toEqual(contractName);
        expect(mockRequestOptions.body.contract_yaml).toEqual(contractYaml);
        expect(mockRequestOptions.body.asset_ids).toEqual(assetIds);
        expect(mockRequestOptions.body.server_mapping).toEqual(serverMapping);
        expect(mockRequestOptions.body.data_contract_id).toEqual(dataContractId);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataContractTestRunTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataContractTestRunTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataContractTestRunTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const projectId = 'f29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const catalogId = 'd29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractName = 'My Data Contract';
        const contractYaml = 'version: 1.0';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataContractTestRunParams = {
          dataProductId,
          projectId,
          catalogId,
          contractName,
          contractYaml,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataContractTestRun(createDataContractTestRunParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDataContractTestRun({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDataContractTestRun();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProductDraft', () => {
    describe('positive tests', () => {
      function __getDataProductDraftTest() {
        // Construct the params object for operation getDataProductDraft
        const dataProductId = 'testString';
        const draftId = 'testString';
        const getDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const getDataProductDraftResult = dphService.getDataProductDraft(getDataProductDraftParams);

        // all methods should return a Promise
        expectToBePromise(getDataProductDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductDraftParams = {
          dataProductId,
          draftId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataProductDraft(getDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDataProductDraft', () => {
    describe('positive tests', () => {
      function __deleteDataProductDraftTest() {
        // Construct the params object for operation deleteDataProductDraft
        const dataProductId = 'testString';
        const draftId = 'testString';
        const deleteDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const deleteDataProductDraftResult = dphService.deleteDataProductDraft(
          deleteDataProductDraftParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteDataProductDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __deleteDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __deleteDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDataProductDraftParams = {
          dataProductId,
          draftId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.deleteDataProductDraft(deleteDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.deleteDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.deleteDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductDraft', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductDraftTest() {
        // Construct the params object for operation updateDataProductDraft
        const dataProductId = 'testString';
        const draftId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductDraftParams = {
          dataProductId,
          draftId,
          jsonPatchInstructions,
        };

        const updateDataProductDraftResult = dphService.updateDataProductDraft(
          updateDataProductDraftParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDataProductDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductDraftParams = {
          dataProductId,
          draftId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDataProductDraft(updateDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      function __getDraftContractTermsDocumentTest() {
        // Construct the params object for operation getDraftContractTermsDocument
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const getDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const getDraftContractTermsDocumentResult = dphService.getDraftContractTermsDocument(
          getDraftContractTermsDocumentParams
        );

        // all methods should return a Promise
        expectToBePromise(getDraftContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDraftContractTermsDocument(getDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDraftContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      function __deleteDraftContractTermsDocumentTest() {
        // Construct the params object for operation deleteDraftContractTermsDocument
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const deleteDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const deleteDraftContractTermsDocumentResult = dphService.deleteDraftContractTermsDocument(
          deleteDraftContractTermsDocumentParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteDraftContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __deleteDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __deleteDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.deleteDraftContractTermsDocument(deleteDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.deleteDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.deleteDraftContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDraftContractTermsDocumentTest() {
        // Construct the params object for operation updateDraftContractTermsDocument
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          jsonPatchInstructions,
        };

        const updateDraftContractTermsDocumentResult = dphService.updateDraftContractTermsDocument(
          updateDraftContractTermsDocumentParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDraftContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDraftContractTermsDocument(updateDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDraftContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProductDraftContractTerms', () => {
    describe('positive tests', () => {
      function __getDataProductDraftContractTermsTest() {
        // Construct the params object for operation getDataProductDraftContractTerms
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const accept = 'application/json';
        const includeContractDocuments = true;
        const autopopulateServerInformation = false;
        const serverId = 'testString';
        const getDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          accept,
          includeContractDocuments,
          autopopulateServerInformation,
          serverId,
        };

        const getDataProductDraftContractTermsResult = dphService.getDataProductDraftContractTerms(
          getDataProductDraftContractTermsParams
        );

        // all methods should return a Promise
        expectToBePromise(getDataProductDraftContractTermsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
          'GET'
        );
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.include_contract_documents).toEqual(includeContractDocuments);
        expect(mockRequestOptions.qs.autopopulate_server_information).toEqual(
          autopopulateServerInformation
        );
        expect(mockRequestOptions.qs.server_id).toEqual(serverId);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductDraftContractTermsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataProductDraftContractTermsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataProductDraftContractTermsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataProductDraftContractTerms(getDataProductDraftContractTermsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataProductDraftContractTerms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataProductDraftContractTerms();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceDataProductDraftContractTerms', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'https://ibm.com/document',
        type: 'terms_and_conditions',
        name: 'Terms and Conditions',
        id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // Domain
      const domainModel = {
        id: 'c410bd17-a365-482f-8884-f6c08a162597',
        name: 'Customer Analytics',
        container: containerReferenceModel,
      };

      // ContractAuthoritativeDefinition
      const contractAuthoritativeDefinitionModel = {
        id: 'auth-def-001',
        url: 'https://example.com/data-governance/policies',
        type: 'policy',
        description: 'This is the primary authoritative source for customer data',
      };

      // Overview
      const overviewModel = {
        api_version: 'v3.0.0',
        kind: 'DataContract',
        status: 'production',
        name: 'Customer Analytics Data Contract',
        version: '1.0.0',
        domain: domainModel,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        tenant: 'production',
        data_product: 'Customer 360 Analytics',
        contract_created_ts: '2024-01-15T09:30:00.000Z',
        tags: ['testString'],
      };

      // ContractTemplateCustomProperty
      const contractTemplateCustomPropertyModel = {
        id: 'custom-prop-001',
        property: 'The name of the property.',
        value: 'The value of the property.',
        description: 'This is a custom property for tracking purposes',
      };

      // Description
      const descriptionModel = {
        purpose: 'Provide customer behavioral analytics data for marketing and product teams',
        limitations:
          'Data is aggregated at daily level. PII is masked. Maximum retention is 2 years.',
        usage:
          'Recommended for trend analysis, segmentation, and predictive modeling. Not suitable for real-time decisioning.',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTemplateMember
      const contractTemplateMemberModel = {
        id: 'member-001',
        user_id: 'user ID',
        name: 'John Doe',
        role: 'owner',
        description: 'Responsible for data quality and governance',
        date_in: '2024-01-15',
        date_out: '2024-12-31',
        replaced_by_username: 'jane_smith',
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractTermsTeam
      const contractTermsTeamModel = {
        id: 'team-001',
        name: 'Data Governance Team',
        description: 'Team responsible for data governance and quality',
        members: [contractTemplateMemberModel],
        tags: ['governance', 'quality'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // Roles
      const rolesModel = {
        id: 'role-001',
        role: 'IAM Role',
        access: 'read',
        first_level_approvers: 'manager_user',
        second_level_approvers: 'director_user',
        description: 'Administrator role with full access',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // Pricing
      const pricingModel = {
        id: 'price-001',
        amount: 'Amount',
        currency: 'Currency',
        unit: 'Unit',
      };

      // ContractTemplateSLAProperty
      const contractTemplateSlaPropertyModel = {
        id: 'sla-prop-001',
        property: 'slaproperty',
        value: 'slavalue',
        value_ext: 'extended_value',
        unit: 'd',
        element: 'column1,column2',
        driver: 'regulatory',
        description: 'Guaranteed uptime for the service',
        scheduler: 'cron',
        schedule: '0 20 * * *',
      };

      // ContractTemplateSLA
      const contractTemplateSlaModel = {
        default_element: 'sladefaultelement',
        properties: [contractTemplateSlaPropertyModel],
      };

      // ContractTemplateSupportAndCommunication
      const contractTemplateSupportAndCommunicationModel = {
        id: 'support-001',
        channel: 'channel',
        url: 'https://www.example.coms',
        description: 'Primary support channel for technical issues',
        tool: 'slack',
        scope: 'interactive',
        invitation_url: 'https://slack.com/invite/abc123',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTestSummary
      const contractTestSummaryModel = {
        status: 'pass',
        check: 'Schema Validation',
        asset_name: 'customer_events',
        records_returned: '1500000',
      };

      // ContractTest
      const contractTestModel = {
        status: 'pass',
        last_tested_time: '2024-02-05T06:00:00Z',
        data_contract_id: '2b0bf220-079c-41ee-be56-0242ac120002',
        project_id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
        message: 'All quality checks passed successfully',
        test_run_id: 'abcd9e0f-1a2b-4c4d-8e6f-7a8b9c0d1e2f',
        test_summary: [contractTestSummaryModel],
      };

      // ContractAsset
      const contractAssetModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContractServer
      const contractServerModel = {
        id: 'testString',
        server: 'prod-postgres-01',
        asset: contractAssetModel,
        connection_id: 'testString',
        type: 'PostgreSQL',
        description: 'Production PostgreSQL database for customer analytics',
        environment: 'production',
        account: 'testString',
        catalog: 'testString',
        database: 'analytics',
        dataset: 'testString',
        delimiter: 'testString',
        endpoint_url: 'testString',
        format: 'testString',
        host: 'prod-db.example.com',
        location: 'testString',
        path: 'testString',
        port: '5432',
        project: 'testString',
        region: 'testString',
        region_name: 'testString',
        schema: 'public',
        service_name: 'testString',
        staging_dir: 'testString',
        stream: 'testString',
        warehouse: 'testString',
        roles: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractLogicalTypeOptions
      const contractLogicalTypeOptionsModel = {
        format: 'date-time',
        minimum: '0',
        maximum: '100',
        min_length: 1,
        max_length: 255,
        pattern: '^[A-Z][a-z]+$',
        exclusive_maximum: 'testString',
        exclusive_minimum: 'testString',
        timezone: true,
        default_timezone: 'UTC',
        multiple_of: 72.5,
        max_properties: 0,
        min_properties: 0,
        required: ['testString'],
        max_items: 0,
        min_items: 0,
        unique_items: true,
      };

      // ContractQualityRule
      const contractQualityRuleModel = {
        id: 'quality-rule-001',
        type: 'library',
        description: 'testString',
        tags: ['testString'],
        metric: 'testString',
        threshold: 'testString',
        valid_values: ['testString'],
        dimension: 'testString',
        method: 'testString',
        severity: 'critical',
        business_impact: 'testString',
        scheduler: 'testString',
        schedule: 'testString',
        rule: 'not_null',
        implementation: 'testString',
        engine: 'testString',
        must_be_less_than: 'testString',
        must_be_less_or_equal_to: 'testString',
        must_be_greater_than: 'testString',
        custom_properties: [contractTemplateCustomPropertyModel],
        must_be_greater_or_equal_to: 'testString',
        must_be_between: ['testString'],
        must_not_be_between: ['testString'],
        must_be: 'true',
        must_not_be: 'testString',
        name: 'Not Null Check',
        unit: 'testString',
        query: 'testString',
        arguments: { threshold: 0.95, column: 'status' },
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractSchemaRelationship
      const contractSchemaRelationshipModel = {
        type: 'foreignKey',
        from: ['testString'],
        to: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractSchemaProperty
      const contractSchemaPropertyModel = {
        id: 'testString',
        name: 'customer_id',
        primary_key: true,
        primary_key_position: 1,
        logical_type: 'string',
        logical_type_options: contractLogicalTypeOptionsModel,
        physical_type: 'VARCHAR(50)',
        required: true,
        unique: false,
        description: 'Unique customer identifier',
        business_name: 'Customer ID',
        tags: ['identifier', 'customer'],
        examples: ['testString'],
        partitioned: true,
        partition_key_position: 0,
        classification: 'testString',
        quality: [contractQualityRuleModel],
        physical_name: 'testString',
        encrypted_name: 'testString',
        transform_source_objects: ['testString'],
        transform_logic: 'testString',
        transform_description: 'testString',
        critical_data_element: true,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractSchema
      const contractSchemaModel = {
        id: 'schema-001',
        asset_id: '2b0bf220-079c-11ee-be56-0242ac120002',
        connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'customer_events',
        type: 'table',
        description: 'Customer interaction events table',
        connection_path: '/prod-db.example.com/analytics',
        physical_type: 'application/x-ibm-rel-table',
        business_name: 'Customer Events',
        logical_type: 'object',
        physical_name: 'customer_events_v1',
        data_granularity_description: 'Event-level data, one row per customer interaction',
        physical_schema: 'testString',
        server: 'testString',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        tags: ['customer', 'events', 'analytics'],
        custom_properties: [contractTemplateCustomPropertyModel],
        properties: [contractSchemaPropertyModel],
        quality: [contractQualityRuleModel],
        relationships: [contractSchemaRelationshipModel],
      };

      function __replaceDataProductDraftContractTermsTest() {
        // Construct the params object for operation replaceDataProductDraftContractTerms
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const asset = assetReferenceModel;
        const id = 'testString';
        const documents = [contractTermsDocumentModel];
        const errorMsg = 'testString';
        const overview = overviewModel;
        const description = descriptionModel;
        const team = contractTermsTeamModel;
        const roles = [rolesModel];
        const price = pricingModel;
        const sla = contractTemplateSlaModel;
        const support = [contractTemplateSupportAndCommunicationModel];
        const customProperties = [contractTemplateCustomPropertyModel];
        const contractTest = contractTestModel;
        const servers = [contractServerModel];
        const schema = [contractSchemaModel];
        const replaceDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          asset,
          id,
          documents,
          errorMsg,
          overview,
          description,
          team,
          roles,
          price,
          sla,
          support,
          customProperties,
          contractTest,
          servers,
          schema,
        };

        const replaceDataProductDraftContractTermsResult =
          dphService.replaceDataProductDraftContractTerms(
            replaceDataProductDraftContractTermsParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceDataProductDraftContractTermsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.asset).toEqual(asset);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.documents).toEqual(documents);
        expect(mockRequestOptions.body.error_msg).toEqual(errorMsg);
        expect(mockRequestOptions.body.overview).toEqual(overview);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.team).toEqual(team);
        expect(mockRequestOptions.body.roles).toEqual(roles);
        expect(mockRequestOptions.body.price).toEqual(price);
        expect(mockRequestOptions.body.sla).toEqual(sla);
        expect(mockRequestOptions.body.support).toEqual(support);
        expect(mockRequestOptions.body.custom_properties).toEqual(customProperties);
        expect(mockRequestOptions.body.contract_test).toEqual(contractTest);
        expect(mockRequestOptions.body.servers).toEqual(servers);
        expect(mockRequestOptions.body.schema).toEqual(schema);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceDataProductDraftContractTermsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __replaceDataProductDraftContractTermsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __replaceDataProductDraftContractTermsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.replaceDataProductDraftContractTerms(replaceDataProductDraftContractTermsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.replaceDataProductDraftContractTerms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.replaceDataProductDraftContractTerms();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductDraftContractTerms', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductDraftContractTermsTest() {
        // Construct the params object for operation updateDataProductDraftContractTerms
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          jsonPatchInstructions,
        };

        const updateDataProductDraftContractTermsResult =
          dphService.updateDataProductDraftContractTerms(updateDataProductDraftContractTermsParams);

        // all methods should return a Promise
        expectToBePromise(updateDataProductDraftContractTermsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductDraftContractTermsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDataProductDraftContractTermsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDataProductDraftContractTermsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductDraftContractTermsParams = {
          dataProductId,
          draftId,
          contractTermsId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDataProductDraftContractTerms(updateDataProductDraftContractTermsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDataProductDraftContractTerms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDataProductDraftContractTerms();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getContractTermsInSpecifiedFormat', () => {
    describe('positive tests', () => {
      function __getContractTermsInSpecifiedFormatTest() {
        // Construct the params object for operation getContractTermsInSpecifiedFormat
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const format = 'testString';
        const formatVersion = 'testString';
        const accept = 'application/odcs+yaml';
        const getContractTermsInSpecifiedFormatParams = {
          dataProductId,
          draftId,
          contractTermsId,
          format,
          formatVersion,
          accept,
        };

        const getContractTermsInSpecifiedFormatResult =
          dphService.getContractTermsInSpecifiedFormat(getContractTermsInSpecifiedFormatParams);

        // all methods should return a Promise
        expectToBePromise(getContractTermsInSpecifiedFormatResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/format',
          'GET'
        );
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.format_version).toEqual(formatVersion);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getContractTermsInSpecifiedFormatTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getContractTermsInSpecifiedFormatTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getContractTermsInSpecifiedFormatTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const contractTermsId = 'testString';
        const format = 'testString';
        const formatVersion = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getContractTermsInSpecifiedFormatParams = {
          dataProductId,
          draftId,
          contractTermsId,
          format,
          formatVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getContractTermsInSpecifiedFormat(getContractTermsInSpecifiedFormatParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getContractTermsInSpecifiedFormat({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getContractTermsInSpecifiedFormat();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataContractTestResults', () => {
    describe('positive tests', () => {
      function __getDataContractTestResultsTest() {
        // Construct the params object for operation getDataContractTestResults
        const dataProductId = 'testString';
        const dataContractId = 'testString';
        const testRunId = 'testString';
        const projectId = 'testString';
        const getDataContractTestResultsParams = {
          dataProductId,
          dataContractId,
          testRunId,
          projectId,
        };

        const getDataContractTestResultsResult = dphService.getDataContractTestResults(
          getDataContractTestResultsParams
        );

        // all methods should return a Promise
        expectToBePromise(getDataContractTestResultsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/data_quality/test_data_contract/{data_contract_id}/test_results/{test_run_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.data_contract_id).toEqual(dataContractId);
        expect(mockRequestOptions.path.test_run_id).toEqual(testRunId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataContractTestResultsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataContractTestResultsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataContractTestResultsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const dataContractId = 'testString';
        const testRunId = 'testString';
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataContractTestResultsParams = {
          dataProductId,
          dataContractId,
          testRunId,
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataContractTestResults(getDataContractTestResultsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataContractTestResults({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataContractTestResults();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('publishDataProductDraft', () => {
    describe('positive tests', () => {
      function __publishDataProductDraftTest() {
        // Construct the params object for operation publishDataProductDraft
        const dataProductId = 'testString';
        const draftId = 'testString';
        const publishDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const publishDataProductDraftResult = dphService.publishDataProductDraft(
          publishDataProductDraftParams
        );

        // all methods should return a Promise
        expectToBePromise(publishDataProductDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/publish',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __publishDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __publishDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __publishDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const draftId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const publishDataProductDraftParams = {
          dataProductId,
          draftId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.publishDataProductDraft(publishDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.publishDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.publishDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProductRelease', () => {
    describe('positive tests', () => {
      function __getDataProductReleaseTest() {
        // Construct the params object for operation getDataProductRelease
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const checkCallerApproval = false;
        const getDataProductReleaseParams = {
          dataProductId,
          releaseId,
          checkCallerApproval,
        };

        const getDataProductReleaseResult = dphService.getDataProductRelease(
          getDataProductReleaseParams
        );

        // all methods should return a Promise
        expectToBePromise(getDataProductReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.check_caller_approval).toEqual(checkCallerApproval);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductReleaseParams = {
          dataProductId,
          releaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataProductRelease(getDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataProductRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductRelease', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductReleaseTest() {
        // Construct the params object for operation updateDataProductRelease
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductReleaseParams = {
          dataProductId,
          releaseId,
          jsonPatchInstructions,
        };

        const updateDataProductReleaseResult = dphService.updateDataProductRelease(
          updateDataProductReleaseParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDataProductReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductReleaseParams = {
          dataProductId,
          releaseId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDataProductRelease(updateDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDataProductRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReleaseContractTermsDocument', () => {
    describe('positive tests', () => {
      function __getReleaseContractTermsDocumentTest() {
        // Construct the params object for operation getReleaseContractTermsDocument
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const getReleaseContractTermsDocumentParams = {
          dataProductId,
          releaseId,
          contractTermsId,
          documentId,
        };

        const getReleaseContractTermsDocumentResult = dphService.getReleaseContractTermsDocument(
          getReleaseContractTermsDocumentParams
        );

        // all methods should return a Promise
        expectToBePromise(getReleaseContractTermsDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReleaseContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getReleaseContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getReleaseContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const contractTermsId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReleaseContractTermsDocumentParams = {
          dataProductId,
          releaseId,
          contractTermsId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getReleaseContractTermsDocument(getReleaseContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getReleaseContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getReleaseContractTermsDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPublishedDataProductDraftContractTerms', () => {
    describe('positive tests', () => {
      function __getPublishedDataProductDraftContractTermsTest() {
        // Construct the params object for operation getPublishedDataProductDraftContractTerms
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const contractTermsId = 'testString';
        const accept = 'application/odcs+yaml';
        const includeContractDocuments = true;
        const getPublishedDataProductDraftContractTermsParams = {
          dataProductId,
          releaseId,
          contractTermsId,
          accept,
          includeContractDocuments,
        };

        const getPublishedDataProductDraftContractTermsResult =
          dphService.getPublishedDataProductDraftContractTerms(
            getPublishedDataProductDraftContractTermsParams
          );

        // all methods should return a Promise
        expectToBePromise(getPublishedDataProductDraftContractTermsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/contract_terms/{contract_terms_id}',
          'GET'
        );
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.include_contract_documents).toEqual(includeContractDocuments);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPublishedDataProductDraftContractTermsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getPublishedDataProductDraftContractTermsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getPublishedDataProductDraftContractTermsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const contractTermsId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPublishedDataProductDraftContractTermsParams = {
          dataProductId,
          releaseId,
          contractTermsId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getPublishedDataProductDraftContractTerms(
          getPublishedDataProductDraftContractTermsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getPublishedDataProductDraftContractTerms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getPublishedDataProductDraftContractTerms();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDataProductReleases', () => {
    describe('positive tests', () => {
      function __listDataProductReleasesTest() {
        // Construct the params object for operation listDataProductReleases
        const dataProductId = 'testString';
        const assetContainerId = 'testString';
        const state = ['available'];
        const version = 'testString';
        const limit = 200;
        const start = 'testString';
        const listDataProductReleasesParams = {
          dataProductId,
          assetContainerId,
          state,
          version,
          limit,
          start,
        };

        const listDataProductReleasesResult = dphService.listDataProductReleases(
          listDataProductReleasesParams
        );

        // all methods should return a Promise
        expectToBePromise(listDataProductReleasesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['asset.container.id']).toEqual(assetContainerId);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductReleasesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDataProductReleasesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDataProductReleasesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductReleasesParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDataProductReleases(listDataProductReleasesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.listDataProductReleases({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.listDataProductReleases();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DataProductReleasesPager tests', () => {
      const serviceUrl = dphServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products/testString/releases';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          state: ['available'],
          version: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new DphV1.DataProductReleasesPager(dphService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          state: ['available'],
          version: 'testString',
          limit: 10,
        };
        const pager = new DphV1.DataProductReleasesPager(dphService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listRetiredDataProductReleasesLatest', () => {
    describe('positive tests', () => {
      function __listRetiredDataProductReleasesLatestTest() {
        // Construct the params object for operation listRetiredDataProductReleasesLatest
        const dataProductId = 'testString';
        const assetContainerId = 'testString';
        const limit = 200;
        const start = 'testString';
        const page = 1;
        const listRetiredDataProductReleasesLatestParams = {
          dataProductId,
          assetContainerId,
          limit,
          start,
          page,
        };

        const listRetiredDataProductReleasesLatestResult =
          dphService.listRetiredDataProductReleasesLatest(
            listRetiredDataProductReleasesLatestParams
          );

        // all methods should return a Promise
        expectToBePromise(listRetiredDataProductReleasesLatestResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/state/retired',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['asset.container.id']).toEqual(assetContainerId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.page).toEqual(page);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRetiredDataProductReleasesLatestTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listRetiredDataProductReleasesLatestTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listRetiredDataProductReleasesLatestTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRetiredDataProductReleasesLatestParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listRetiredDataProductReleasesLatest(listRetiredDataProductReleasesLatestParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.listRetiredDataProductReleasesLatest({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.listRetiredDataProductReleasesLatest();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('RetiredDataProductReleasesLatestPager tests', () => {
      const serviceUrl = dphServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products/testString/releases/state/retired';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","release":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"},"container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"name":"My Data Product","description":"This is a description of My Data Product.","tags":["tags"],"use_cases":[{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}],"types":["data"],"contract_terms":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"id":"id","documents":[{"url":"url","type":"terms_and_conditions","name":"name","id":"2b0bf220-079c-41ee-be56-0242ac120002","attachment":{"id":"id"},"upload_url":"upload_url"}],"error_msg":"error_msg","overview":{"api_version":"v3.1.0","kind":"DataContract","status":"proposed","name":"Sample Data Contract","version":"0.0.0","domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"id":"2b0bf220-079c-41ee-be56-0242ac120002","tenant":"tenant1","data_product":"Customer Data Product","contract_created_ts":"2024-01-15T09:30:00.000Z","tags":["tags"]},"description":{"purpose":"Used for customer behavior analysis.","limitations":"Data cannot be used for marketing.","usage":"Data should be used only for analytics.","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]},"team":{"id":"team-001","name":"Data Governance Team","description":"Team responsible for data governance and quality","members":[{"id":"member-001","user_id":"IBMid-691000IN4G","name":"John Doe","role":"owner","description":"Responsible for data quality and governance","date_in":"2024-01-15","date_out":"2024-12-31","replaced_by_username":"jane_smith","tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]},"roles":[{"id":"role-001","role":"owner","access":"read","first_level_approvers":"manager_user","second_level_approvers":"director_user","description":"Administrator role with full access","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"price":{"id":"price-001","amount":"100.0","currency":"USD","unit":"megabyte"},"sla":{"default_element":"Standard SLA Policy","properties":[{"id":"sla-prop-001","property":"Uptime Guarantee","value":"99.9","value_ext":"extended_value","unit":"d","element":"column1,column2","driver":"regulatory","description":"Guaranteed uptime for the service","scheduler":"cron","schedule":"0 20 * * *"}]},"support":[{"id":"support-001","channel":"Email Support","url":"https://support.example.com","description":"Primary support channel for technical issues","tool":"slack","scope":"interactive","invitation_url":"https://slack.com/invite/abc123","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"contract_test":{"status":"pass","last_tested_time":"2019-01-01T12:00:00.000Z","data_contract_id":"data_contract_id","project_id":"project_id","message":"message","test_run_id":"test_run_id","test_summary":[{"status":"status","check":"check","asset_name":"asset_name","records_returned":"records_returned"}]},"servers":[{"id":"id","server":"server","asset":{"id":"id","name":"name"},"connection_id":"connection_id","type":"type","description":"description","environment":"environment","account":"account","catalog":"catalog","database":"database","dataset":"dataset","delimiter":"delimiter","endpoint_url":"endpoint_url","format":"format","host":"host","location":"location","path":"path","port":"port","project":"project","region":"region","region_name":"region_name","schema":"schema","service_name":"service_name","staging_dir":"staging_dir","stream":"stream","warehouse":"warehouse","roles":["roles"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}],"schema":[{"id":"schema-001","asset_id":"2b0bf220-079c-41ee-be56-0242ac120002","connection_id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","type":"table","description":"description","connection_path":"connection_path","physical_type":"physical_type","business_name":"business_name","logical_type":"logical_type","physical_name":"physical_name","data_granularity_description":"data_granularity_description","physical_schema":"physical_schema","server":"server","authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"tags":["tags"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"properties":[{"id":"id","name":"name","primary_key":false,"primary_key_position":0,"logical_type":"logical_type","logical_type_options":{"format":"date-time","minimum":"0","maximum":"100","min_length":1,"max_length":255,"pattern":"^[A-Z][a-z]+$","exclusive_maximum":"exclusive_maximum","exclusive_minimum":"exclusive_minimum","timezone":true,"default_timezone":"UTC","multiple_of":11,"max_properties":0,"min_properties":0,"required":["required"],"max_items":0,"min_items":0,"unique_items":true},"physical_type":"physical_type","required":true,"unique":true,"description":"description","business_name":"business_name","tags":["tags"],"examples":["examples"],"partitioned":false,"partition_key_position":0,"classification":"classification","quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"physical_name":"physical_name","encrypted_name":"encrypted_name","transform_source_objects":["transform_source_objects"],"transform_logic":"transform_logic","transform_description":"transform_description","critical_data_element":false,"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}],"quality":[{"id":"quality-rule-001","type":"sql","description":"description","tags":["tags"],"metric":"metric","threshold":"threshold","valid_values":["valid_values"],"dimension":"dimension","method":"method","severity":"severity","business_impact":"business_impact","scheduler":"scheduler","schedule":"schedule","rule":"rule","implementation":"implementation","engine":"engine","must_be_less_than":"must_be_less_than","must_be_less_or_equal_to":"must_be_less_or_equal_to","must_be_greater_than":"must_be_greater_than","custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}],"must_be_greater_or_equal_to":"must_be_greater_or_equal_to","must_be_between":["must_be_between"],"must_not_be_between":["must_not_be_between"],"must_be":"must_be","must_not_be":"must_not_be","name":"name","unit":"unit","query":"query","arguments":{"anyKey":"anyValue"},"authoritative_definitions":[{"id":"auth-def-001","url":"https://data.example.com/authoritative-source","type":"database","description":"This is the primary authoritative source for customer data"}]}],"relationships":[{"type":"foreignKey","from":["from"],"to":["to"],"custom_properties":[{"id":"custom-prop-001","property":"customPropertyKey","value":"customPropertyValue","description":"This is a custom property for tracking purposes"}]}]}]}],"domain":{"id":"id","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}},"parts_out":[{"asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"type":"data_asset"},"delivery_methods":[{"id":"09cf5fcc-cb9d-4995-a8e4-16517b25229f","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"getproperties":{"producer_input":{"engine_details":{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]},"engines":[{"display_name":"Iceberg Engine","engine_id":"presto767","engine_port":"34567","engine_host":"a109e0f6-2dfc-4954-a0ff-343d70f7da7b.someId.lakehouse.appdomain.cloud","engine_type":"spark","associated_catalogs":["associated_catalogs"]}]}}}]}],"workflows":{"order_access_request":{"task_assignee_users":["task_assignee_users"],"pre_approved_users":["pre_approved_users"],"custom_workflow_definition":{"id":"18bdbde1-918e-4ecf-aa23-6727bf319e14"}}},"dataview_enabled":true,"comments":"Comments by a producer that are provided either at the time of data product version creation or retiring","access_control":{"owner":"IBMid-696000KYV9"},"last_updated_at":"2019-01-01T12:00:00.000Z","created_date":"2019-01-01T12:00:00.000Z","sub_container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd"},"is_restricted":false,"id":"2b0bf220-079c-41ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-41ee-be56-0242ac120002","name":"name","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          limit: 10,
          page: 1,
        };
        const allResults = [];
        const pager = new DphV1.RetiredDataProductReleasesLatestPager(dphService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          dataProductId: 'testString',
          assetContainerId: 'testString',
          limit: 10,
          page: 1,
        };
        const pager = new DphV1.RetiredDataProductReleasesLatestPager(dphService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('retireDataProductRelease', () => {
    describe('positive tests', () => {
      function __retireDataProductReleaseTest() {
        // Construct the params object for operation retireDataProductRelease
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const revokeAccess = false;
        const retireDataProductReleaseParams = {
          dataProductId,
          releaseId,
          revokeAccess,
        };

        const retireDataProductReleaseResult = dphService.retireDataProductRelease(
          retireDataProductReleaseParams
        );

        // all methods should return a Promise
        expectToBePromise(retireDataProductReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/retire',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = '';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.revoke_access).toEqual(revokeAccess);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __retireDataProductReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __retireDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __retireDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const retireDataProductReleaseParams = {
          dataProductId,
          releaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.retireDataProductRelease(retireDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.retireDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.retireDataProductRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createRevokeAccessProcess', () => {
    describe('positive tests', () => {
      function __createRevokeAccessProcessTest() {
        // Construct the params object for operation createRevokeAccessProcess
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const body = Buffer.from('This is a mock file.');
        const contentType = 'testString';
        const createRevokeAccessProcessParams = {
          dataProductId,
          releaseId,
          body,
          contentType,
        };

        const createRevokeAccessProcessResult = dphService.createRevokeAccessProcess(
          createRevokeAccessProcessParams
        );

        // all methods should return a Promise
        expectToBePromise(createRevokeAccessProcessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/revoke_access',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRevokeAccessProcessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createRevokeAccessProcessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createRevokeAccessProcessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'testString';
        const releaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRevokeAccessProcessParams = {
          dataProductId,
          releaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createRevokeAccessProcess(createRevokeAccessProcessParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createRevokeAccessProcess({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createRevokeAccessProcess();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDataProductContractTemplate', () => {
    describe('positive tests', () => {
      function __listDataProductContractTemplateTest() {
        // Construct the params object for operation listDataProductContractTemplate
        const containerId = 'testString';
        const contractTemplateName = 'testString';
        const contractTemplateStatus = 'testString';
        const domainIds = 'testString';
        const listDataProductContractTemplateParams = {
          containerId,
          contractTemplateName,
          contractTemplateStatus,
          domainIds,
        };

        const listDataProductContractTemplateResult = dphService.listDataProductContractTemplate(
          listDataProductContractTemplateParams
        );

        // all methods should return a Promise
        expectToBePromise(listDataProductContractTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.qs['contract_template.name']).toEqual(contractTemplateName);
        expect(mockRequestOptions.qs['contract_template.status']).toEqual(contractTemplateStatus);
        expect(mockRequestOptions.qs['domain.ids']).toEqual(domainIds);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductContractTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDataProductContractTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDataProductContractTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductContractTemplateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDataProductContractTemplate(listDataProductContractTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.listDataProductContractTemplate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createContractTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'f531f74a-01c8-4e91-8e29-b018db683c86',
        type: 'catalog',
      };

      // ErrorMessage
      const errorMessageModel = {
        code: 'testString',
        message: 'testString',
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        name: 'testString',
        container: containerReferenceModel,
      };

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'testString',
        type: 'terms_and_conditions',
        name: 'testString',
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // Domain
      const domainModel = {
        id: '4d5e6f70-8901-4345-a789-0abcdef12345',
        name: 'Customer Analytics',
        container: containerReferenceModel,
      };

      // ContractAuthoritativeDefinition
      const contractAuthoritativeDefinitionModel = {
        id: 'auth-def-001',
        url: 'https://example.com/data-governance/policies',
        type: 'policy',
        description: 'This is the primary authoritative source for customer data',
      };

      // Overview
      const overviewModel = {
        api_version: 'v3.1.0',
        kind: 'DataContract',
        status: 'active',
        name: 'Customer Analytics Data Contract',
        version: '1.0.0',
        domain: domainModel,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        id: '2b0bf220-079c-41ee-be56-0242ac120002',
        tenant: 'production',
        data_product: 'Customer 360 Analytics',
        contract_created_ts: '2024-01-15T09:30:00.000Z',
        tags: ['testString'],
      };

      // ContractTemplateCustomProperty
      const contractTemplateCustomPropertyModel = {
        id: 'custom-prop-001',
        property: 'propertykey',
        value: 'propertyvalue',
        description: 'This is a custom property for tracking purposes',
      };

      // Description
      const descriptionModel = {
        purpose: 'Provide customer behavioral analytics data for marketing and product teams',
        limitations:
          'Data is aggregated at daily level. PII is masked. Maximum retention is 2 years.',
        usage:
          'Recommended for trend analysis, segmentation, and predictive modeling. Not suitable for real-time decisioning.',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTemplateMember
      const contractTemplateMemberModel = {
        id: 'member-001',
        user_id: 'user ID',
        name: 'John Doe',
        role: 'owner',
        description: 'Responsible for data quality and governance',
        date_in: '2024-01-15',
        date_out: '2024-12-31',
        replaced_by_username: 'jane_smith',
        tags: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractTermsTeam
      const contractTermsTeamModel = {
        id: 'team-001',
        name: 'Data Governance Team',
        description: 'Team responsible for data governance and quality',
        members: [contractTemplateMemberModel],
        tags: ['governance', 'quality'],
        custom_properties: [contractTemplateCustomPropertyModel],
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // Roles
      const rolesModel = {
        id: 'role-001',
        role: 'IAM Role',
        access: 'read',
        first_level_approvers: 'manager_user',
        second_level_approvers: 'director_user',
        description: 'Administrator role with full access',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // Pricing
      const pricingModel = {
        id: 'price-001',
        amount: '100.00',
        currency: 'USD',
        unit: 'megabyte',
      };

      // ContractTemplateSLAProperty
      const contractTemplateSlaPropertyModel = {
        id: 'sla-prop-001',
        property: 'slaproperty',
        value: 'slavalue',
        value_ext: 'extended_value',
        unit: 'd',
        element: 'column1,column2',
        driver: 'regulatory',
        description: 'Guaranteed uptime for the service',
        scheduler: 'cron',
        schedule: '0 20 * * *',
      };

      // ContractTemplateSLA
      const contractTemplateSlaModel = {
        default_element: 'sladefaultelement',
        properties: [contractTemplateSlaPropertyModel],
      };

      // ContractTemplateSupportAndCommunication
      const contractTemplateSupportAndCommunicationModel = {
        id: 'support-001',
        channel: 'channel',
        url: 'https://www.example.coms',
        description: 'Primary support channel for technical issues',
        tool: 'slack',
        scope: 'interactive',
        invitation_url: 'https://slack.com/invite/abc123',
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractTestSummary
      const contractTestSummaryModel = {
        status: 'testString',
        check: 'testString',
        asset_name: 'testString',
        records_returned: 'testString',
      };

      // ContractTest
      const contractTestModel = {
        status: 'pass',
        last_tested_time: '2019-01-01T12:00:00.000Z',
        data_contract_id: 'testString',
        project_id: 'testString',
        message: 'testString',
        test_run_id: 'testString',
        test_summary: [contractTestSummaryModel],
      };

      // ContractAsset
      const contractAssetModel = {
        id: 'testString',
        name: 'testString',
      };

      // ContractServer
      const contractServerModel = {
        id: 'testString',
        server: 'prod-postgres-01',
        asset: contractAssetModel,
        connection_id: '6181f74a-01c8-4e91-8e29-b018db683c45',
        type: 'PostgreSQL',
        description: 'Production PostgreSQL database for customer analytics',
        environment: 'production',
        account: 'testString',
        catalog: 'testString',
        database: 'analytics',
        dataset: 'testString',
        delimiter: 'testString',
        endpoint_url: 'testString',
        format: 'testString',
        host: 'prod-db.example.com',
        location: 'testString',
        path: 'testString',
        port: '5432',
        project: 'testString',
        region: 'testString',
        region_name: 'testString',
        schema: 'public',
        service_name: 'testString',
        staging_dir: 'testString',
        stream: 'testString',
        warehouse: 'testString',
        roles: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractLogicalTypeOptions
      const contractLogicalTypeOptionsModel = {
        format: 'date-time',
        minimum: '0',
        maximum: '100',
        min_length: 1,
        max_length: 255,
        pattern: '^[A-Z][a-z]+$',
        exclusive_maximum: 'testString',
        exclusive_minimum: 'testString',
        timezone: true,
        default_timezone: 'UTC',
        multiple_of: 72.5,
        max_properties: 0,
        min_properties: 0,
        required: ['testString'],
        max_items: 0,
        min_items: 0,
        unique_items: true,
      };

      // ContractQualityRule
      const contractQualityRuleModel = {
        id: 'quality-rule-001',
        type: 'library',
        description: 'testString',
        tags: ['testString'],
        metric: 'testString',
        threshold: 'testString',
        valid_values: ['testString'],
        dimension: 'testString',
        method: 'testString',
        severity: 'critical',
        business_impact: 'testString',
        scheduler: 'testString',
        schedule: 'testString',
        rule: 'not_null',
        implementation: 'testString',
        engine: 'testString',
        must_be_less_than: 'testString',
        must_be_less_or_equal_to: 'testString',
        must_be_greater_than: 'testString',
        custom_properties: [contractTemplateCustomPropertyModel],
        must_be_greater_or_equal_to: 'testString',
        must_be_between: ['testString'],
        must_not_be_between: ['testString'],
        must_be: 'true',
        must_not_be: 'testString',
        name: 'Not Null Check',
        unit: 'testString',
        query: 'testString',
        arguments: { threshold: 0.95, column: 'status' },
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
      };

      // ContractSchemaRelationship
      const contractSchemaRelationshipModel = {
        type: 'foreignKey',
        from: ['testString'],
        to: ['testString'],
        custom_properties: [contractTemplateCustomPropertyModel],
      };

      // ContractSchemaProperty
      const contractSchemaPropertyModel = {
        id: 'testString',
        name: 'customer_id',
        primary_key: true,
        primary_key_position: 1,
        logical_type: 'string',
        logical_type_options: contractLogicalTypeOptionsModel,
        physical_type: 'VARCHAR(50)',
        required: true,
        unique: false,
        description: 'Unique customer identifier',
        business_name: 'Customer ID',
        tags: ['identifier', 'customer'],
        examples: ['testString'],
        partitioned: true,
        partition_key_position: 0,
        classification: 'testString',
        quality: [contractQualityRuleModel],
        physical_name: 'testString',
        encrypted_name: 'testString',
        transform_source_objects: ['testString'],
        transform_logic: 'testString',
        transform_description: 'testString',
        critical_data_element: true,
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractSchema
      const contractSchemaModel = {
        id: 'schema-001',
        asset_id: '671f74a1-01c8-4e91-8e29-b018db683c67',
        connection_id: '6181f74a-01c8-4e91-8e29-b018db683c45',
        name: 'customer_events',
        type: 'table',
        description: 'Customer interaction events table',
        connection_path: '/prod-db.example.com/analytics',
        physical_type: 'application/x-ibm-rel-table',
        business_name: 'Customer Events',
        logical_type: 'object',
        physical_name: 'customer_events_v1',
        data_granularity_description: 'Event-level data, one row per customer interaction',
        physical_schema: 'testString',
        server: 'testString',
        authoritative_definitions: [contractAuthoritativeDefinitionModel],
        tags: ['customer', 'events', 'analytics'],
        custom_properties: [contractTemplateCustomPropertyModel],
        properties: [contractSchemaPropertyModel],
        quality: [contractQualityRuleModel],
        relationships: [contractSchemaRelationshipModel],
      };

      // ContractTerms
      const contractTermsModel = {
        asset: assetReferenceModel,
        id: 'testString',
        documents: [contractTermsDocumentModel],
        error_msg: 'testString',
        overview: overviewModel,
        description: descriptionModel,
        team: contractTermsTeamModel,
        roles: [rolesModel],
        price: pricingModel,
        sla: contractTemplateSlaModel,
        support: [contractTemplateSupportAndCommunicationModel],
        custom_properties: [contractTemplateCustomPropertyModel],
        contract_test: contractTestModel,
        servers: [contractServerModel],
        schema: [contractSchemaModel],
      };

      function __createContractTemplateTest() {
        // Construct the params object for operation createContractTemplate
        const container = containerReferenceModel;
        const id = 'testString';
        const creatorId = 'testString';
        const createdAt = '2019-01-01T12:00:00.000Z';
        const name = 'Sample Data Contract Template';
        const error = errorMessageModel;
        const contractTerms = contractTermsModel;
        const containerId = 'testString';
        const contractTemplateName = 'testString';
        const contractTemplateStatus = 'testString';
        const domainIds = 'testString';
        const createContractTemplateParams = {
          container,
          id,
          creatorId,
          createdAt,
          name,
          error,
          contractTerms,
          containerId,
          contractTemplateName,
          contractTemplateStatus,
          domainIds,
        };

        const createContractTemplateResult = dphService.createContractTemplate(
          createContractTemplateParams
        );

        // all methods should return a Promise
        expectToBePromise(createContractTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.container).toEqual(container);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.creator_id).toEqual(creatorId);
        expect(mockRequestOptions.body.created_at).toEqual(createdAt);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.error).toEqual(error);
        expect(mockRequestOptions.body.contract_terms).toEqual(contractTerms);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.qs['contract_template.name']).toEqual(contractTemplateName);
        expect(mockRequestOptions.qs['contract_template.status']).toEqual(contractTemplateStatus);
        expect(mockRequestOptions.qs['domain.ids']).toEqual(domainIds);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createContractTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createContractTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createContractTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const container = containerReferenceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createContractTemplateParams = {
          container,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createContractTemplate(createContractTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createContractTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createContractTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getContractTemplate', () => {
    describe('positive tests', () => {
      function __getContractTemplateTest() {
        // Construct the params object for operation getContractTemplate
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const getContractTemplateParams = {
          contractTemplateId,
          containerId,
        };

        const getContractTemplateResult = dphService.getContractTemplate(getContractTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getContractTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates/{contract_template_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.contract_template_id).toEqual(contractTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getContractTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getContractTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getContractTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getContractTemplateParams = {
          contractTemplateId,
          containerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getContractTemplate(getContractTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getContractTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getContractTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDataProductContractTemplate', () => {
    describe('positive tests', () => {
      function __deleteDataProductContractTemplateTest() {
        // Construct the params object for operation deleteDataProductContractTemplate
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const deleteDataProductContractTemplateParams = {
          contractTemplateId,
          containerId,
        };

        const deleteDataProductContractTemplateResult =
          dphService.deleteDataProductContractTemplate(deleteDataProductContractTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteDataProductContractTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates/{contract_template_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.contract_template_id).toEqual(contractTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDataProductContractTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __deleteDataProductContractTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __deleteDataProductContractTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDataProductContractTemplateParams = {
          contractTemplateId,
          containerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.deleteDataProductContractTemplate(deleteDataProductContractTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.deleteDataProductContractTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.deleteDataProductContractTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductContractTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductContractTemplateTest() {
        // Construct the params object for operation updateDataProductContractTemplate
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductContractTemplateParams = {
          contractTemplateId,
          containerId,
          jsonPatchInstructions,
        };

        const updateDataProductContractTemplateResult =
          dphService.updateDataProductContractTemplate(updateDataProductContractTemplateParams);

        // all methods should return a Promise
        expectToBePromise(updateDataProductContractTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates/{contract_template_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.contract_template_id).toEqual(contractTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductContractTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDataProductContractTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDataProductContractTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const contractTemplateId = 'testString';
        const containerId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductContractTemplateParams = {
          contractTemplateId,
          containerId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDataProductContractTemplate(updateDataProductContractTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDataProductContractTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDataProductContractTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('validateContractTemplateYaml', () => {
    describe('positive tests', () => {
      function __validateContractTemplateYamlTest() {
        // Construct the params object for operation validateContractTemplateYaml
        const body =
          'version: "1.0.0"\napiVersion: "v3.1.0"\nkind: "DataContract"\nid: "sample-data-contract-001"\nstatus: "active"\nname: "Sample Data Contract"\ntenant: "production"\ndataProduct: "Customer Analytics"\ndescription:\n  purpose: "Provide sample customer data for analytics and reporting"\n  usage: "This data can be used for analytics, trend analysis, and business intelligence"\n  limitations: "PII must be masked. Data is aggregated at daily level. Maximum retention is 2 years."\ndomain: "customer-analytics"\nservers:\n  - server: "prod-s3-server"\n    type: "s3"\n    environment: "prod"\n    description: "Production S3 bucket for customer data"\nschema:\n  - name: "customer_table"\n    physicalName: "customer_table"\n    type: "table"\n    description: "Main customer information table"\n    properties:\n      - name: "customer_id"\n        type: "integer"\n        required: true\n        description: "Unique customer identifier"\n      - name: "customer_name"\n        type: "string"\n        required: true\n        description: "Customer full name"\n      - name: "email"\n        type: "string"\n        required: false\n        description: "Customer email address"\nteam:\n  - username: "data-team-lead"\n    name: "Data Team Lead"\n    role: "owner"\nroles:\n  - role: "DataAnalyst"\n    access: "read"\n  - role: "DataEngineer"\n    access: "write"\n';
        const validateContractTemplateYamlParams = {
          body,
        };

        const validateContractTemplateYamlResult = dphService.validateContractTemplateYaml(
          validateContractTemplateYamlParams
        );

        // all methods should return a Promise
        expectToBePromise(validateContractTemplateYamlResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/contract_templates/actions/validate',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'text/plain';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(body);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __validateContractTemplateYamlTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __validateContractTemplateYamlTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __validateContractTemplateYamlTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const body =
          'version: "1.0.0"\napiVersion: "v3.1.0"\nkind: "DataContract"\nid: "sample-data-contract-001"\nstatus: "active"\nname: "Sample Data Contract"\ntenant: "production"\ndataProduct: "Customer Analytics"\ndescription:\n  purpose: "Provide sample customer data for analytics and reporting"\n  usage: "This data can be used for analytics, trend analysis, and business intelligence"\n  limitations: "PII must be masked. Data is aggregated at daily level. Maximum retention is 2 years."\ndomain: "customer-analytics"\nservers:\n  - server: "prod-s3-server"\n    type: "s3"\n    environment: "prod"\n    description: "Production S3 bucket for customer data"\nschema:\n  - name: "customer_table"\n    physicalName: "customer_table"\n    type: "table"\n    description: "Main customer information table"\n    properties:\n      - name: "customer_id"\n        type: "integer"\n        required: true\n        description: "Unique customer identifier"\n      - name: "customer_name"\n        type: "string"\n        required: true\n        description: "Customer full name"\n      - name: "email"\n        type: "string"\n        required: false\n        description: "Customer email address"\nteam:\n  - username: "data-team-lead"\n    name: "Data Team Lead"\n    role: "owner"\nroles:\n  - role: "DataAnalyst"\n    access: "read"\n  - role: "DataEngineer"\n    access: "write"\n';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const validateContractTemplateYamlParams = {
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.validateContractTemplateYaml(validateContractTemplateYamlParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.validateContractTemplateYaml({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.validateContractTemplateYaml();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDataProductDomains', () => {
    describe('positive tests', () => {
      function __listDataProductDomainsTest() {
        // Construct the params object for operation listDataProductDomains
        const containerId = 'testString';
        const includeSubdomains = true;
        const listDataProductDomainsParams = {
          containerId,
          includeSubdomains,
        };

        const listDataProductDomainsResult = dphService.listDataProductDomains(
          listDataProductDomainsParams
        );

        // all methods should return a Promise
        expectToBePromise(listDataProductDomainsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/domains', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.qs.include_subdomains).toEqual(includeSubdomains);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductDomainsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDataProductDomainsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDataProductDomainsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductDomainsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDataProductDomains(listDataProductDomainsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dphService.listDataProductDomains({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDataProductDomain', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'ed580171-a6e4-4b93-973f-ae2f2f62991b',
        type: 'catalog',
      };

      // ErrorExtraResource
      const errorExtraResourceModel = {
        id: 'testString',
        timestamp: '2019-01-01T12:00:00.000Z',
        environment_name: 'testString',
        http_status: 0,
        source_cluster: 0,
        source_component: 0,
        transaction_id: 0,
      };

      // ErrorModelResource
      const errorModelResourceModel = {
        code: 'request_body_error',
        message: 'testString',
        extra: errorExtraResourceModel,
        more_info: 'testString',
      };

      // MemberRolesSchema
      const memberRolesSchemaModel = {
        user_iam_id: 'testString',
        roles: ['testString'],
      };

      // PropertiesSchema
      const propertiesSchemaModel = {
        value: 'testString',
      };

      // InitializeSubDomain
      const initializeSubDomainModel = {
        name: 'Sub domain 1',
        id: 'testString',
        description: 'New sub domain 1',
      };

      // ContainerIdentity
      const containerIdentityModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
      };

      function __createDataProductDomainTest() {
        // Construct the params object for operation createDataProductDomain
        const container = containerReferenceModel;
        const trace = 'testString';
        const errors = [errorModelResourceModel];
        const name = 'Test domain';
        const description = 'The sample description for new domain';
        const id = 'testString';
        const createdBy = 'testString';
        const memberRoles = memberRolesSchemaModel;
        const properties = propertiesSchemaModel;
        const subDomains = [initializeSubDomainModel];
        const subContainer = containerIdentityModel;
        const linkToSubcontainers = false;
        const createDataProductDomainParams = {
          container,
          trace,
          errors,
          name,
          description,
          id,
          createdBy,
          memberRoles,
          properties,
          subDomains,
          subContainer,
          linkToSubcontainers,
        };

        const createDataProductDomainResult = dphService.createDataProductDomain(
          createDataProductDomainParams
        );

        // all methods should return a Promise
        expectToBePromise(createDataProductDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/domains', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.container).toEqual(container);
        expect(mockRequestOptions.body.trace).toEqual(trace);
        expect(mockRequestOptions.body.errors).toEqual(errors);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.created_by).toEqual(createdBy);
        expect(mockRequestOptions.body.member_roles).toEqual(memberRoles);
        expect(mockRequestOptions.body.properties).toEqual(properties);
        expect(mockRequestOptions.body.sub_domains).toEqual(subDomains);
        expect(mockRequestOptions.body.sub_container).toEqual(subContainer);
        expect(mockRequestOptions.qs.link_to_subcontainers).toEqual(linkToSubcontainers);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataProductDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataProductDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const container = containerReferenceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductDomainParams = {
          container,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataProductDomain(createDataProductDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDataProductDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDataProductDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDataProductSubdomain', () => {
    describe('positive tests', () => {
      function __createDataProductSubdomainTest() {
        // Construct the params object for operation createDataProductSubdomain
        const domainId = 'testString';
        const containerId = 'testString';
        const name = 'Sub domain 1';
        const id = 'testString';
        const description = 'New sub domain 1';
        const createDataProductSubdomainParams = {
          domainId,
          containerId,
          name,
          id,
          description,
        };

        const createDataProductSubdomainResult = dphService.createDataProductSubdomain(
          createDataProductSubdomainParams
        );

        // all methods should return a Promise
        expectToBePromise(createDataProductSubdomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}/subdomains',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductSubdomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDataProductSubdomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDataProductSubdomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const containerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductSubdomainParams = {
          domainId,
          containerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDataProductSubdomain(createDataProductSubdomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDataProductSubdomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDataProductSubdomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDomain', () => {
    describe('positive tests', () => {
      function __getDomainTest() {
        // Construct the params object for operation getDomain
        const domainId = 'testString';
        const getDomainParams = {
          domainId,
        };

        const getDomainResult = dphService.getDomain(getDomainParams);

        // all methods should return a Promise
        expectToBePromise(getDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDomainParams = {
          domainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDomain(getDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDomain', () => {
    describe('positive tests', () => {
      function __deleteDomainTest() {
        // Construct the params object for operation deleteDomain
        const domainId = 'testString';
        const deleteDomainParams = {
          domainId,
        };

        const deleteDomainResult = dphService.deleteDomain(deleteDomainParams);

        // all methods should return a Promise
        expectToBePromise(deleteDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __deleteDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __deleteDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDomainParams = {
          domainId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.deleteDomain(deleteDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.deleteDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.deleteDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductDomain', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductDomainTest() {
        // Construct the params object for operation updateDataProductDomain
        const domainId = 'testString';
        const containerId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductDomainParams = {
          domainId,
          containerId,
          jsonPatchInstructions,
        };

        const updateDataProductDomainResult = dphService.updateDataProductDomain(
          updateDataProductDomainParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDataProductDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDataProductDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDataProductDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const containerId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductDomainParams = {
          domainId,
          containerId,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDataProductDomain(updateDataProductDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDataProductDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDataProductDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getContractTemplatesByDomain', () => {
    describe('positive tests', () => {
      function __getContractTemplatesByDomainTest() {
        // Construct the params object for operation getContractTemplatesByDomain
        const domainId = 'testString';
        const containerId = 'testString';
        const getContractTemplatesByDomainParams = {
          domainId,
          containerId,
        };

        const getContractTemplatesByDomainResult = dphService.getContractTemplatesByDomain(
          getContractTemplatesByDomainParams
        );

        // all methods should return a Promise
        expectToBePromise(getContractTemplatesByDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}/contract_templates',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getContractTemplatesByDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getContractTemplatesByDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getContractTemplatesByDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const containerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getContractTemplatesByDomainParams = {
          domainId,
          containerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getContractTemplatesByDomain(getContractTemplatesByDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getContractTemplatesByDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getContractTemplatesByDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProductByDomain', () => {
    describe('positive tests', () => {
      function __getDataProductByDomainTest() {
        // Construct the params object for operation getDataProductByDomain
        const domainId = 'testString';
        const containerId = 'testString';
        const getDataProductByDomainParams = {
          domainId,
          containerId,
        };

        const getDataProductByDomainResult = dphService.getDataProductByDomain(
          getDataProductByDomainParams
        );

        // all methods should return a Promise
        expectToBePromise(getDataProductByDomainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/domains/{domain_id}/data_products',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['container.id']).toEqual(containerId);
        expect(mockRequestOptions.path.domain_id).toEqual(domainId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductByDomainTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDataProductByDomainTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDataProductByDomainTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const domainId = 'testString';
        const containerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductByDomainParams = {
          domainId,
          containerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDataProductByDomain(getDataProductByDomainParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDataProductByDomain({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDataProductByDomain();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createS3Bucket', () => {
    describe('positive tests', () => {
      function __createS3BucketTest() {
        // Construct the params object for operation createS3Bucket
        const isShared = true;
        const createS3BucketParams = {
          isShared,
        };

        const createS3BucketResult = dphService.createS3Bucket(createS3BucketParams);

        // all methods should return a Promise
        expectToBePromise(createS3BucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/bucket', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.is_shared).toEqual(isShared);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createS3BucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createS3BucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createS3BucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const isShared = true;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createS3BucketParams = {
          isShared,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createS3Bucket(createS3BucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createS3Bucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createS3Bucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getS3BucketValidation', () => {
    describe('positive tests', () => {
      function __getS3BucketValidationTest() {
        // Construct the params object for operation getS3BucketValidation
        const bucketName = 'testString';
        const getS3BucketValidationParams = {
          bucketName,
        };

        const getS3BucketValidationResult = dphService.getS3BucketValidation(
          getS3BucketValidationParams
        );

        // all methods should return a Promise
        expectToBePromise(getS3BucketValidationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/bucket/validate/{bucket_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.bucket_name).toEqual(bucketName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getS3BucketValidationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getS3BucketValidationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getS3BucketValidationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getS3BucketValidationParams = {
          bucketName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getS3BucketValidation(getS3BucketValidationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getS3BucketValidation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getS3BucketValidation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRevokeAccessProcessState', () => {
    describe('positive tests', () => {
      function __getRevokeAccessProcessStateTest() {
        // Construct the params object for operation getRevokeAccessProcessState
        const releaseId = 'testString';
        const limit = 200;
        const start = 'testString';
        const getRevokeAccessProcessStateParams = {
          releaseId,
          limit,
          start,
        };

        const getRevokeAccessProcessStateResult = dphService.getRevokeAccessProcessState(
          getRevokeAccessProcessStateParams
        );

        // all methods should return a Promise
        expectToBePromise(getRevokeAccessProcessStateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_revoke_access/job_runs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.release_id).toEqual(releaseId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRevokeAccessProcessStateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getRevokeAccessProcessStateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getRevokeAccessProcessStateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const releaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRevokeAccessProcessStateParams = {
          releaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getRevokeAccessProcessState(getRevokeAccessProcessStateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getRevokeAccessProcessState({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getRevokeAccessProcessState();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDeliveryMethods', () => {
    describe('positive tests', () => {
      function __listDeliveryMethodsTest() {
        // Construct the params object for operation listDeliveryMethods
        const catalogId = 'testString';
        const listDeliveryMethodsParams = {
          catalogId,
        };

        const listDeliveryMethodsResult = dphService.listDeliveryMethods(listDeliveryMethodsParams);

        // all methods should return a Promise
        expectToBePromise(listDeliveryMethodsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/delivery_method', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDeliveryMethodsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __listDeliveryMethodsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __listDeliveryMethodsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDeliveryMethodsParams = {
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.listDeliveryMethods(listDeliveryMethodsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.listDeliveryMethods({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.listDeliveryMethods();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDeliveryMethod', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      function __createDeliveryMethodTest() {
        // Construct the params object for operation createDeliveryMethod
        const catalogId = 'testString';
        const name = 'New delivery method';
        const resourceKey = 'new-delivery-method';
        const description = 'Description of the new delivery method';
        const status = 'true';
        const container = containerReferenceModel;
        const supportedAssetTypes = ['data_asset'];
        const supportedAuthMethods = ['testString'];
        const supportedAuthMethodsCpd = ['testString'];
        const supportedDataSources = ['DATA_SOURCE_ID_1', 'DATA_SOURCE_ID_2'];
        const supportsRedelivery = false;
        const isRestricted = true;
        const supportsRetryOnFailure = true;
        const supportsRevokeAccess = true;
        const supportsColumnSelection = true;
        const supportsAddToProject = false;
        const producerInput = [
          {
            key: '<input_key>',
            type: 'string|enum|array|connection',
            localized_name: { default: 'Default Label', en: 'English Label' },
            localized_description: { default: 'Default Description', en: 'English Description' },
            required: true,
            valid_values: ['<value1>', '<value2>'],
          },
        ];
        const consumerInput = [
          {
            key: '<input_key>',
            type: 'string|enum|array|connection',
            localized_name: { default: 'Default Label', en: 'English Label' },
            localized_description: { default: 'Default Description', en: 'English Description' },
            required: true,
            supported_data_sources: ['<DATA_SOURCE_ID>'],
            valid_values: ['<value1>', '<value2>'],
            hmac_enabled: false,
            has_bucket: false,
          },
        ];
        const outputFormat = [
          {
            key: '<output_key>',
            type: 'string|url|copy_text|array',
            localized_name: {
              default: '<Default Label>',
              en: '<English Label>',
              de: '<German Label>',
              eo: '<Esperanto Key>',
              es: '<Spanish Label>',
              fr: '<French Label>',
              it: '<Italian Label>',
              ja: '<Japanese Label>',
              ko: '<Korean Label>',
              pl: '<Polish Label>',
              pt: '<Portuguese Label>',
              ru: '<Russian Label>',
              sv: '<Swedish Label>',
              zh: '<Chinese Simplified Label>',
              'zh-TW': '<Chinese Traditional Label>',
            },
            contents: [
              {
                key: '<nested_key>',
                type: 'string|copy_text',
                localized_name: { default: '<Default Label>', en: '<English Label>' },
              },
            ],
          },
        ];
        const autoMarkDelivered = true;
        const deliveryUsesFunctionalCredentials = true;
        const dataSourceProperties = { DATA_SOURCE_ID: { supports_query: false } };
        const deliveryOutput = {
          delivery_output_assets: [
            {
              asset_type: 'ibm_url_definition|data_asset',
              localized_labels: { default: '<Default Label>', en: '<English Label>' },
            },
          ],
        };
        const createDeliveryMethodParams = {
          catalogId,
          name,
          resourceKey,
          description,
          status,
          container,
          supportedAssetTypes,
          supportedAuthMethods,
          supportedAuthMethodsCpd,
          supportedDataSources,
          supportsRedelivery,
          isRestricted,
          supportsRetryOnFailure,
          supportsRevokeAccess,
          supportsColumnSelection,
          supportsAddToProject,
          producerInput,
          consumerInput,
          outputFormat,
          autoMarkDelivered,
          deliveryUsesFunctionalCredentials,
          dataSourceProperties,
          deliveryOutput,
        };

        const createDeliveryMethodResult = dphService.createDeliveryMethod(
          createDeliveryMethodParams
        );

        // all methods should return a Promise
        expectToBePromise(createDeliveryMethodResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/data_product_exchange/v1/delivery_method', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.resource_key).toEqual(resourceKey);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.container).toEqual(container);
        expect(mockRequestOptions.body.supported_asset_types).toEqual(supportedAssetTypes);
        expect(mockRequestOptions.body.supported_auth_methods).toEqual(supportedAuthMethods);
        expect(mockRequestOptions.body.supported_auth_methods_cpd).toEqual(supportedAuthMethodsCpd);
        expect(mockRequestOptions.body.supported_data_sources).toEqual(supportedDataSources);
        expect(mockRequestOptions.body.supports_redelivery).toEqual(supportsRedelivery);
        expect(mockRequestOptions.body.is_restricted).toEqual(isRestricted);
        expect(mockRequestOptions.body.supports_retry_on_failure).toEqual(supportsRetryOnFailure);
        expect(mockRequestOptions.body.supports_revoke_access).toEqual(supportsRevokeAccess);
        expect(mockRequestOptions.body.supports_column_selection).toEqual(supportsColumnSelection);
        expect(mockRequestOptions.body.supports_add_to_project).toEqual(supportsAddToProject);
        expect(mockRequestOptions.body.producer_input).toEqual(producerInput);
        expect(mockRequestOptions.body.consumer_input).toEqual(consumerInput);
        expect(mockRequestOptions.body.output_format).toEqual(outputFormat);
        expect(mockRequestOptions.body.auto_mark_delivered).toEqual(autoMarkDelivered);
        expect(mockRequestOptions.body.delivery_uses_functional_credentials).toEqual(
          deliveryUsesFunctionalCredentials
        );
        expect(mockRequestOptions.body.data_source_properties).toEqual(dataSourceProperties);
        expect(mockRequestOptions.body.delivery_output).toEqual(deliveryOutput);
        expect(mockRequestOptions.qs.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDeliveryMethodTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __createDeliveryMethodTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __createDeliveryMethodTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const name = 'New delivery method';
        const resourceKey = 'new-delivery-method';
        const description = 'Description of the new delivery method';
        const status = 'true';
        const container = containerReferenceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDeliveryMethodParams = {
          catalogId,
          name,
          resourceKey,
          description,
          status,
          container,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.createDeliveryMethod(createDeliveryMethodParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.createDeliveryMethod({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.createDeliveryMethod();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDeliveryMethod', () => {
    describe('positive tests', () => {
      function __getDeliveryMethodTest() {
        // Construct the params object for operation getDeliveryMethod
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const getDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
        };

        const getDeliveryMethodResult = dphService.getDeliveryMethod(getDeliveryMethodParams);

        // all methods should return a Promise
        expectToBePromise(getDeliveryMethodResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/delivery_method/{delivery_method_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.delivery_method_id).toEqual(deliveryMethodId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDeliveryMethodTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __getDeliveryMethodTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __getDeliveryMethodTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.getDeliveryMethod(getDeliveryMethodParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.getDeliveryMethod({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.getDeliveryMethod();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDeliveryMethod', () => {
    describe('positive tests', () => {
      function __deleteDeliveryMethodTest() {
        // Construct the params object for operation deleteDeliveryMethod
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const deleteDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
        };

        const deleteDeliveryMethodResult = dphService.deleteDeliveryMethod(
          deleteDeliveryMethodParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteDeliveryMethodResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/delivery_method/{delivery_method_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.delivery_method_id).toEqual(deliveryMethodId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDeliveryMethodTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __deleteDeliveryMethodTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __deleteDeliveryMethodTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.deleteDeliveryMethod(deleteDeliveryMethodParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.deleteDeliveryMethod({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.deleteDeliveryMethod();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDeliveryMethod', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDeliveryMethodTest() {
        // Construct the params object for operation updateDeliveryMethod
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const updateDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
          jsonPatchOperation,
        };

        const updateDeliveryMethodResult = dphService.updateDeliveryMethod(
          updateDeliveryMethodParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDeliveryMethodResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/delivery_method/{delivery_method_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchOperation);
        expect(mockRequestOptions.qs.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.delivery_method_id).toEqual(deliveryMethodId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDeliveryMethodTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dphService.enableRetries();
        __updateDeliveryMethodTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dphService.disableRetries();
        __updateDeliveryMethodTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const deliveryMethodId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDeliveryMethodParams = {
          catalogId,
          deliveryMethodId,
          jsonPatchOperation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dphService.updateDeliveryMethod(updateDeliveryMethodParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dphService.updateDeliveryMethod({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dphService.updateDeliveryMethod();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
