/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const DpxV1 = require('../dist/dpx/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the DPX service.
//
// The following configuration properties are assumed to be defined:
// DPX_URL=<service base url>
// DPX_AUTH_TYPE=iam
// DPX_APIKEY=<IAM apikey>
// DPX_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'dpx_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('DpxV1', () => {
  // Service instance
  let dpxService;

  // Variables to hold link values
  let containerIdLink;
  let contractTermsIdLink;
  let dataProductIdLink;
  let documentIdLink;
  let draftIdLink;
  let optionalDataProductIdLink;
  let releaseIdLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(DpxV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    dpxService = DpxV1.newInstance();

    // end-common
  });

  test('initialize request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('initialize() result:');
    // begin-initialize

    const params = {
      include: ['delivery_methods', 'data_product_samples', 'domains_multi_industry'],
    };

    let res;
    try {
      res = await dpxService.initialize(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-initialize
    const responseBody = res.result;
    containerIdLink = responseBody.container.id;
  });

  test('createDataProduct request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProduct() result:');
    // begin-create_data_product

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
    };

    // AssetReference
    const assetReferenceModel = {
      container: containerReferenceModel,
    };

    // DataProductVersionPrototype
    const dataProductVersionPrototypeModel = {
      name: 'My New Data Product',
      asset: assetReferenceModel,
    };

    const params = {
      drafts: [dataProductVersionPrototypeModel],
    };

    let res;
    try {
      res = await dpxService.createDataProduct(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product
    const responseBody = res.result;
    optionalDataProductIdLink = responseBody.id;
    dataProductIdLink = responseBody.id;
  });

  test('createDataProductDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProductDraft() result:');
    // begin-create_data_product_draft

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
    };

    // AssetReference
    const assetReferenceModel = {
      container: containerReferenceModel,
    };

    // DataProductIdentity
    const dataProductIdentityModel = {
      id: dataProductIdLink,
    };

    // Domain
    const domainModel = {
      id: '918c0bfd-6943-4468-b74f-bc111018e0d1',
      name: 'Customer Service',
      container: containerReferenceModel,
    };

    const params = {
      dataProductId: dataProductIdLink,
      asset: assetReferenceModel,
      version: '1.2.0',
      dataProduct: dataProductIdentityModel,
      domain: domainModel,
    };

    let res;
    try {
      res = await dpxService.createDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_draft
    const responseBody = res.result;
    draftIdLink = responseBody.id;
    contractTermsIdLink = responseBody.contract_terms[0].id;
  });

  test('deleteDataProductDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_data_product_draft

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    try {
      await dpxService.deleteDataProductDraft(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_data_product_draft
  });

  test('createDataProductDraftAgain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProductDraft() result:');
    // begin-create_data_product_draft

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
    };

    // AssetReference
    const assetReferenceModel = {
      container: containerReferenceModel,
    };

    // DataProductIdentity
    const dataProductIdentityModel = {
      id: dataProductIdLink,
    };

    // Domain
    const domainModel = {
      id: '918c0bfd-6943-4468-b74f-bc111018e0d1',
      name: 'Customer Service',
      container: containerReferenceModel,
    };

    const params = {
      dataProductId: dataProductIdLink,
      asset: assetReferenceModel,
      version: '1.2.0',
      dataProduct: dataProductIdentityModel,
      domain: domainModel,
    };

    let res;
    try {
      res = await dpxService.createDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_draft
    const responseBody = res.result;
    draftIdLink = responseBody.id;
    contractTermsIdLink = responseBody.contract_terms[0].id;
  });

  test('createDraftContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDraftContractTermsDocument() result:');
    // begin-create_draft_contract_terms_document

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      url: 'https://www.google.com',
    };

    let res;
    try {
      res = await dpxService.createDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_draft_contract_terms_document
    const responseBody = res.result;
    documentIdLink = responseBody.id;
  });

  test('deleteDraftContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_draft_contract_terms_document

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    try {
      await dpxService.deleteDraftContractTermsDocument(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_draft_contract_terms_document
  });

  test('createDraftContractTermsDocumentAgain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDraftContractTermsDocument() result:');
    // begin-create_draft_contract_terms_document

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      url: 'https://www.google.com',
    };

    let res;
    try {
      res = await dpxService.createDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_draft_contract_terms_document
    const responseBody = res.result;
    documentIdLink = responseBody.id;
  });

  test('updateDataProductDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductDraft() result:');
    // begin-update_data_product_draft

    // Request models needed by this operation.

    // Construct the asset object
    const assetString =
      '{"id":"669a570b-31f7-4c84-bfd1-851282ab5b86","container":{"id":"b6eb50b4-ace4-4dab-b2c4-318bb4c032a6","type":"catalog"}}';

    // Parse the JSON string to a dictionary
    const assetMap = JSON.parse(assetString);

    // Create a list to hold the asset object
    const partsOutList = [{ asset: assetMap }];

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: '/parts_out',
      value: partsOutList,
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dpxService.updateDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_draft
  });

  test('getDataProductDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProductDraft() result:');
    // begin-get_data_product_draft

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    let res;
    try {
      res = await dpxService.getDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_draft
  });

  test('updateDraftContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDraftContractTermsDocument() result:');
    // begin-update_draft_contract_terms_document

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/url',
      value: 'https://google.com',
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dpxService.updateDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_draft_contract_terms_document
  });

  test('getInitializeStatus request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInitializeStatus() result:');
    // begin-get_initialize_status

    let res;
    try {
      res = await dpxService.getInitializeStatus({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_initialize_status
  });

  test('getDraftContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDraftContractTermsDocument() result:');
    // begin-get_draft_contract_terms_document

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    let res;
    try {
      res = await dpxService.getDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_draft_contract_terms_document
  });

  test('publishDataProductDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('publishDataProductDraft() result:');
    // begin-publish_data_product_draft

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    let res;
    try {
      res = await dpxService.publishDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-publish_data_product_draft
    const responseBody = res.result;
    releaseIdLink = responseBody.id;
  });

  test('manageApiKeys request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-manage_api_keys

    try {
      await dpxService.manageApiKeys({});
    } catch (err) {
      console.warn(err);
    }

    // end-manage_api_keys
  });

  test('listDataProducts request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProducts() result:');
    // begin-list_data_products

    const params = {
      limit: 5,
    };

    const allResults = [];
    try {
      const pager = new DpxV1.DataProductsPager(dpxService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_products
  }, 20000);

  test('getDataProduct request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProduct() result:');
    // begin-get_data_product

    const params = {
      dataProductId: dataProductIdLink,
    };

    let res;
    try {
      res = await dpxService.getDataProduct(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product
  });

  // test('completeDraftContractTermsDocument request example', async () => {
  //   consoleLogMock.mockImplementation((output) => {
  //     originalLog(output);
  //   });
  //   consoleWarnMock.mockImplementation((output) => {
  //     // if an error occurs, display the message and then fail the test
  //     originalWarn(output);
  //     expect(true).toBeFalsy();
  //   });

  //   originalLog('completeDraftContractTermsDocument() result:');
  //   // begin-complete_draft_contract_terms_document

  //   const params = {
  //     dataProductId: optionalDataProductIdLink,
  //     draftId: draftIdLink,
  //     contractTermsId: contractTermsIdLink,
  //     documentId: documentIdLink,
  //   };

  //   let res;
  //   try {
  //     res = await dpxService.completeDraftContractTermsDocument(params);
  //     console.log(JSON.stringify(res.result, null, 2));
  //   } catch (err) {
  //     console.warn(err);
  //   }

  //   // end-complete_draft_contract_terms_document
  // });

  test('listDataProductDrafts request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProductDrafts() result:');
    // begin-list_data_product_drafts

    const params = {
      dataProductId: optionalDataProductIdLink,
      // assetContainerId: 'testString',
      // version: 'testString',
      limit: 5,
    };

    const allResults = [];
    try {
      const pager = new DpxV1.DataProductDraftsPager(dpxService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_product_drafts
  });

  test('getDataProductRelease request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProductRelease() result:');
    // begin-get_data_product_release

    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
    };

    let res;
    try {
      res = await dpxService.getDataProductRelease(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_release
  });

  test('updateDataProductRelease request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductRelease() result:');
    // begin-update_data_product_release

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/description',
      value: 'New Description',
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dpxService.updateDataProductRelease(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_release
  });

  test('getReleaseContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReleaseContractTermsDocument() result:');
    // begin-get_release_contract_terms_document

    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    let res;
    try {
      res = await dpxService.getReleaseContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_release_contract_terms_document
  });

  test('listDataProductReleases request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProductReleases() result:');
    // begin-list_data_product_releases

    const params = {
      dataProductId: optionalDataProductIdLink,
      // assetContainerId: 'testString',
      state: ['available'],
      // version: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new DpxV1.DataProductReleasesPager(dpxService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_product_releases
  });

  test('retireDataProductRelease request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('retireDataProductRelease() result:');
    // begin-retire_data_product_release

    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
    };

    let res;
    try {
      res = await dpxService.retireDataProductRelease(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-retire_data_product_release
  });
});
