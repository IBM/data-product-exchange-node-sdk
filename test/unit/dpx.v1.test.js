/**
 * (C) Copyright IBM Corp. 2024.
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
const DpxV1 = require('../../dist/dpx/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const dpxServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://data-product-exchange-api-service.cloud.ibm.com/data_product_exchange/v1',
};

const dpxService = new DpxV1(dpxServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(dpxService, 'createRequest');
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

describe('DpxV1', () => {
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
      const testInstance = DpxV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DpxV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DpxV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DpxV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = DpxV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DpxV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new DpxV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new DpxV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DpxV1.DEFAULT_SERVICE_URL);
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

        const getInitializeStatusResult = dpxService.getInitializeStatus(getInitializeStatusParams);

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
        dpxService.enableRetries();
        __getInitializeStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
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

        dpxService.getInitializeStatus(getInitializeStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dpxService.getInitializeStatus({});
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

        const initializeResult = dpxService.initialize(initializeParams);

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
        dpxService.enableRetries();
        __initializeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
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

        dpxService.initialize(initializeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dpxService.initialize({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('manageApiKeys', () => {
    describe('positive tests', () => {
      function __manageApiKeysTest() {
        // Construct the params object for operation manageApiKeys
        const manageApiKeysParams = {};

        const manageApiKeysResult = dpxService.manageApiKeys(manageApiKeysParams);

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
        dpxService.enableRetries();
        __manageApiKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
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

        dpxService.manageApiKeys(manageApiKeysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dpxService.manageApiKeys({});
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

        const listDataProductsResult = dpxService.listDataProducts(listDataProductsParams);

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
        dpxService.enableRetries();
        __listDataProductsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
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

        dpxService.listDataProducts(listDataProductsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dpxService.listDataProducts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('DataProductsPager tests', () => {
      const serviceUrl = dpxServiceOptions.url;
      const path = '/data_product_exchange/v1/data_products';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"data_products":[{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}]}';

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
        const pager = new DpxV1.DataProductsPager(dpxService, params);
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
        const pager = new DpxV1.DataProductsPager(dpxService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDataProduct', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DataProductIdentity
      const dataProductIdentityModel = {
        id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      };

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-11ee-be56-0242ac120002',
        container: containerReferenceModel,
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

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'testString',
        type: 'terms_and_conditions',
        name: 'testString',
        id: '2b0bf220-079c-11ee-be56-0242ac120002',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // DataProductContractTerms
      const dataProductContractTermsModel = {
        asset: assetReferenceModel,
        id: 'testString',
        documents: [contractTermsDocumentModel],
      };

      // DataProductVersionPrototype
      const dataProductVersionPrototypeModel = {
        version: '1.0.0',
        state: 'draft',
        data_product: dataProductIdentityModel,
        name: 'My New Data Product',
        description: 'This is a description of My Data Product.',
        asset: assetReferenceModel,
        tags: ['testString'],
        use_cases: [useCaseModel],
        domain: domainModel,
        types: ['data'],
        parts_out: [dataProductPartModel],
        contract_terms: [dataProductContractTermsModel],
        is_restricted: true,
      };

      function __createDataProductTest() {
        // Construct the params object for operation createDataProduct
        const drafts = [dataProductVersionPrototypeModel];
        const createDataProductParams = {
          drafts,
        };

        const createDataProductResult = dpxService.createDataProduct(createDataProductParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dpxService.enableRetries();
        __createDataProductTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __createDataProductTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const drafts = [dataProductVersionPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDataProductParams = {
          drafts,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dpxService.createDataProduct(createDataProductParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.createDataProduct({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.createDataProduct();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const getDataProductParams = {
          dataProductId,
        };

        const getDataProductResult = dpxService.getDataProduct(getDataProductParams);

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
        dpxService.enableRetries();
        __getDataProductTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __getDataProductTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDataProductParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dpxService.getDataProduct(getDataProductParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.getDataProduct({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.getDataProduct();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const documentId = 'testString';
        const completeDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const completeDraftContractTermsDocumentResult =
          dpxService.completeDraftContractTermsDocument(completeDraftContractTermsDocumentParams);

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
        dpxService.enableRetries();
        __completeDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __completeDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
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

        dpxService.completeDraftContractTermsDocument(completeDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.completeDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.completeDraftContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
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

        const listDataProductDraftsResult = dpxService.listDataProductDrafts(
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
        dpxService.enableRetries();
        __listDataProductDraftsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __listDataProductDraftsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductDraftsParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dpxService.listDataProductDrafts(listDataProductDraftsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.listDataProductDrafts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.listDataProductDrafts();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DataProductDraftsPager tests', () => {
      const serviceUrl = dpxServiceOptions.url;
      const path =
        '/data_product_exchange/v1/data_products/b38df608-d34b-4d58-8136-ed25e6c6684e/drafts';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"drafts":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"drafts":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';

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
          dataProductId: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
          assetContainerId: 'testString',
          version: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new DpxV1.DataProductDraftsPager(dpxService, params);
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
          dataProductId: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
          assetContainerId: 'testString',
          version: 'testString',
          limit: 10,
        };
        const pager = new DpxV1.DataProductDraftsPager(dpxService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createDataProductDraft', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContainerReference
      const containerReferenceModel = {
        id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
        type: 'catalog',
      };

      // AssetReference
      const assetReferenceModel = {
        id: '2b0bf220-079c-11ee-be56-0242ac120002',
        container: containerReferenceModel,
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

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      // ContractTermsDocument
      const contractTermsDocumentModel = {
        url: 'testString',
        type: 'terms_and_conditions',
        name: 'testString',
        id: '2b0bf220-079c-11ee-be56-0242ac120002',
        attachment: contractTermsDocumentAttachmentModel,
        upload_url: 'testString',
      };

      // DataProductContractTerms
      const dataProductContractTermsModel = {
        asset: assetReferenceModel,
        id: 'testString',
        documents: [contractTermsDocumentModel],
      };

      function __createDataProductDraftTest() {
        // Construct the params object for operation createDataProductDraft
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const asset = assetReferenceModel;
        const version = '1.2.0';
        const state = 'draft';
        const dataProduct = dataProductIdentityModel;
        const name = 'testString';
        const description = 'testString';
        const tags = ['testString'];
        const useCases = [useCaseModel];
        const domain = domainModel;
        const types = ['data'];
        const partsOut = [dataProductPartModel];
        const contractTerms = [dataProductContractTermsModel];
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
          domain,
          types,
          partsOut,
          contractTerms,
          isRestricted,
        };

        const createDataProductDraftResult = dpxService.createDataProductDraft(
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
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.types).toEqual(types);
        expect(mockRequestOptions.body.parts_out).toEqual(partsOut);
        expect(mockRequestOptions.body.contract_terms).toEqual(contractTerms);
        expect(mockRequestOptions.body.is_restricted).toEqual(isRestricted);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDataProductDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dpxService.enableRetries();
        __createDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __createDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const asset = assetReferenceModel;
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

        dpxService.createDataProductDraft(createDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.createDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.createDataProductDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDraftContractTermsDocument', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContractTermsDocumentAttachment
      const contractTermsDocumentAttachmentModel = {
        id: 'testString',
      };

      function __createDraftContractTermsDocumentTest() {
        // Construct the params object for operation createDraftContractTermsDocument
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const type = 'terms_and_conditions';
        const name = 'Terms and conditions document';
        const id = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const url = 'testString';
        const attachment = contractTermsDocumentAttachmentModel;
        const uploadUrl = 'testString';
        const createDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          type,
          name,
          id,
          url,
          attachment,
          uploadUrl,
        };

        const createDraftContractTermsDocumentResult = dpxService.createDraftContractTermsDocument(
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
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.attachment).toEqual(attachment);
        expect(mockRequestOptions.body.upload_url).toEqual(uploadUrl);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.draft_id).toEqual(draftId);
        expect(mockRequestOptions.path.contract_terms_id).toEqual(contractTermsId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDraftContractTermsDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dpxService.enableRetries();
        __createDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __createDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const type = 'terms_and_conditions';
        const name = 'Terms and conditions document';
        const id = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          type,
          name,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dpxService.createDraftContractTermsDocument(createDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.createDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.createDraftContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const getDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const getDataProductDraftResult = dpxService.getDataProductDraft(getDataProductDraftParams);

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
        dpxService.enableRetries();
        __getDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __getDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.getDataProductDraft(getDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.getDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.getDataProductDraft();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const deleteDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const deleteDataProductDraftResult = dpxService.deleteDataProductDraft(
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
        dpxService.enableRetries();
        __deleteDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __deleteDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.deleteDataProductDraft(deleteDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.deleteDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.deleteDataProductDraft();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductDraftParams = {
          dataProductId,
          draftId,
          jsonPatchInstructions,
        };

        const updateDataProductDraftResult = dpxService.updateDataProductDraft(
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
        dpxService.enableRetries();
        __updateDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __updateDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.updateDataProductDraft(updateDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.updateDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.updateDataProductDraft();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const documentId = 'testString';
        const getDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const getDraftContractTermsDocumentResult = dpxService.getDraftContractTermsDocument(
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
        dpxService.enableRetries();
        __getDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __getDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
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

        dpxService.getDraftContractTermsDocument(getDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.getDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.getDraftContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const documentId = 'testString';
        const deleteDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
        };

        const deleteDraftContractTermsDocumentResult = dpxService.deleteDraftContractTermsDocument(
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
        dpxService.enableRetries();
        __deleteDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __deleteDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
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

        dpxService.deleteDraftContractTermsDocument(deleteDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.deleteDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.deleteDraftContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const documentId = 'testString';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDraftContractTermsDocumentParams = {
          dataProductId,
          draftId,
          contractTermsId,
          documentId,
          jsonPatchInstructions,
        };

        const updateDraftContractTermsDocumentResult = dpxService.updateDraftContractTermsDocument(
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
        dpxService.enableRetries();
        __updateDraftContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __updateDraftContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
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

        dpxService.updateDraftContractTermsDocument(updateDraftContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.updateDraftContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.updateDraftContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const publishDataProductDraftParams = {
          dataProductId,
          draftId,
        };

        const publishDataProductDraftResult = dpxService.publishDataProductDraft(
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
        dpxService.enableRetries();
        __publishDataProductDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __publishDataProductDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const draftId = '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.publishDataProductDraft(publishDataProductDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.publishDataProductDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.publishDataProductDraft();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const getDataProductReleaseParams = {
          dataProductId,
          releaseId,
        };

        const getDataProductReleaseResult = dpxService.getDataProductRelease(
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
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDataProductReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dpxService.enableRetries();
        __getDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __getDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.getDataProductRelease(getDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.getDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.getDataProductRelease();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const jsonPatchInstructions = [jsonPatchOperationModel];
        const updateDataProductReleaseParams = {
          dataProductId,
          releaseId,
          jsonPatchInstructions,
        };

        const updateDataProductReleaseResult = dpxService.updateDataProductRelease(
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
        dpxService.enableRetries();
        __updateDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __updateDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.updateDataProductRelease(updateDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.updateDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.updateDataProductRelease();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
        const documentId = 'testString';
        const getReleaseContractTermsDocumentParams = {
          dataProductId,
          releaseId,
          contractTermsId,
          documentId,
        };

        const getReleaseContractTermsDocumentResult = dpxService.getReleaseContractTermsDocument(
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
        dpxService.enableRetries();
        __getReleaseContractTermsDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __getReleaseContractTermsDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const contractTermsId =
          '598183cd-b910-4e8d-9a97-97097afda3c1@e4fe2f87-0e56-46dd-b3b8-e9af32309e82';
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

        dpxService.getReleaseContractTermsDocument(getReleaseContractTermsDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.getReleaseContractTermsDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.getReleaseContractTermsDocument();
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
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

        const listDataProductReleasesResult = dpxService.listDataProductReleases(
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
        dpxService.enableRetries();
        __listDataProductReleasesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __listDataProductReleasesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDataProductReleasesParams = {
          dataProductId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dpxService.listDataProductReleases(listDataProductReleasesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.listDataProductReleases({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.listDataProductReleases();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DataProductReleasesPager tests', () => {
      const serviceUrl = dpxServiceOptions.url;
      const path =
        '/data_product_exchange/v1/data_products/b38df608-d34b-4d58-8136-ed25e6c6684e/releases';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"releases":[{"version":"1.0.0","state":"draft","data_product":{"id":"b38df608-d34b-4d58-8136-ed25e6c6684e"},"name":"My Data Product","description":"This is a description of My Data Product.","id":"2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd","asset":{"id":"2b0bf220-079c-11ee-be56-0242ac120002","container":{"id":"d29c42eb-7100-4b7a-8257-c196dbcca1cd","type":"catalog"}}}]}';

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
          dataProductId: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
          assetContainerId: 'testString',
          state: ['available'],
          version: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new DpxV1.DataProductReleasesPager(dpxService, params);
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
          dataProductId: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
          assetContainerId: 'testString',
          state: ['available'],
          version: 'testString',
          limit: 10,
        };
        const pager = new DpxV1.DataProductReleasesPager(dpxService, params);
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
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
        const retireDataProductReleaseParams = {
          dataProductId,
          releaseId,
        };

        const retireDataProductReleaseResult = dpxService.retireDataProductRelease(
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
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.data_product_id).toEqual(dataProductId);
        expect(mockRequestOptions.path.release_id).toEqual(releaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __retireDataProductReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dpxService.enableRetries();
        __retireDataProductReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dpxService.disableRetries();
        __retireDataProductReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataProductId = 'b38df608-d34b-4d58-8136-ed25e6c6684e';
        const releaseId =
          '2b0bf220-079c-11ee-be56-0242ac120002@d29c42eb-7100-4b7a-8257-c196dbcca1cd';
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

        dpxService.retireDataProductRelease(retireDataProductReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dpxService.retireDataProductRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dpxService.retireDataProductRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
