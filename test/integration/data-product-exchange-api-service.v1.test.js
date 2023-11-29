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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const DataProductExchangeApiServiceV1 = require('../../dist/data-product-exchange-api-service/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'data_product_exchange_api_service_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('DataProductExchangeApiServiceV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let dataProductExchangeApiServiceService;

  // Variables to hold link values
  let createDataProductVersionByCatalogIdLink;
  let deleteDataProductVersionByUserIdLink;
  let deliverDataProductVersionByUserIdLink;
  let getDataProductByUserIdLink;
  let getDataProductVersionByUserIdLink;
  let getListOfDataProductByCatalogIdLink;
  let getStatusByCatalogIdLink;
  let updateDataProductVersionByUserIdLink;

  test('Initialize service', async () => {
    dataProductExchangeApiServiceService = DataProductExchangeApiServiceV1.newInstance();

    expect(dataProductExchangeApiServiceService).not.toBeNull();

    const config = readExternalSources(DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    dataProductExchangeApiServiceService.enableRetries();
  });

  test('initialize()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    // const containerReferenceModel = {
    //   id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
    //   type: 'catalog',
    // };

    const params = {
      container: null,
      include: ['delivery_methods', 'data_product_samples', 'domains_multi_industry'],
    };

    const res = await dataProductExchangeApiServiceService.initialize(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
    createDataProductVersionByCatalogIdLink = res.result.container.id;
    getStatusByCatalogIdLink = res.result.container.id;
    getListOfDataProductByCatalogIdLink = res.result.container.id;
  });

  test('createDataProductVersion()', async () => {
    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: createDataProductVersionByCatalogIdLink,
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

    const params = {
      container: containerReferenceModel,
      name: 'My New Data Product',
      description: 'testString',
      type: ['data'],
    };

    const res = await dataProductExchangeApiServiceService.createDataProductVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getDataProductVersionByUserIdLink = res.result.id;
    updateDataProductVersionByUserIdLink = res.result.id;
    deleteDataProductVersionByUserIdLink = res.result.id;
    getDataProductByUserIdLink = res.result.data_product.id;
    deliverDataProductVersionByUserIdLink = res.result.id;
  });

  test('getInitializeStatus()', async () => {
    const params = {
      containerId: getStatusByCatalogIdLink,
    };

    const res = await dataProductExchangeApiServiceService.getInitializeStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getDataProduct()', async () => {
    const params = {
      id: getDataProductByUserIdLink,
    };

    const res = await dataProductExchangeApiServiceService.getDataProduct(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProducts()', async () => {
    const params = {
      limit: 200,
    };

    const res = await dataProductExchangeApiServiceService.listDataProducts(params);
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
    let pager = new DataProductExchangeApiServiceV1.DataProductsPager(
      dataProductExchangeApiServiceService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DataProductExchangeApiServiceV1.DataProductsPager(
      dataProductExchangeApiServiceService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listDataProductVersions()', async () => {
    const params = {
      assetContainerId: getListOfDataProductByCatalogIdLink,
      limit: 200,
    };

    const res = await dataProductExchangeApiServiceService.listDataProductVersions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDataProductVersions() via DataProductVersionsPager', async () => {
    const params = {
      assetContainerId: getListOfDataProductByCatalogIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new DataProductExchangeApiServiceV1.DataProductVersionsPager(
      dataProductExchangeApiServiceService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new DataProductExchangeApiServiceV1.DataProductVersionsPager(
      dataProductExchangeApiServiceService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getDataProductVersion()', async () => {
    const params = {
      id: getDataProductVersionByUserIdLink,
    };

    const res = await dataProductExchangeApiServiceService.getDataProductVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDataProductVersion()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/description',
      value: 'This is the updated description from Node SDK',
    };

    const params = {
      id: updateDataProductVersionByUserIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    const res = await dataProductExchangeApiServiceService.updateDataProductVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteDataProductVersion()', async () => {
    const params = {
      id: deleteDataProductVersionByUserIdLink,
    };

    const res = await dataProductExchangeApiServiceService.deleteDataProductVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
