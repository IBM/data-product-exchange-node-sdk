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
      id: 'a7ca67e8-1fac-4061-ae9b-7604e15c4ab3',
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
        'catalog_configurations',
      ],
    };

    const res = await dphService.initialize(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
    createDraftByContainerIdLink = res.result.container.id;
    createDataProductByCatalogIdLink = res.result.container.id;
    getStatusByCatalogIdLink = res.result.container.id;
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

  test('createDataProduct()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: createDataProductByCatalogIdLink,
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
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
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      attachment: contractTermsDocumentAttachmentModel,
      upload_url: 'testString',
    };

    // DataProductContractTerms
    const dataProductContractTermsModel = {
      asset: assetReferenceModel,
      id: 'testString',
      documents: [contractTermsDocumentModel],
      error_msg: 'testString',
    };

    // ContainerIdentity
    const containerIdentityModel = {
      id: createDataProductByCatalogIdLink,
    };

    // AssetPrototype
    const assetPrototypeModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      container: containerIdentityModel,
    };

    // AssetPartReference
    const assetPartReferenceModel = {
      id: '16a8f683-f947-48d9-a92c-b81758b1a5f5',
      container: containerReferenceModel,
      type: 'data_asset',
    };

    // DeliveryMethod
    const deliveryMethodModel = {
      id: '8848fd43-7384-4435-aff3-6a9f113768c4',
      container: containerReferenceModel,
    };

    // Domain
    const domainModel = {
      id: `3f0688f0-69c3-441e-b49b-7c223daa1804`,
      name: `Risk Management`,
      container: containerReferenceModel,
    };

    // DataProductPart
    const dataProductPartModel = {
      asset: assetPartReferenceModel,
      delivery_methods: [deliveryMethodModel],
    };

    // DataProductVersionPrototype
    const dataProductVersionPrototypeModel = {
      version: '1.0.0',
      state: 'draft',
      name: 'My New Data Product using Node SDK',
      description: 'My Data Product generation using NODE SDK.',
      types: ['data'],
      asset: assetPrototypeModel,
      domain: domainModel,
      parts_out: [dataProductPartModel],
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
    createAContractTermsDocByContractTermsIdLink = res.result.drafts[0].contract_terms[0].id;
    getAReleaseContractTermsByContractTermsIdLink = createAContractTermsDocByContractTermsIdLink;
    createAContractTermsDocByDraftIdLink = res.result.drafts[0].id;
    getDraftByDraftIdLink = res.result.drafts[0].id;
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

  test('getDataProductDraft()', async () => {
    const params = {
      dataProductId: '-',
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
      value: 'Updated the description using Node SDK.',
    };

    const params = {
      dataProductId: '-',
      draftId: createAContractTermsDocByDraftIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dphService.updateDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createDraftContractTermsDocument()', async () => {
    const params = {
      dataProductId: uploadContractTermsDocByDataProductIdLink,
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      url: 'https://www.ibm.com/contract_document',
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
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
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
      op: 'add',
      path: '/name',
      value: 'updated Terms and Conditions',
    };

    const params = {
      dataProductId: getContractDocumentByDataProductIdLink,
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      documentId: getContractTermsDocumentByIdDocumentIdLink,
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
      draftId: getDraftByDraftIdLink,
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

  test('getDataProductRelease()', async () => {
    const params = {
      dataProductId: getAReleaseOfDataProductByDataProductIdLink,
      releaseId: getAReleaseByReleaseIdLink,
      checkCallerApproval: false,
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
      assetContainerId: createDataProductByCatalogIdLink,
      state: ['available'],
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
      assetContainerId: createDataProductByCatalogIdLink,
      state: ['available'],
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

  test('createDataProductDraft()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: createDataProductByCatalogIdLink,
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
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
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      attachment: contractTermsDocumentAttachmentModel,
      upload_url: 'testString',
    };

    // DataProductContractTerms
    const dataProductContractTermsModel = {
      asset: assetReferenceModel,
      id: 'testString',
      documents: [contractTermsDocumentModel],
      error_msg: 'testString',
    };

    // ContainerIdentity
    const containerIdentityModel = {
      id: createDataProductByCatalogIdLink,
    };

    // AssetPrototype
    const assetPrototypeModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      container: containerIdentityModel,
    };

    // AssetPartReference
    const assetPartReferenceModel = {
      id: '16a8f683-f947-48d9-a92c-b81758b1a5f5',
      container: containerReferenceModel,
      type: 'data_asset',
    };

    // DeliveryMethod
    const deliveryMethodModel = {
      id: '8848fd43-7384-4435-aff3-6a9f113768c4',
      container: containerReferenceModel,
    };

    // Domain
    const domainModel = {
      id: `3f0688f0-69c3-441e-b49b-7c223daa1804`,
      name: `Risk Management`,
      container: containerReferenceModel,
    };

    // DataProductPart
    const dataProductPartModel = {
      asset: assetPartReferenceModel,
      delivery_methods: [deliveryMethodModel],
    };

    // DataProductVersionPrototype
    const dataProductVersionPrototypeModel = {
      version: '2.0.0',
      state: 'draft',
      name: 'New Delete Draft DP using Node SDK',
      description:
        'This is a description of My Data Product which will get deleted using NODE SDK.',
      types: ['data'],
      asset: assetPrototypeModel,
      domain: domainModel,
      parts_out: [dataProductPartModel],
    };

    const params = {
      drafts: [dataProductVersionPrototypeModel],
    };

    const res = await dphService.createDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    deleteAContractDocumentByDraftIdLink = res.result.drafts[0].id;
    deleteADraftByContractTermsIdLink = res.result.drafts[0].contract_terms[0].id;
    createAContractTermsDocByContractTermsIdLink = res.result.drafts[0].contract_terms[0].id;
    deleteADraftByDraftIdLink = res.result.drafts[0].id;
    createAContractTermsDocByDraftIdLink = res.result.drafts[0].id;
  });

  test('listDataProductDrafts()', async () => {
    const params = {
      dataProductId: getListOfDataProductDraftsByDataProductIdLink,
      assetContainerId: createDataProductByCatalogIdLink,
      limit: 200,
    };

    const res = await dphService.listDataProductDrafts(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductDrafts() via DataProductDraftsPager', async () => {
    const params = {
      dataProductId: '-',
      assetContainerId: createDataProductByCatalogIdLink,
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

  test('createDraftContractTermsDocumentForDeleteOp()', async () => {
    // Request models needed by this operation.

    const params = {
      dataProductId: '-',
      draftId: createAContractTermsDocByDraftIdLink,
      contractTermsId: createAContractTermsDocByContractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
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
      dataProductId: '-',
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
      dataProductId: '-',
      draftId: deleteADraftByDraftIdLink,
    };

    const res = await dphService.deleteDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
