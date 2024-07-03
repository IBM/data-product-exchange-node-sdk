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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const DphV1 = require('../../dist/dph/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'dph_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('DphV1_integration', () => {
  jest.setTimeout(timeout);

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

  test('Initialize service', async () => {
    dphService = DphV1.newInstance();

    expect(dphService).not.toBeNull();
    const config = readExternalSources(DphV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    dphService.enableRetries();
  });

  test('initialize()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: 'b6ce8fdf-e91a-49e9-857b-f41ef2a9596f',
      type: 'catalog',
    };

    const params = {
      container: containerReferenceModel,
      include: [
        'delivery_methods',
        'domains_multi_industry',
        'data_product_samples',
        'workflows',
        'project',
      ],
    };

    const res = await dphService.initialize(params);
    // console.log(`res : ${res}`);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
    createDraftByContainerIdLink = res.result.container.id;
    createDataProductByCatalogIdLink = res.result.container.id;
    getStatusByCatalogIdLink = res.result.container.id;
  });

  test('createDataProduct()', async () => {
    // Request models needed by this operation.

    // ContainerIdentity
    const containerIdentityModel = {
      id: createDataProductByCatalogIdLink,
    };

    // AssetPrototype
    const assetPrototypeModel = {
      container: containerIdentityModel,
    };

    // DataProductVersionPrototype
    const dataProductVersionPrototypeModel = {
      version: '2.0.0',
      name: 'My New Data Product from NodeIntegration',
      description: 'This is a description of My Data Product.',
      types: ['data'],
      asset: assetPrototypeModel,
    };

    const params = {
      drafts: [dataProductVersionPrototypeModel],
    };

    const res = await dphService.createDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    createNewDraftByDataProductIdLink = res.result.id;
    getContractDocumentByDataProductIdLink = res.result.id;
    retireAReleasesOfDataProductByDataProductIdLink = res.result.id;
    getDataProductByDataProductIdLink = res.result.id;
    updateDraftOfDataProductByDataProductIdLink = res.result.id;
    updateContractDocumentByDataProductIdLink = res.result.id;
    deleteDraftOfDataProductByDataProductIdLink = res.result.id;
    getAReleaseOfDataProductByDataProductIdLink = res.result.id;
    completeDraftContractTermsByDataProductIdLink = res.result.id;
    deleteContractDocumentByDataProductIdLink = res.result.id;
    getListOfDataProductDraftsByDataProductIdLink = res.result.id;
    getADraftOfDataProductByDataProductIdLink = res.result.id;
    getReleaseContractDocumentByDataProductIdLink = res.result.id;
    publishADraftOfDataProductByDataProductIdLink = res.result.id;
    getListOfReleasesOfDataProductByDataProductIdLink = res.result.id;
    updateReleaseOfDataProductByDataProductIdLink = res.result.id;
    uploadContractTermsDocByDataProductIdLink = res.result.id;
  });

  test('getDataProduct()', async () => {
    const params = {
      dataProductId: getDataProductByDataProductIdLink,
    };

    const res = await dphService.getDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProducts()', async () => {
    const params = {
      limit: 200,
    };

    const res = await dphService.listDataProducts(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProducts() via DataProductsPager', async () => {
    const params = {
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DphV1.DataProductsPager(dphService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DphV1.DataProductsPager(dphService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createDataProductDraft()', async () => {
    // Request models needed by this operation.

    // ContainerIdentity
    const containerIdentityModel = {
      id: createDataProductByCatalogIdLink,
    };

    // AssetPrototype
    const assetPrototypeModel = {
      container: containerIdentityModel,
    };

    // ContainerReference
    const containerReferenceModel = {
      id: createDataProductByCatalogIdLink,
      type: 'catalog',
    };

    // Domain
    const domainModel = {
      id: 'bfd63b0f-7d67-4aeb-a0d3-0e33e98194a6',
      name: 'Audit',
      container: containerReferenceModel,
    };

    // AssetPartReference
    const assetPartReferenceModel = {
      id: '46eb6b10-e193-4e7a-8567-dfec02941130',
      container: containerReferenceModel,
      type: 'data_asset',
    };

    // DeliveryMethod
    const deliveryMethodModel = {
      id: 'b026d5d5-c31f-45f2-8c11-b9476b72afc2',
      container: containerReferenceModel,
    };

    // DataProductPart
    const dataProductPartModel = {
      asset: assetPartReferenceModel,
      delivery_methods: [deliveryMethodModel],
    };

    const params = {
      dataProductId: createNewDraftByDataProductIdLink,
      asset: assetPrototypeModel,
      version: '2.1.0',
      name: 'New DPD creation from NodeIntegrationTest',
      description: 'Create new data product draft',
      domain: domainModel,
      partsOut: [dataProductPartModel],
    };

    const res = await dphService.createDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getADraftContractDocumentByDraftIdLink = res.result.id;
    updateADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    createAContractTermsDocByContractTermsIdLink = res.result.contract_terms[0].id;
    updateContractDocumentByDraftIdLink = res.result.id;
    getAReleaseContractTermsByContractTermsIdLink = res.result.contract_terms[0].id;
    completeADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    getDraftByDraftIdLink = res.result.id;
    publishADraftByDraftIdLink = res.result.id;
    updateADraftByDraftIdLink = res.result.id;
    createAContractTermsDocByDraftIdLink = res.result.id;
    deleteAContractDocumentByDraftIdLink = res.result.id;
    deleteADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    deleteADraftByDraftIdLink = res.result.id;
    completeADraftByDraftIdLink = res.result.id;
    getADraftByContractTermsIdLink = res.result.contract_terms[0].id;
  });

  test('getDataProductDraft()', async () => {
    const params = {
      dataProductId: getADraftOfDataProductByDataProductIdLink,
      draftId: getDraftByDraftIdLink,
    };

    const res = await dphService.getDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDataProductDraft()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/description',
      value: 'New description for my data product',
    };

    const params = {
      dataProductId: updateDraftOfDataProductByDataProductIdLink,
      draftId: updateADraftByDraftIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dphService.updateDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createDraftContractTermsDocument()', async () => {
    // Request models needed by this operation.

    const params = {
      dataProductId: uploadContractTermsDocByDataProductIdLink,
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: '96d844ba-07ba-454c-ac43-3d9a4d323222',
      url: 'https://data.un.org/Host.aspx?Content=UNdataUse',
    };

    const res = await dphService.createDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getReleaseContractDocumentByDocumentIdLink = res.result.id;
    deleteContractTermsDocumentByDocumentIdLink = res.result.id;
    getContractTermsDocumentByIdDocumentIdLink = res.result.id;
    updateContractTermsDocumentByDocumentIdLink = res.result.id;
    completeContractTermsDocumentByDocumentIdLink = res.result.id;
  });

  test('getDraftContractTermsDocument()', async () => {
    const params = {
      dataProductId: getContractDocumentByDataProductIdLink,
      draftId: getADraftContractDocumentByDraftIdLink,
      contractTermsId: getADraftByContractTermsIdLink,
      documentId: getContractTermsDocumentByIdDocumentIdLink,
    };

    const res = await dphService.getDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDraftContractTermsDocument()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/type',
      value: 'terms_and_conditions',
    };

    const params = {
      dataProductId: updateContractDocumentByDataProductIdLink,
      draftId: updateContractDocumentByDraftIdLink,
      contractTermsId: updateADraftByContractTermsIdLink,
      documentId: updateContractTermsDocumentByDocumentIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dphService.updateDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('publishDataProductDraft()', async () => {
    const params = {
      dataProductId: publishADraftOfDataProductByDataProductIdLink,
      draftId: publishADraftByDraftIdLink,
    };

    const res = await dphService.publishDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    updateAReleaseByReleaseIdLink = res.result.id;
    getAReleaseContractTermsByReleaseIdLink = res.result.id;
    retireAReleaseContractTermsByReleaseIdLink = res.result.id;
    getAReleaseByReleaseIdLink = res.result.id;
  });

  test('listDataProductDrafts()', async () => {
    const params = {
      dataProductId: getListOfDataProductDraftsByDataProductIdLink,
      limit: 200,
    };

    const res = await dphService.listDataProductDrafts(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductDrafts() via DataProductDraftsPager', async () => {
    const params = {
      dataProductId: getListOfDataProductDraftsByDataProductIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DphV1.DataProductDraftsPager(dphService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DphV1.DataProductDraftsPager(dphService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getInitializeStatus()', async () => {
    const params = {
      containerId: getStatusByCatalogIdLink,
    };

    const res = await dphService.getInitializeStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getServiceIdCredentials()', async () => {
    const res = await dphService.getServiceIdCredentials();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('manageApiKeys()', async () => {
    const res = await dphService.manageApiKeys();
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('getDataProductRelease()', async () => {
    const params = {
      dataProductId: getAReleaseOfDataProductByDataProductIdLink,
      releaseId: getAReleaseByReleaseIdLink,
    };

    const res = await dphService.getDataProductRelease(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDataProductRelease()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/description',
      value: 'New description for my data product',
    };

    const params = {
      dataProductId: updateReleaseOfDataProductByDataProductIdLink,
      releaseId: getAReleaseByReleaseIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dphService.updateDataProductRelease(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReleaseContractTermsDocument()', async () => {
    const params = {
      dataProductId: getReleaseContractDocumentByDataProductIdLink,
      releaseId: getAReleaseContractTermsByReleaseIdLink,
      contractTermsId: getAReleaseContractTermsByContractTermsIdLink,
      documentId: getReleaseContractDocumentByDocumentIdLink,
    };

    const res = await dphService.getReleaseContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductReleases()', async () => {
    const params = {
      dataProductId: getListOfReleasesOfDataProductByDataProductIdLink,
      limit: 200,
    };

    const res = await dphService.listDataProductReleases(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductReleases() via DataProductReleasesPager', async () => {
    const params = {
      dataProductId: getListOfReleasesOfDataProductByDataProductIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DphV1.DataProductReleasesPager(dphService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DphV1.DataProductReleasesPager(dphService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('retireDataProductRelease()', async () => {
    const params = {
      dataProductId: retireAReleasesOfDataProductByDataProductIdLink,
      releaseId: retireAReleaseContractTermsByReleaseIdLink,
    };

    const res = await dphService.retireDataProductRelease(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createDataProductDraftForDeleteOp()', async () => {
    // Request models needed by this operation.

    // ContainerIdentity
    const containerIdentityModel = {
      id: createDataProductByCatalogIdLink,
    };

    // AssetPrototype
    const assetPrototypeModel = {
      container: containerIdentityModel,
    };

    // ContainerReference
    const containerReferenceModel = {
      id: createDataProductByCatalogIdLink,
      type: 'catalog',
    };

    // Domain
    const domainModel = {
      id: 'bfd63b0f-7d67-4aeb-a0d3-0e33e98194a6',
      name: 'Audit',
      container: containerReferenceModel,
    };

    // AssetPartReference
    const assetPartReferenceModel = {
      id: '46eb6b10-e193-4e7a-8567-dfec02941130',
      container: containerReferenceModel,
      type: 'data_asset',
    };

    // DeliveryMethod
    const deliveryMethodModel = {
      id: 'b026d5d5-c31f-45f2-8c11-b9476b72afc2',
      container: containerReferenceModel,
    };

    // DataProductPart
    const dataProductPartModel = {
      asset: assetPartReferenceModel,
      delivery_methods: [deliveryMethodModel],
    };

    const params = {
      dataProductId: createNewDraftByDataProductIdLink,
      asset: assetPrototypeModel,
      version: '2.2.0',
      name: 'New DPD creation from NodeIntegrationTest',
      description: 'Create new data product draft',
      domain: domainModel,
      partsOut: [dataProductPartModel],
    };

    const res = await dphService.createDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getADraftContractDocumentByDraftIdLink = res.result.id;
    updateADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    createAContractTermsDocByContractTermsIdLink = res.result.contract_terms[0].id;
    updateContractDocumentByDraftIdLink = res.result.id;
    getAReleaseContractTermsByContractTermsIdLink = res.result.contract_terms[0].id;
    completeADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    getDraftByDraftIdLink = res.result.id;
    publishADraftByDraftIdLink = res.result.id;
    updateADraftByDraftIdLink = res.result.id;
    createAContractTermsDocByDraftIdLink = res.result.id;
    deleteAContractDocumentByDraftIdLink = res.result.id;
    deleteADraftByContractTermsIdLink = res.result.contract_terms[0].id;
    deleteADraftByDraftIdLink = res.result.id;
    completeADraftByDraftIdLink = res.result.id;
    getADraftByContractTermsIdLink = res.result.contract_terms[0].id;
  });

  test('createDraftContractTermsDocumentForDeleteOp()', async () => {
    // Request models needed by this operation.

    const params = {
      dataProductId: uploadContractTermsDocByDataProductIdLink,
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: '96d844ba-07ba-454c-ac43-3d9a4d323222',
      url: 'https://data.un.org/Host.aspx?Content=UNdataUse',
    };

    const res = await dphService.createDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getReleaseContractDocumentByDocumentIdLink = res.result.id;
    deleteContractTermsDocumentByDocumentIdLink = res.result.id;
    getContractTermsDocumentByIdDocumentIdLink = res.result.id;
    updateContractTermsDocumentByDocumentIdLink = res.result.id;
    completeContractTermsDocumentByDocumentIdLink = res.result.id;
  });

  test('deleteDraftContractTermsDocument()', async () => {
    const params = {
      dataProductId: deleteContractDocumentByDataProductIdLink,
      draftId: deleteAContractDocumentByDraftIdLink,
      contractTermsId: deleteADraftByContractTermsIdLink,
      documentId: deleteContractTermsDocumentByDocumentIdLink,
    };

    const res = await dphService.deleteDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteDataProductDraft()', async () => {
    const params = {
      dataProductId: deleteDraftOfDataProductByDataProductIdLink,
      draftId: deleteADraftByDraftIdLink,
    };

    const res = await dphService.deleteDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
