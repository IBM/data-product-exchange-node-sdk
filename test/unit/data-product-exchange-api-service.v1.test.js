/**
 * (C) Copyright IBM Corp. 2023.
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

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const DataProductExchangeApiServiceV1 = require('../../dist/data-product-exchange-api-service/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const dataProductExchangeApiServiceServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://data-product-exchange-api-service.cloud.ibm.com/data_product_exchange/v1/123456',
};

const dataProductExchangeApiServiceService = new DataProductExchangeApiServiceV1(
  dataProductExchangeApiServiceServiceOptions
);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(dataProductExchangeApiServiceService, 'createRequest');
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

describe('DataProductExchangeApiServiceV1', () => {
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
      const testInstance = DataProductExchangeApiServiceV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        DataProductExchangeApiServiceV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(DataProductExchangeApiServiceV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = DataProductExchangeApiServiceV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DataProductExchangeApiServiceV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new DataProductExchangeApiServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new DataProductExchangeApiServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        DataProductExchangeApiServiceV1.DEFAULT_SERVICE_URL
      );
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

        const getInitializeStatusResult =
          dataProductExchangeApiServiceService.getInitializeStatus(getInitializeStatusParams);

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
        dataProductExchangeApiServiceService.enableRetries();
        __getInitializeStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
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

        dataProductExchangeApiServiceService.getInitializeStatus(getInitializeStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dataProductExchangeApiServiceService.getInitializeStatus({});
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
        const include = ['delivery_methods', 'data_product_samples', 'domains_multi_industry'];
        const initializeParams = {
          container,
          include,
        };

        const initializeResult = dataProductExchangeApiServiceService.initialize(initializeParams);

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
        dataProductExchangeApiServiceService.enableRetries();
        __initializeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
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

        dataProductExchangeApiServiceService.initialize(initializeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dataProductExchangeApiServiceService.initialize({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getDataProduct', () => {
    describe('positive tests', () => {
      function __getDataProductTest() {
        // Construct the params object for operation getDataProduct
        const id = 'testString';
        const getDataProductParams = {
          id,
        };

        const getDataProductResult =
          dataProductExchangeApiServiceService.getDataProduct(getDataProductParams);

        // all methods should return a Promise
        expectToBePromise(getDataProductResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_products/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __getDataProductTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __getDataProductTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.getDataProduct(getDataProductParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.getDataProduct({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.getDataProduct();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

        const listDataProductsResult =
          dataProductExchangeApiServiceService.listDataProducts(listDataProductsParams);

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
        dataProductExchangeApiServiceService.enableRetries();
        __listDataProductsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
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

        dataProductExchangeApiServiceService.listDataProducts(listDataProductsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dataProductExchangeApiServiceService.listDataProducts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('DataProductsPager tests', () => {
      const serviceUrl = dataProductExchangeApiServiceServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"name":"Sample Data Product"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"},"name":"Sample Data Product"}]}';

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
        const pager = new DataProductExchangeApiServiceV1.DataProductsPager(
          dataProductExchangeApiServiceService,
          params
        );
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
        const pager = new DataProductExchangeApiServiceV1.DataProductsPager(
          dataProductExchangeApiServiceService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listDataProductVersions', () => {
    describe('positive tests', () => {
      function __listDataProductVersionsTest() {
        // Construct the params object for operation listDataProductVersions
        const assetContainerId = 'testString';
        const dataProduct = 'testString';
        const state = 'draft';
        const version = 'testString';
        const limit = 200;
        const start = 'testString';
        const listDataProductVersionsParams = {
          assetContainerId,
          dataProduct,
          state,
          version,
          limit,
          start,
        };

        const listDataProductVersionsResult =
          dataProductExchangeApiServiceService.listDataProductVersions(
            listDataProductVersionsParams
          );

        // all methods should return a Promise
        expectToBePromise(listDataProductVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs['asset.container.id']).toEqual(assetContainerId);
        expect(mockRequestOptions.qs.data_product).toEqual(dataProduct);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDataProductVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __listDataProductVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __listDataProductVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductVersionsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.listDataProductVersions(listDataProductVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dataProductExchangeApiServiceService.listDataProductVersions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('DataProductVersionsPager tests', () => {
      const serviceUrl = dataProductExchangeApiServiceServiceOptions.url;
      const path = '/data_product_exchange/v1/data_product_versions';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"data_product_versions":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"data_product_versions":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}],"total_count":2,"limit":1}';

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
          assetContainerId: 'testString',
          dataProduct: 'testString',
          state: 'draft',
          version: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new DataProductExchangeApiServiceV1.DataProductVersionsPager(
          dataProductExchangeApiServiceService,
          params
        );
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
          assetContainerId: 'testString',
          dataProduct: 'testString',
          state: 'draft',
          version: 'testString',
          limit: 10,
        };
        const pager = new DataProductExchangeApiServiceV1.DataProductVersionsPager(
          dataProductExchangeApiServiceService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDataProductVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // DataProductIdentity
      const dataProductIdentityModel = {
        id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      };

      // UseCase
      const useCaseModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // Domain
      const domainModel = {
        id: 'testString',
        name: 'testString',
        container: containerReferenceModel,
      };

      // AssetPartReference
      const assetPartReferenceModel = {
        id: '2b0bf220-079c-11ee-be56-0242ac120002',
        container: containerReferenceModel,
        type: 'data_asset',
      };

      // DeliveryMethod
      const deliveryMethodModel = {
        id: '09cf5fcc-cb9d-4995-a8e4-16517b25229f',
        container: containerReferenceModel,
      };

      // DataProductPart
      const dataProductPartModel = {
        asset: assetPartReferenceModel,
        revision: 1,
        updated_at: '2023-07-01T22:22:34.876Z',
        delivery_methods: [deliveryMethodModel],
      };

      function __createDataProductVersionTest() {
        // Construct the params object for operation createDataProductVersion
        const container = containerReferenceModel;
        const version = 'testString';
        const state = 'draft';
        const dataProduct = dataProductIdentityModel;
        const name = 'My New Data Product';
        const description = 'testString';
        const tags = ['testString'];
        const useCases = [useCaseModel];
        const domain = domainModel;
        const type = ['data'];
        const partsOut = [dataProductPartModel];
        const createDataProductVersionParams = {
          container,
          version,
          state,
          dataProduct,
          name,
          description,
          tags,
          useCases,
          domain,
          type,
          partsOut,
        };

        const createDataProductVersionResult =
          dataProductExchangeApiServiceService.createDataProductVersion(
            createDataProductVersionParams
          );

        // all methods should return a Promise
        expectToBePromise(createDataProductVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.container).toEqual(container);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.body.data_product).toEqual(dataProduct);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.use_cases).toEqual(useCases);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.parts_out).toEqual(partsOut);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __createDataProductVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __createDataProductVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const container = containerReferenceModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductVersionParams = {
          container,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.createDataProductVersion(
          createDataProductVersionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.createDataProductVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.createDataProductVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDataProductVersion', () => {
    describe('positive tests', () => {
      function __getDataProductVersionTest() {
        // Construct the params object for operation getDataProductVersion
        const id = 'testString';
        const getDataProductVersionParams = {
          id,
        };

        const getDataProductVersionResult =
          dataProductExchangeApiServiceService.getDataProductVersion(getDataProductVersionParams);

        // all methods should return a Promise
        expectToBePromise(getDataProductVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __getDataProductVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __getDataProductVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductVersionParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.getDataProductVersion(getDataProductVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.getDataProductVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.getDataProductVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDataProductVersion', () => {
    describe('positive tests', () => {
      function __deleteDataProductVersionTest() {
        // Construct the params object for operation deleteDataProductVersion
        const id = 'testString';
        const deleteDataProductVersionParams = {
          id,
        };

        const deleteDataProductVersionResult =
          dataProductExchangeApiServiceService.deleteDataProductVersion(
            deleteDataProductVersionParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteDataProductVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDataProductVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __deleteDataProductVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __deleteDataProductVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDataProductVersionParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.deleteDataProductVersion(
          deleteDataProductVersionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.deleteDataProductVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.deleteDataProductVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDataProductVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDataProductVersionTest() {
        // Construct the params object for operation updateDataProductVersion
        const id = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductVersionParams = {
          id,
          jsonPatchInstructions,
        };

        const updateDataProductVersionResult =
          dataProductExchangeApiServiceService.updateDataProductVersion(
            updateDataProductVersionParams
          );

        // all methods should return a Promise
        expectToBePromise(updateDataProductVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchInstructions);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDataProductVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __updateDataProductVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __updateDataProductVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDataProductVersionParams = {
          id,
          jsonPatchInstructions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.updateDataProductVersion(
          updateDataProductVersionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.updateDataProductVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.updateDataProductVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deliverDataProductVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ItemReference
      const itemReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
      };

      // OrderReference
      const orderReferenceModel = {
        id: '4705e047-1808-459a-805f-d5d13c947637',
        items: [itemReferenceModel],
      };

      function __deliverDataProductVersionTest() {
        // Construct the params object for operation deliverDataProductVersion
        const id = 'testString';
        const order = orderReferenceModel;
        const deliverDataProductVersionParams = {
          id,
          order,
        };

        const deliverDataProductVersionResult =
          dataProductExchangeApiServiceService.deliverDataProductVersion(
            deliverDataProductVersionParams
          );

        // all methods should return a Promise
        expectToBePromise(deliverDataProductVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/data_product_exchange/v1/data_product_versions/{id}/deliver',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.order).toEqual(order);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deliverDataProductVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.enableRetries();
        __deliverDataProductVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dataProductExchangeApiServiceService.disableRetries();
        __deliverDataProductVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deliverDataProductVersionParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dataProductExchangeApiServiceService.deliverDataProductVersion(
          deliverDataProductVersionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.deliverDataProductVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dataProductExchangeApiServiceService.deliverDataProductVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
