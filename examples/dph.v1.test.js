/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2025.
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

const DphV1 = require('../dist/dph/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the DPH service.
//
// The following configuration properties are assumed to be defined:
// DPH_URL=<service base url>
// DPH_AUTH_TYPE=iam
// DPH_APIKEY=<IAM apikey>
// DPH_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'dph_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('DphV1', () => {
  // Service instance
  let dphService;

  // Variables to hold link values
  let completeADraftByContractTermsIdLink;
  let completeADraftByDraftIdLink;
  let completeContractTermsDocumentByDocumentIdLink;
  let completeDraftContractTermsByDataProductIdLink;
  let createAContractTermsDocByContractTermsIdLink;
  let createAContractTermsDocByDraftIdLink;
  let createDataProductByCatalogIdLink;
  let createDraftByContainerIdLink;
  let createNewDraftByDataProductIdLink;
  let deleteAContractDocumentByDraftIdLink;
  let deleteADraftByContractTermsIdLink;
  let deleteADraftByDraftIdLink;
  let deleteContractDocumentByDataProductIdLink;
  let deleteContractTermsDocumentByDocumentIdLink;
  let deleteDraftOfDataProductByDataProductIdLink;
  let getADraftByContractTermsIdLink;
  let getADraftContractDocumentByDraftIdLink;
  let getADraftOfDataProductByDataProductIdLink;
  let getAReleaseByReleaseIdLink;
  let getAReleaseContractTermsByContractTermsIdLink;
  let getAReleaseContractTermsByReleaseIdLink;
  let getAReleaseOfDataProductByDataProductIdLink;
  let getContractDocumentByDataProductIdLink;
  let getContractTermsDocumentByIdDocumentIdLink;
  let getDataProductByDataProductIdLink;
  let getDraftByDraftIdLink;
  let getListOfDataProductDraftsByDataProductIdLink;
  let getListOfReleasesOfDataProductByDataProductIdLink;
  let getReleaseContractDocumentByDataProductIdLink;
  let getReleaseContractDocumentByDocumentIdLink;
  let getStatusByCatalogIdLink;
  let publishADraftByDraftIdLink;
  let publishADraftOfDataProductByDataProductIdLink;
  let retireAReleaseContractTermsByReleaseIdLink;
  let retireAReleasesOfDataProductByDataProductIdLink;
  let updateADraftByContractTermsIdLink;
  let updateADraftByDraftIdLink;
  let updateAReleaseByReleaseIdLink;
  let updateContractDocumentByDataProductIdLink;
  let updateContractDocumentByDraftIdLink;
  let updateContractTermsDocumentByDocumentIdLink;
  let updateDraftOfDataProductByDataProductIdLink;
  let updateReleaseOfDataProductByDataProductIdLink;
  let uploadContractTermsDocByDataProductIdLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(DphV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    dphService = DphV1.newInstance();

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
      include: [
        'delivery_methods',
        'domains_multi_industry',
        'data_product_samples',
        'workflows',
        'project',
        'catalog_configurations',
      ],
    };

    let res;
    try {
      res = await dphService.initialize(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-initialize
    const responseBody = res.result;
    createDraftByContainerIdLink = responseBody.container.id;
    createDataProductByCatalogIdLink = responseBody.container.id;
    getStatusByCatalogIdLink = responseBody.container.id;
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

    // ContainerIdentity
    const containerIdentityModel = {
      id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
    };

    // AssetPrototype
    const assetPrototypeModel = {
      container: containerIdentityModel,
    };

    // DataProductDraftPrototype
    const dataProductDraftPrototypeModel = {
      name: 'My New Data Product',
      asset: assetPrototypeModel,
    };

    const params = {
      drafts: [dataProductDraftPrototypeModel],
    };

    let res;
    try {
      res = await dphService.createDataProduct(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product
    const responseBody = res.result;
    createNewDraftByDataProductIdLink = responseBody.id;
    getContractDocumentByDataProductIdLink = responseBody.id;
    retireAReleasesOfDataProductByDataProductIdLink = responseBody.id;
    getDataProductByDataProductIdLink = responseBody.id;
    updateDraftOfDataProductByDataProductIdLink = responseBody.id;
    updateContractDocumentByDataProductIdLink = responseBody.id;
    deleteDraftOfDataProductByDataProductIdLink = responseBody.id;
    getAReleaseOfDataProductByDataProductIdLink = responseBody.id;
    completeDraftContractTermsByDataProductIdLink = responseBody.id;
    deleteContractDocumentByDataProductIdLink = responseBody.id;
    getListOfDataProductDraftsByDataProductIdLink = responseBody.id;
    getADraftOfDataProductByDataProductIdLink = responseBody.id;
    getReleaseContractDocumentByDataProductIdLink = responseBody.id;
    publishADraftOfDataProductByDataProductIdLink = responseBody.id;
    getListOfReleasesOfDataProductByDataProductIdLink = responseBody.id;
    updateReleaseOfDataProductByDataProductIdLink = responseBody.id;
    uploadContractTermsDocByDataProductIdLink = responseBody.id;
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

    // ContainerIdentity
    const containerIdentityModel = {
      id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
    };

    // AssetPrototype
    const assetPrototypeModel = {
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

    const params = {
      dataProductId: createNewDraftByDataProductIdLink,
      asset: assetPrototypeModel,
      version: '1.2.0',
      dataProduct: dataProductIdentityModel,
    };

    let res;
    try {
      res = await dphService.createDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_draft
    const responseBody = res.result;
    getADraftContractDocumentByDraftIdLink = responseBody.id;
    updateADraftByContractTermsIdLink = responseBody.contract_terms[0].id;
    createAContractTermsDocByContractTermsIdLink = responseBody.contract_terms[0].id;
    updateContractDocumentByDraftIdLink = responseBody.id;
    getAReleaseContractTermsByContractTermsIdLink = responseBody.contract_terms[0].id;
    completeADraftByContractTermsIdLink = responseBody.contract_terms[0].id;
    getDraftByDraftIdLink = responseBody.id;
    publishADraftByDraftIdLink = responseBody.id;
    updateADraftByDraftIdLink = responseBody.id;
    createAContractTermsDocByDraftIdLink = responseBody.id;
    deleteAContractDocumentByDraftIdLink = responseBody.id;
    deleteADraftByContractTermsIdLink = responseBody.contract_terms[0].id;
    deleteADraftByDraftIdLink = responseBody.id;
    completeADraftByDraftIdLink = responseBody.id;
    getADraftByContractTermsIdLink = responseBody.contract_terms[0].id;
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
      dataProductId: uploadContractTermsDocByDataProductIdLink,
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
    };

    let res;
    try {
      res = await dphService.createDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_draft_contract_terms_document
    const responseBody = res.result;
    getReleaseContractDocumentByDocumentIdLink = responseBody.id;
    deleteContractTermsDocumentByDocumentIdLink = responseBody.id;
    getContractTermsDocumentByIdDocumentIdLink = responseBody.id;
    updateContractTermsDocumentByDocumentIdLink = responseBody.id;
    completeContractTermsDocumentByDocumentIdLink = responseBody.id;
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
      dataProductId: publishADraftOfDataProductByDataProductIdLink,
      draftId: publishADraftByDraftIdLink,
    };

    let res;
    try {
      res = await dphService.publishDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-publish_data_product_draft
    const responseBody = res.result;
    updateAReleaseByReleaseIdLink = responseBody.id;
    getAReleaseContractTermsByReleaseIdLink = responseBody.id;
    retireAReleaseContractTermsByReleaseIdLink = responseBody.id;
    getAReleaseByReleaseIdLink = responseBody.id;
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
      res = await dphService.getInitializeStatus({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_initialize_status
  });

  test('getServiceIdCredentials request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getServiceIdCredentials() result:');
    // begin-get_service_id_credentials

    let res;
    try {
      res = await dphService.getServiceIdCredentials({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service_id_credentials
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
      await dphService.manageApiKeys({});
    } catch (err) {
      console.warn(err);
    }

    // end-manage_api_keys
  });

  test('createDataAssetVisualization request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataAssetVisualization() result:');
    // begin-create_data_asset_visualization

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: '2be8f727-c5d2-4cb0-9216-f9888f428048',
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: 'caeee3f3-756e-47d5-846d-da4600809e22',
      container: containerReferenceModel,
    };

    // DataAssetRelationship
    const dataAssetRelationshipModel = {
      asset: assetReferenceModel,
      related_asset: assetReferenceModel,
    };

    const params = {
      assets: [dataAssetRelationshipModel],
    };

    let res;
    try {
      res = await dphService.createDataAssetVisualization(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_asset_visualization
  });

  test('reinitiateDataAssetVisualization request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('reinitiateDataAssetVisualization() result:');
    // begin-reinitiate_data_asset_visualization

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: '2be8f727-c5d2-4cb0-9216-f9888f428048',
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: 'caeee3f3-756e-47d5-846d-da4600809e22',
      container: containerReferenceModel,
    };

    // DataAssetRelationship
    const dataAssetRelationshipModel = {
      asset: assetReferenceModel,
      related_asset: assetReferenceModel,
    };

    const params = {
      assets: [dataAssetRelationshipModel],
    };

    let res;
    try {
      res = await dphService.reinitiateDataAssetVisualization(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-reinitiate_data_asset_visualization
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
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new DphV1.DataProductsPager(dphService, params);
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
  });

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
      dataProductId: getDataProductByDataProductIdLink,
    };

    let res;
    try {
      res = await dphService.getDataProduct(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product
  });

  test('completeDraftContractTermsDocument request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('completeDraftContractTermsDocument() result:');
    // begin-complete_draft_contract_terms_document

    const params = {
      dataProductId: completeDraftContractTermsByDataProductIdLink,
      draftId: completeADraftByDraftIdLink,
      contractTermsId: completeADraftByContractTermsIdLink,
      documentId: completeContractTermsDocumentByDocumentIdLink,
    };

    let res;
    try {
      res = await dphService.completeDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-complete_draft_contract_terms_document
  });

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
      dataProductId: getListOfDataProductDraftsByDataProductIdLink,
      assetContainerId: 'testString',
      version: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new DphV1.DataProductDraftsPager(dphService, params);
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
      dataProductId: getADraftOfDataProductByDataProductIdLink,
      draftId: getDraftByDraftIdLink,
    };

    let res;
    try {
      res = await dphService.getDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_draft
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

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
    };

    const params = {
      dataProductId: updateDraftOfDataProductByDataProductIdLink,
      draftId: updateADraftByDraftIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDataProductDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_draft
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
      dataProductId: getContractDocumentByDataProductIdLink,
      draftId: getADraftContractDocumentByDraftIdLink,
      contractTermsId: getADraftByContractTermsIdLink,
      documentId: getContractTermsDocumentByIdDocumentIdLink,
    };

    let res;
    try {
      res = await dphService.getDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_draft_contract_terms_document
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
      op: 'add',
      path: 'testString',
    };

    const params = {
      dataProductId: updateContractDocumentByDataProductIdLink,
      draftId: updateContractDocumentByDraftIdLink,
      contractTermsId: updateADraftByContractTermsIdLink,
      documentId: updateContractTermsDocumentByDocumentIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDraftContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_draft_contract_terms_document
  });

  test('getDataProductDraftContractTerms request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProductDraftContractTerms() result:');
    // begin-get_data_product_draft_contract_terms

    const params = {
      dataProductId: 'testString',
      draftId: 'testString',
      contractTermsId: 'testString',
    };

    let res;
    try {
      res = await dphService.getDataProductDraftContractTerms(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_draft_contract_terms
  });

  test('replaceDataProductDraftContractTerms request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceDataProductDraftContractTerms() result:');
    // begin-replace_data_product_draft_contract_terms

    // Request models needed by this operation.

    // ContractTermsDocument
    const contractTermsDocumentModel = {
      url: 'https://ibm.com/document',
      type: 'terms_and_conditions',
      name: 'Terms and Conditions',
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
    };

    // Domain
    const domainModel = {
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      name: 'domain_name',
    };

    // Overview
    const overviewModel = {
      api_version: 'v3.0.1',
      kind: 'DataContract',
      name: 'Sample Data Contract',
      version: 'v0.0',
      domain: domainModel,
      more_info: 'List of links to sources that provide more details on the data contract.',
    };

    // ContractTermsMoreInfo
    const contractTermsMoreInfoModel = {
      type: 'privacy-statement',
      url: 'https://www.moreinfo.example.coms',
    };

    // Description
    const descriptionModel = {
      purpose: 'Intended purpose for the provided data.',
      limitations: 'Technical, compliance, and legal limitations for data use.',
      usage: 'Recommended usage of the data.',
      more_info: [contractTermsMoreInfoModel],
      custom_properties: 'Custom properties that are not part of the standard.',
    };

    // ContractTemplateOrganization
    const contractTemplateOrganizationModel = {
      user_id: 'IBMid-691000IN4G',
      role: 'owner',
    };

    // Roles
    const rolesModel = {
      role: 'IAM Role',
    };

    // Pricing
    const pricingModel = {
      amount: 'Amount',
      currency: 'Currency',
      unit: 'Unit',
    };

    // ContractTemplateSLAProperty
    const contractTemplateSlaPropertyModel = {
      property: 'slaproperty',
      value: 'slavalue',
    };

    // ContractTemplateSLA
    const contractTemplateSlaModel = {
      default_element: 'sladefaultelement',
      properties: [contractTemplateSlaPropertyModel],
    };

    // ContractTemplateSupportAndCommunication
    const contractTemplateSupportAndCommunicationModel = {
      channel: 'channel',
      url: 'https://www.example.coms',
    };

    // ContractTemplateCustomProperty
    const contractTemplateCustomPropertyModel = {
      key: 'The name of the key.',
      value: 'The value of the key.',
    };

    // ContractAsset
    const contractAssetModel = {
      id: '684d6aa0-9f93-4564-8a20-e354bc469857',
      name: 'PAYMENT_TRANSACTIONS1',
    };

    // ContractServer
    const contractServerModel = {
      server: 'snowflake-server-01',
      asset: contractAssetModel,
      connection_id: '8d7701be-709a-49c0-ae4e-a7daeaae6def',
      type: 'snowflake',
      description: 'Snowflake analytics server',
      environment: 'dev',
      account: 'acc-456',
      catalog: 'analytics_cat',
      database: 'analytics_db',
      dataset: 'customer_data',
      delimiter: ',',
      endpoint_url: 'https://xy12345.snowflakecomputing.com',
      format: 'parquet',
      host: 'xy12345.snowflakecomputing.com',
      location: 'Mumbai',
      path: '/analytics/data',
      port: '443',
      project: 'projectY',
      region: 'ap-south-1',
      region_name: 'Asia South 1',
      schema: 'PAYMENT_TRANSACTIONS1',
      service_name: 'snowflake',
      staging_dir: '/snowflake/staging',
      stream: 'stream_analytics',
      warehouse: 'wh_xlarge',
      custom_properties: [contractTemplateCustomPropertyModel],
    };

    // ContractSchemaPropertyType
    const contractSchemaPropertyTypeModel = {
      type: 'varchar',
      length: '1024',
      scale: '0',
      nullable: 'true',
      signed: 'false',
    };

    // ContractSchemaProperty
    const contractSchemaPropertyModel = {
      name: 'product_brand_code',
      type: contractSchemaPropertyTypeModel,
    };

    // ContractSchema
    const contractSchemaModel = {
      asset_id: '09ca6b40-7c89-412a-8951-ad820da709d1',
      connection_id: '6cc57d4d-2229-438f-91a0-2c455556422b',
      name: '000000_0-2025-06-20-20-28-52.csv',
      connection_path: '/dpx-test-bucket/000000_0-2025-06-20-20-28-52.csv',
      physical_type: 'text/csv',
      properties: [contractSchemaPropertyModel],
    };

    const params = {
      dataProductId: 'testString',
      draftId: 'testString',
      contractTermsId: 'testString',
      documents: [contractTermsDocumentModel],
      overview: overviewModel,
      description: descriptionModel,
      organization: [contractTemplateOrganizationModel],
      roles: [rolesModel],
      price: pricingModel,
      sla: [contractTemplateSlaModel],
      supportAndCommunication: [contractTemplateSupportAndCommunicationModel],
      customProperties: [contractTemplateCustomPropertyModel],
      servers: [contractServerModel],
      schema: [contractSchemaModel],
    };

    let res;
    try {
      res = await dphService.replaceDataProductDraftContractTerms(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_data_product_draft_contract_terms
  });

  test('updateDataProductDraftContractTerms request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductDraftContractTerms() result:');
    // begin-update_data_product_draft_contract_terms

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
    };

    const params = {
      dataProductId: 'testString',
      draftId: 'testString',
      contractTermsId: 'testString',
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDataProductDraftContractTerms(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_draft_contract_terms
  });

  test('getContractTermsInSpecifiedFormat request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getContractTermsInSpecifiedFormat() result:');
    // begin-get_contract_terms_in_specified_format

    const params = {
      dataProductId: 'testString',
      draftId: 'testString',
      contractTermsId: 'testString',
      format: 'testString',
      formatVersion: 'testString',
    };

    let res;
    try {
      res = await dphService.getContractTermsInSpecifiedFormat(params);
      // response is binary
      // fs.writeFileSync('result.out', res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_contract_terms_in_specified_format
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
      dataProductId: getAReleaseOfDataProductByDataProductIdLink,
      releaseId: getAReleaseByReleaseIdLink,
    };

    let res;
    try {
      res = await dphService.getDataProductRelease(params);
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
      op: 'add',
      path: 'testString',
    };

    const params = {
      dataProductId: updateReleaseOfDataProductByDataProductIdLink,
      releaseId: 'testString',
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDataProductRelease(params);
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
      dataProductId: getReleaseContractDocumentByDataProductIdLink,
      releaseId: getAReleaseContractTermsByReleaseIdLink,
      contractTermsId: getAReleaseContractTermsByContractTermsIdLink,
      documentId: getReleaseContractDocumentByDocumentIdLink,
    };

    let res;
    try {
      res = await dphService.getReleaseContractTermsDocument(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_release_contract_terms_document
  });

  test('getPublishedDataProductDraftContractTerms request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPublishedDataProductDraftContractTerms() result:');
    // begin-get_published_data_product_draft_contract_terms

    const params = {
      dataProductId: 'testString',
      releaseId: 'testString',
      contractTermsId: 'testString',
    };

    let res;
    try {
      res = await dphService.getPublishedDataProductDraftContractTerms(params);
      // response is binary
      // fs.writeFileSync('result.out', res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_published_data_product_draft_contract_terms
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
      dataProductId: getListOfReleasesOfDataProductByDataProductIdLink,
      assetContainerId: 'testString',
      state: ['available'],
      version: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new DphV1.DataProductReleasesPager(dphService, params);
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
      dataProductId: retireAReleasesOfDataProductByDataProductIdLink,
      releaseId: retireAReleaseContractTermsByReleaseIdLink,
    };

    let res;
    try {
      res = await dphService.retireDataProductRelease(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-retire_data_product_release
  });

  test('createRevokeAccessProcess request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createRevokeAccessProcess() result:');
    // begin-create_revoke_access_process

    const params = {
      dataProductId: 'testString',
      releaseId: 'testString',
      body: Buffer.from('This is a mock file.'),
    };

    let res;
    try {
      res = await dphService.createRevokeAccessProcess(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_revoke_access_process
  });

  test('listDataProductContractTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProductContractTemplate() result:');
    // begin-list_data_product_contract_template

    let res;
    try {
      res = await dphService.listDataProductContractTemplate({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_product_contract_template
  });

  test('createContractTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createContractTemplate() result:');
    // begin-create_contract_template

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: '531f74a-01c8-4e91-8e29-b018db683c86',
      type: 'catalog',
    };

    // Domain
    const domainModel = {
      id: '0094ebe9-abc3-473b-80ea-c777ede095ea',
      name: 'Test Domain New',
    };

    // Overview
    const overviewModel = {
      name: 'Sample Data Contract',
      version: '0.0.0',
      domain: domainModel,
      more_info: 'List of links to sources that provide more details on the data contract.',
    };

    // ContractTermsMoreInfo
    const contractTermsMoreInfoModel = {
      type: 'privacy-statement',
      url: 'https://www.moreinfo.example.coms',
    };

    // Description
    const descriptionModel = {
      purpose: 'Intended purpose for the provided data.',
      limitations: 'Technical, compliance, and legal limitations for data use.',
      usage: 'Recommended usage of the data.',
      more_info: [contractTermsMoreInfoModel],
      custom_properties: 'Custom properties that are not part of the standard.',
    };

    // ContractTemplateOrganization
    const contractTemplateOrganizationModel = {
      user_id: 'IBMid-691000IN4G',
      role: 'owner',
    };

    // Roles
    const rolesModel = {
      role: 'IAM Role',
    };

    // Pricing
    const pricingModel = {
      amount: '100.00',
      currency: 'USD',
      unit: 'megabyte',
    };

    // ContractTemplateSLAProperty
    const contractTemplateSlaPropertyModel = {
      property: 'slaproperty',
      value: 'slavalue',
    };

    // ContractTemplateSLA
    const contractTemplateSlaModel = {
      default_element: 'sladefaultelement',
      properties: [contractTemplateSlaPropertyModel],
    };

    // ContractTemplateSupportAndCommunication
    const contractTemplateSupportAndCommunicationModel = {
      channel: 'channel',
      url: 'https://www.example.coms',
    };

    // ContractTemplateCustomProperty
    const contractTemplateCustomPropertyModel = {
      key: 'propertykey',
      value: 'propertyvalue',
    };

    // ContractTerms
    const contractTermsModel = {
      overview: overviewModel,
      description: descriptionModel,
      organization: [contractTemplateOrganizationModel],
      roles: [rolesModel],
      price: pricingModel,
      sla: [contractTemplateSlaModel],
      support_and_communication: [contractTemplateSupportAndCommunicationModel],
      custom_properties: [contractTemplateCustomPropertyModel],
    };

    const params = {
      container: containerReferenceModel,
      name: 'Sample Data Contract Template',
      contractTerms: contractTermsModel,
    };

    let res;
    try {
      res = await dphService.createContractTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_contract_template
  });

  test('getContractTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getContractTemplate() result:');
    // begin-get_contract_template

    const params = {
      contractTemplateId: 'testString',
      containerId: 'testString',
    };

    let res;
    try {
      res = await dphService.getContractTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_contract_template
  });

  test('updateDataProductContractTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductContractTemplate() result:');
    // begin-update_data_product_contract_template

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
    };

    const params = {
      contractTemplateId: 'testString',
      containerId: 'testString',
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDataProductContractTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_contract_template
  });

  test('listDataProductDomains request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProductDomains() result:');
    // begin-list_data_product_domains

    let res;
    try {
      res = await dphService.listDataProductDomains({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_product_domains
  });

  test('createDataProductDomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProductDomain() result:');
    // begin-create_data_product_domain

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: 'ed580171-a6e4-4b93-973f-ae2f2f62991b',
      type: 'catalog',
    };

    // InitializeSubDomain
    const initializeSubDomainModel = {
      name: 'Sub domain 1',
      description: 'New sub domain 1',
    };

    const params = {
      container: containerReferenceModel,
      name: 'Test domain',
      description: 'The sample description for new domain',
      subDomains: [initializeSubDomainModel],
    };

    let res;
    try {
      res = await dphService.createDataProductDomain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_domain
  });

  test('createDataProductSubdomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProductSubdomain() result:');
    // begin-create_data_product_subdomain

    const params = {
      domainId: 'testString',
      containerId: 'testString',
      name: 'Sub domain 1',
      description: 'New sub domain 1',
    };

    let res;
    try {
      res = await dphService.createDataProductSubdomain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_subdomain
  });

  test('getDomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDomain() result:');
    // begin-get_domain

    const params = {
      domainId: 'testString',
    };

    let res;
    try {
      res = await dphService.getDomain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_domain
  });

  test('updateDataProductDomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductDomain() result:');
    // begin-update_data_product_domain

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
    };

    const params = {
      domainId: 'testString',
      containerId: 'testString',
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dphService.updateDataProductDomain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_domain
  });

  test('getDataProductByDomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProductByDomain() result:');
    // begin-get_data_product_by_domain

    const params = {
      domainId: 'testString',
      containerId: 'testString',
    };

    let res;
    try {
      res = await dphService.getDataProductByDomain(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_by_domain
  });

  test('createS3Bucket request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createS3Bucket() result:');
    // begin-create_s3_bucket

    const params = {
      isShared: true,
    };

    let res;
    try {
      res = await dphService.createS3Bucket(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_s3_bucket
  });

  test('getS3BucketValidation request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getS3BucketValidation() result:');
    // begin-get_s3_bucket_validation

    const params = {
      bucketName: 'testString',
    };

    let res;
    try {
      res = await dphService.getS3BucketValidation(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_s3_bucket_validation
  });

  test('getRevokeAccessProcessState request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getRevokeAccessProcessState() result:');
    // begin-get_revoke_access_process_state

    const params = {
      releaseId: 'testString',
    };

    let res;
    try {
      res = await dphService.getRevokeAccessProcessState(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_revoke_access_process_state
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
      dataProductId: deleteContractDocumentByDataProductIdLink,
      draftId: deleteAContractDocumentByDraftIdLink,
      contractTermsId: deleteADraftByContractTermsIdLink,
      documentId: deleteContractTermsDocumentByDocumentIdLink,
    };

    try {
      await dphService.deleteDraftContractTermsDocument(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_draft_contract_terms_document
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
      dataProductId: deleteDraftOfDataProductByDataProductIdLink,
      draftId: deleteADraftByDraftIdLink,
    };

    try {
      await dphService.deleteDataProductDraft(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_data_product_draft
  });

  test('deleteDataProductContractTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_data_product_contract_template

    const params = {
      contractTemplateId: 'testString',
      containerId: 'testString',
    };

    try {
      await dphService.deleteDataProductContractTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_data_product_contract_template
  });

  test('deleteDomain request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_domain

    const params = {
      domainId: 'testString',
    };

    try {
      await dphService.deleteDomain(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_domain
  });
});
