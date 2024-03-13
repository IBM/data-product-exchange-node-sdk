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
const DpxV1 = require('../../dist/dpx/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'dpx_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('DpxV1_integration', () => {
  jest.setTimeout(timeout);

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

  test('Initialize service', async () => {
    dpxService = DpxV1.newInstance();

    expect(dpxService).not.toBeNull();

    const config = readExternalSources(DpxV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    dpxService.enableRetries();
  });

  test('initialize()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    // const containerReferenceModel = {
    //   id: containerIdLink,
    //   type: 'catalog',
    // };

    const params = {
      container: null,
      include: ['delivery_methods', 'data_product_samples', 'domains_multi_industry'],
    };

    const res = await dpxService.initialize(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
    containerIdLink = res.result.container.id;
  });

  test('createDataProduct()', async () => {
    // Request models needed by this operation.

    // DataProductIdentity
    const dataProductIdentityModel = {
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
    };

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
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
      id: contractTermsIdLink,
      documents: [contractTermsDocumentModel],
    };

    // DataProductVersionPrototype
    const dataProductVersionPrototypeModel = {
      // version: '1.0.0',
      // state: 'draft',
      // data_product: dataProductIdentityModel,
      name: 'My New Data Product',
      description: 'This is a description of My Data Product.',
      asset: assetReferenceModel,
      // tags: ['testString'],
      // use_cases: [useCaseModel],
      // domain: domainModel,
      types: ['data'],
      // parts_out: [dataProductPartModel],
      // contract_terms: [dataProductContractTermsModel],
      // is_restricted: true,
    };

    const params = {
      drafts: [dataProductVersionPrototypeModel],
    };

    const res = await dpxService.createDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    optionalDataProductIdLink = res.result.id;
    dataProductIdLink = res.result.id;
  });

  test('createDataProductDraft()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      container: containerReferenceModel,
    };

    // DataProductIdentity
    const dataProductIdentityModel = {
      id: dataProductIdLink,
    };

    // UseCase
    const useCaseModel = {
      id: 'testString',
      name: 'testString',
      container: containerReferenceModel,
    };

    // Domain
    const domainModel = {
      id: '918c0bfd-6943-4468-b74f-bc111018e0d1',
      name: 'Customer Service',
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
      id: contractTermsIdLink,
      documents: [contractTermsDocumentModel],
    };

    const params = {
      dataProductId: dataProductIdLink,
      asset: assetReferenceModel,
      version: '1.2.0',
      // state: 'draft',
      dataProduct: dataProductIdentityModel,
      name: 'data_product_test',
      description: 'testString',
      // tags: ['testString'],
      // useCases: [useCaseModel],
      domain: domainModel,
      types: ['data'],
      // partsOut: [dataProductPartModel],
      // contractTerms: [dataProductContractTermsModel],
      isRestricted: true,
    };

    const res = await dpxService.createDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    draftIdLink = res.result.id;
    contractTermsIdLink = res.result.contract_terms[0].id;
  });

  test('deleteDataProductDraft()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    const res = await dpxService.deleteDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('createDataProductDraftAgain()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: containerIdLink,
      type: 'catalog',
    };

    // AssetReference
    const assetReferenceModel = {
      id: '2b0bf220-079c-11ee-be56-0242ac120002',
      container: containerReferenceModel,
    };

    // DataProductIdentity
    const dataProductIdentityModel = {
      id: dataProductIdLink,
    };

    // UseCase
    const useCaseModel = {
      id: 'testString',
      name: 'testString',
      container: containerReferenceModel,
    };

    // Domain
    const domainModel = {
      id: '918c0bfd-6943-4468-b74f-bc111018e0d1',
      name: 'Customer Service',
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
      id: contractTermsIdLink,
      documents: [contractTermsDocumentModel],
    };

    const params = {
      dataProductId: dataProductIdLink,
      asset: assetReferenceModel,
      version: '1.2.0',
      // state: 'draft',
      dataProduct: dataProductIdentityModel,
      name: 'data_product_test',
      description: 'testString',
      // tags: ['testString'],
      // useCases: [useCaseModel],
      domain: domainModel,
      types: ['data'],
      // partsOut: [dataProductPartModel],
      // contractTerms: [dataProductContractTermsModel],
      isRestricted: true,
    };

    const res = await dpxService.createDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    draftIdLink = res.result.id;
    contractTermsIdLink = res.result.contract_terms[0].id;
  });

  test('createDraftContractTermsDocument()', async () => {
    // Request models needed by this operation.

    // ContractTermsDocumentAttachment
    const contractTermsDocumentAttachmentModel = {
      id: 'testString',
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      url: 'https://www.google.com',
      // attachment: contractTermsDocumentAttachmentModel,
      // uploadUrl: 'testString',
    };

    const res = await dpxService.createDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    documentIdLink = res.result.id;
  });

  test('deleteDraftContractTermsDocument()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    const res = await dpxService.deleteDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('createDraftContractTermsDocumentAgain()', async () => {
    // Request models needed by this operation.

    // ContractTermsDocumentAttachment
    const contractTermsDocumentAttachmentModel = {
      id: 'testString',
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      type: 'terms_and_conditions',
      name: 'Terms and conditions document',
      id: 'b38df608-d34b-4d58-8136-ed25e6c6684e',
      url: 'https://www.google.com',
      // attachment: contractTermsDocumentAttachmentModel,
      // uploadUrl: 'testString',
    };

    const res = await dpxService.createDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    documentIdLink = res.result.id;
  });

  test('updateDataProductDraft()', async () => {
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

    const res = await dpxService.updateDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getDataProductDraft()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    const res = await dpxService.getDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDraftContractTermsDocument()', async () => {
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

    const res = await dpxService.updateDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getInitializeStatus()', async () => {
    const params = {
      containerId: containerIdLink,
    };

    const res = await dpxService.getInitializeStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getDraftContractTermsDocument()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    const res = await dpxService.getDraftContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('publishDataProductDraft()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      draftId: draftIdLink,
    };

    const res = await dpxService.publishDataProductDraft(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    releaseIdLink = res.result.id;
  });

  test('manageApiKeys()', async () => {
    const res = await dpxService.manageApiKeys();
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('listDataProducts()', async () => {
    const params = {
      limit: 200,
    };

    const res = await dpxService.listDataProducts(params);
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
    let pager = new DpxV1.DataProductsPager(dpxService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DpxV1.DataProductsPager(dpxService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getDataProduct()', async () => {
    const params = {
      dataProductId: dataProductIdLink,
    };

    const res = await dpxService.getDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductDrafts()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      limit: 200,
    };

    const res = await dpxService.listDataProductDrafts(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductDrafts() via DataProductDraftsPager', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DpxV1.DataProductDraftsPager(dpxService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DpxV1.DataProductDraftsPager(dpxService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getDataProductRelease()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
    };

    const res = await dpxService.getDataProductRelease(params);
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
      value: 'New Description',
    };

    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dpxService.updateDataProductRelease(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReleaseContractTermsDocument()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
      contractTermsId: contractTermsIdLink,
      documentId: documentIdLink,
    };

    const res = await dpxService.getReleaseContractTermsDocument(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductReleases()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      limit: 200,
    };

    const res = await dpxService.listDataProductReleases(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductReleases() via DataProductReleasesPager', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      state: ['available'],
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DpxV1.DataProductReleasesPager(dpxService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DpxV1.DataProductReleasesPager(dpxService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('retireDataProductRelease()', async () => {
    const params = {
      dataProductId: optionalDataProductIdLink,
      releaseId: releaseIdLink,
    };

    const res = await dpxService.retireDataProductRelease(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
