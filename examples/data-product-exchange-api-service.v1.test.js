/**
 * @jest-environment node
 */
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

const DataProductExchangeApiServiceV1 = require('../dist/data-product-exchange-api-service/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Data Product Exchange API Service service.
//
// The following configuration properties are assumed to be defined:
// DATA_PRODUCT_EXCHANGE_API_SERVICE_URL=<service base url>
// DATA_PRODUCT_EXCHANGE_API_SERVICE_AUTH_TYPE=iam
// DATA_PRODUCT_EXCHANGE_API_SERVICE_APIKEY=<IAM apikey>
// DATA_PRODUCT_EXCHANGE_API_SERVICE_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'data_product_exchange_api_service_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('DataProductExchangeApiServiceV1', () => {
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

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    dataProductExchangeApiServiceService = DataProductExchangeApiServiceV1.newInstance();

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
      res = await dataProductExchangeApiServiceService.initialize(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-initialize
    const responseBody = res.result;
    createDataProductVersionByCatalogIdLink = responseBody.container.id;
    getStatusByCatalogIdLink = responseBody.container.id;
    getListOfDataProductByCatalogIdLink = responseBody.container.id;
  });

  test('createDataProductVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDataProductVersion() result:');
    // begin-create_data_product_version

    // Request models needed by this operation.

    // ContainerReference
    const containerReferenceModel = {
      id: 'd29c42eb-7100-4b7a-8257-c196dbcca1cd',
    };

    const params = {
      container: containerReferenceModel,
      name: 'My New Data Product',
    };

    let res;
    try {
      res = await dataProductExchangeApiServiceService.createDataProductVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_data_product_version
    const responseBody = res.result;
    getDataProductVersionByUserIdLink = responseBody.id;
    updateDataProductVersionByUserIdLink = responseBody.id;
    deleteDataProductVersionByUserIdLink = responseBody.id;
    getDataProductByUserIdLink = responseBody.data_product.id;
    deliverDataProductVersionByUserIdLink = responseBody.id;
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
      res = await dataProductExchangeApiServiceService.getInitializeStatus({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_initialize_status
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
      id: getDataProductByUserIdLink,
    };

    let res;
    try {
      res = await dataProductExchangeApiServiceService.getDataProduct(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product
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
      const pager = new DataProductExchangeApiServiceV1.DataProductsPager(
        dataProductExchangeApiServiceService,
        params
      );
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

  test('listDataProductVersions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDataProductVersions() result:');
    // begin-list_data_product_versions

    const params = {
      assetContainerId: getListOfDataProductByCatalogIdLink,
      dataProduct: 'testString',
      state: 'draft',
      version: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new DataProductExchangeApiServiceV1.DataProductVersionsPager(
        dataProductExchangeApiServiceService,
        params
      );
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_data_product_versions
  });

  test('getDataProductVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDataProductVersion() result:');
    // begin-get_data_product_version

    const params = {
      id: getDataProductVersionByUserIdLink,
    };

    let res;
    try {
      res = await dataProductExchangeApiServiceService.getDataProductVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_data_product_version
  });

  test('updateDataProductVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDataProductVersion() result:');
    // begin-update_data_product_version

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
    };

    const params = {
      id: updateDataProductVersionByUserIdLink,
      jsonPatchInstructions: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await dataProductExchangeApiServiceService.updateDataProductVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_data_product_version
  });

  test('deliverDataProductVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deliverDataProductVersion() result:');
    // begin-deliver_data_product_version

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

    const params = {
      id: deliverDataProductVersionByUserIdLink,
      order: orderReferenceModel,
    };

    let res;
    try {
      res = await dataProductExchangeApiServiceService.deliverDataProductVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-deliver_data_product_version
  });

  test('deleteDataProductVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_data_product_version

    const params = {
      id: deleteDataProductVersionByUserIdLink,
    };

    try {
      await dataProductExchangeApiServiceService.deleteDataProductVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_data_product_version
  });
});
