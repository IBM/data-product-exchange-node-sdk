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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.79.0-2eb6af3d-20230905-174838
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Data Product Exchange API Service
 *
 * API Version: 1.0.0
 */

class DataProductExchangeApiServiceV1 extends BaseService {
  static DEFAULT_SERVICE_NAME: string = 'data_product_exchange_api_service';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DataProductExchangeApiServiceV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DataProductExchangeApiServiceV1}
   */

  public static newInstance(options: UserOptions): DataProductExchangeApiServiceV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DataProductExchangeApiServiceV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a DataProductExchangeApiServiceV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DataProductExchangeApiServiceV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
  }

  /*************************
   * configuration
   ************************/

  /**
   * Get the status of resources initialization in data product exchange.
   *
   * Use this API to get the status of the resource initialization in data product exchange. <br/><br/>If the data
   * product catalog exists but has never been initialized, the status will be "not_started".<br/>If the data product
   * catalog exists and has been or is being initialized, the response will contain the status of the last or current
   * initialization.If the initialization failed, the "errors" and the "trace" fields will contain the error(s)
   * encountered during the initialization and the id to trace the error(s).<br/>If the data product catalog doesn't
   * exist, a HTTP 404 response will be returned.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog will be looked up by using the uid of the default data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.InitializeResource>>}
   */
  public getInitializeStatus(
    params?: DataProductExchangeApiServiceV1.GetInitializeStatusParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.InitializeResource>
  > {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['containerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'container.id': _params.containerId,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getInitializeStatus'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/configuration/initialize/status',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Initialize resources in a data product exchange.
   *
   * Use this API to initialize default assets for data product exchange. <br/><br/>You can initialize:
   * <br/><ul><li>`delivery_methods` - Methods through which data product parts can be delivered to consumers of the
   * data product exchange</li><li>`domains_multi_industry` - Taxonomy of domains and use cases applicable to multiple
   * industries</li><li>`data_product_samples` - Sample data products used to illustrate capabilities of the data
   * product exchange</li></ul><br/><br/>If a resource depends on resources that are not specified in the request, these
   * dependent resources will be automatically initialized. E.g., initializing `data_product_samples` will also
   * initialize `domains_multi_industry` and `delivery_methods` even if they are not specified in the request because it
   * depends on them.<br/><br/>If initializing the data product exchange for the first time, do not specify a container.
   * The default data product catalog will be created.<br/>For first time initialization, it is recommended that
   * `delivery_methods` and at least one domain taxonomy is included in the initialize operation.<br/><br/>If the data
   * product exchange has already been initialized, you may call this API again to initialize new resources, such as new
   * delivery methods.In this case, specify the default data product catalog container information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ContainerReference} [params.container] - Data product exchange container.
   * @param {string[]} [params.include] - List of configuration options to initialize.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.InitializeResource>>}
   */
  public initialize(
    params?: DataProductExchangeApiServiceV1.InitializeParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.InitializeResource>
  > {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['container', 'include', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'container': _params.container,
      'include': _params.include,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'initialize'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/configuration/initialize',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * dataProducts
   ************************/

  /**
   * Retrieve a data product identified by id.
   *
   * Retrieve a data product identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Data product id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProduct>>}
   */
  public getDataProduct(
    params: DataProductExchangeApiServiceV1.GetDataProductParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProduct>
  > {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDataProduct'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a list of data products.
   *
   * Retrieve a list of data products.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Limit the number of data products in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductCollection>>}
   */
  public listDataProducts(
    params?: DataProductExchangeApiServiceV1.ListDataProductsParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductCollection>
  > {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDataProducts'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * dataProductVersions
   ************************/

  /**
   * Retrieve a list of data product versions.
   *
   * Retrieve a list of data product versions.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.assetContainerId] - Filter the list of data product versions by container id.
   * @param {string} [params.dataProduct] - Filter the list of data product versions by data product id.
   * @param {string} [params.state] - Filter the list of data product versions by state. States are: draft, available
   * and retired.
   * @param {string} [params.version] - Filter the list of data product versions by version number.
   * @param {number} [params.limit] - Limit the number of data products in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersionCollection>>}
   */
  public listDataProductVersions(
    params?: DataProductExchangeApiServiceV1.ListDataProductVersionsParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersionCollection>
  > {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'assetContainerId',
      'dataProduct',
      'state',
      'version',
      'limit',
      'start',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'asset.container.id': _params.assetContainerId,
      'data_product': _params.dataProduct,
      'state': _params.state,
      'version': _params.version,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDataProductVersions'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new data product version.
   *
   * Use this API to create a new data product version.<br/><br/>If the `state` is not specified, the data product
   * version will be created in **draft** state.<br/><br/>**Create the first version of a data
   * product**<br/><br/>Required fields:<br/><br/>- name<br/>- container<br/><br/>If `version` is not specified, the
   * default version **1.0.0** will be used.<br/><br/>**Create a new version of an existing data
   * product**<br/><br/>Required fields:<br/><br/>- container<br/>- data_product<br/>- version<br/><br/>The `domain` is
   * required if state of data product is available. If no additional properties are specified, the values will be
   * copied from the most recently available version of the data product.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ContainerReference} params.container - Data product exchange container.
   * @param {string} [params.version] - The data product version number.
   * @param {string} [params.state] - The state of the data product version. If not specified, the data product version
   * will be created in `draft` state.
   * @param {DataProductIdentity} [params.dataProduct] - Data product identifier.
   * @param {string} [params.name] - The name to use to refer to the new data product version. If this is a new data
   * product, this value must be specified. If this is a new version of an existing data product, the name will default
   * to the name of the previous data product version. A name can contain letters, numbers, understores, dashes, spaces
   * or periods. A name must contain at least one non-space character.
   * @param {string} [params.description] - Description of the data product version. If this is a new version of an
   * existing data product, the description will default to the description of the previous version of the data product.
   * @param {string[]} [params.tags] - Tags on the new data product version. If this is the first version of a data
   * product, tags defaults to an empty list. If this is a new version of an existing data product, tags will default to
   * the list of tags on the previous version of the data product.
   * @param {UseCase[]} [params.useCases] - Use cases that the data product version serves. If this is the first version
   * of a data product, use cases defaults to an empty list. If this is a new version of an existing data product, use
   * cases will default to the list of use cases on the previous version of the data product.
   * @param {Domain} [params.domain] - The business domain associated with the data product version.
   * @param {string[]} [params.type] - The types of the parts included in this data product version. If this is the
   * first version of a data product, this field defaults to an empty list. If this is a new version of an existing data
   * product, the types will default to the types of the previous version of the data product.
   * @param {DataProductPart[]} [params.partsOut] - The outgoing parts of this data product version to be delivered to
   * consumers. If this is the first version of a data product, this field defaults to an empty list. If this is a new
   * version of an existing data product, the data product parts will default to the parts list from the previous
   * version of the data product.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>>}
   */
  public createDataProductVersion(
    params: DataProductExchangeApiServiceV1.CreateDataProductVersionParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>
  > {
    const _params = { ...params };
    const _requiredParams = ['container'];
    const _validParams = [
      'container',
      'version',
      'state',
      'dataProduct',
      'name',
      'description',
      'tags',
      'useCases',
      'domain',
      'type',
      'partsOut',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'container': _params.container,
      'version': _params.version,
      'state': _params.state,
      'data_product': _params.dataProduct,
      'name': _params.name,
      'description': _params.description,
      'tags': _params.tags,
      'use_cases': _params.useCases,
      'domain': _params.domain,
      'type': _params.type,
      'parts_out': _params.partsOut,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDataProductVersion'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a data product version identified by ID.
   *
   * Retrieve a data product version identified by a valid ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Data product version ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>>}
   */
  public getDataProductVersion(
    params: DataProductExchangeApiServiceV1.GetDataProductVersionParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>
  > {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDataProductVersion'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a data product version identified by ID.
   *
   * Delete a data product version identified by a valid ID. Delete can be performed only on data product versions in
   * **draft** state. To retire a data product version which has already been published, use `PATCH
   * /data_product_exchange/v1/data_product_versions` to change the data product version state to **retired**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Data product version ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.EmptyObject>>}
   */
  public deleteDataProductVersion(
    params: DataProductExchangeApiServiceV1.DeleteDataProductVersionParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.EmptyObject>
  > {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDataProductVersion'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the data product version identified by ID.
   *
   * Use this API to update the properties of a data product version identified by a valid ID.<br/><br/>Specify patch
   * operations using http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the
   * properties of a data product<br/><br/>- Add/Remove parts from a data product<br/><br/>- Add/Remove use cases from a
   * data product<br/><br/>- Update the data product state<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Data product version ID.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>>}
   */
  public updateDataProductVersion(
    params: DataProductExchangeApiServiceV1.UpdateDataProductVersionParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DataProductVersion>
  > {
    const _params = { ...params };
    const _requiredParams = ['id', 'jsonPatchInstructions'];
    const _validParams = ['id', 'jsonPatchInstructions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDataProductVersion'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions/{id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Deliver a data product identified by id.
   *
   * Deliver a data product version identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Data product version id.
   * @param {OrderReference} [params.order] - The order for the data product that should be delivered as part of this
   * delivery operation.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DeliveryResource>>}
   */
  public deliverDataProductVersion(
    params: DataProductExchangeApiServiceV1.DeliverDataProductVersionParams
  ): Promise<
    DataProductExchangeApiServiceV1.Response<DataProductExchangeApiServiceV1.DeliveryResource>
  > {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'order', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'order': _params.order,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      DataProductExchangeApiServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deliverDataProductVersion'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_product_versions/{id}/deliver',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace DataProductExchangeApiServiceV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getInitializeStatus` operation. */
  export interface GetInitializeStatusParams {
    /** Container ID of the data product catalog. If not supplied, the data product catalog will be looked up by
     *  using the uid of the default data product catalog.
     */
    containerId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `initialize` operation. */
  export interface InitializeParams {
    /** Data product exchange container. */
    container?: ContainerReference;
    /** List of configuration options to initialize. */
    include?: InitializeConstants.Include | string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `initialize` operation. */
  export namespace InitializeConstants {
    /** Include */
    export enum Include {
      DELIVERY_METHODS = 'delivery_methods',
      DOMAINS_MULTI_INDUSTRY = 'domains_multi_industry',
      DATA_PRODUCT_SAMPLES = 'data_product_samples',
    }
  }

  /** Parameters for the `getDataProduct` operation. */
  export interface GetDataProductParams {
    /** Data product id. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProducts` operation. */
  export interface ListDataProductsParams {
    /** Limit the number of data products in the results. The maximum limit is 200. */
    limit?: number;
    /** Start token for pagination. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProductVersions` operation. */
  export interface ListDataProductVersionsParams {
    /** Filter the list of data product versions by container id. */
    assetContainerId?: string;
    /** Filter the list of data product versions by data product id. */
    dataProduct?: string;
    /** Filter the list of data product versions by state. States are: draft, available and retired. */
    state?: ListDataProductVersionsConstants.State | string;
    /** Filter the list of data product versions by version number. */
    version?: string;
    /** Limit the number of data products in the results. The maximum limit is 200. */
    limit?: number;
    /** Start token for pagination. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listDataProductVersions` operation. */
  export namespace ListDataProductVersionsConstants {
    /** Filter the list of data product versions by state. States are: draft, available and retired. */
    export enum State {
      DRAFT = 'draft',
      AVAILABLE = 'available',
      RETIRED = 'retired',
    }
  }

  /** Parameters for the `createDataProductVersion` operation. */
  export interface CreateDataProductVersionParams {
    /** Data product exchange container. */
    container: ContainerReference;
    /** The data product version number. */
    version?: string;
    /** The state of the data product version. If not specified, the data product version will be created in `draft`
     *  state.
     */
    state?: CreateDataProductVersionConstants.State | string;
    /** Data product identifier. */
    dataProduct?: DataProductIdentity;
    /** The name to use to refer to the new data product version. If this is a new data product, this value must be
     *  specified. If this is a new version of an existing data product, the name will default to the name of the
     *  previous data product version. A name can contain letters, numbers, understores, dashes, spaces or periods. A
     *  name must contain at least one non-space character.
     */
    name?: string;
    /** Description of the data product version. If this is a new version of an existing data product, the
     *  description will default to the description of the previous version of the data product.
     */
    description?: string;
    /** Tags on the new data product version. If this is the first version of a data product, tags defaults to an
     *  empty list. If this is a new version of an existing data product, tags will default to the list of tags on the
     *  previous version of the data product.
     */
    tags?: string[];
    /** Use cases that the data product version serves. If this is the first version of a data product, use cases
     *  defaults to an empty list. If this is a new version of an existing data product, use cases will default to the
     *  list of use cases on the previous version of the data product.
     */
    useCases?: UseCase[];
    /** The business domain associated with the data product version. */
    domain?: Domain;
    /** The types of the parts included in this data product version. If this is the first version of a data
     *  product, this field defaults to an empty list. If this is a new version of an existing data product, the types
     *  will default to the types of the previous version of the data product.
     */
    type?: CreateDataProductVersionConstants.Type | string[];
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    partsOut?: DataProductPart[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDataProductVersion` operation. */
  export namespace CreateDataProductVersionConstants {
    /** The state of the data product version. If not specified, the data product version will be created in `draft` state. */
    export enum State {
      DRAFT = 'draft',
      AVAILABLE = 'available',
      RETIRED = 'retired',
    }
    /** Type */
    export enum Type {
      DATA = 'data',
      CODE = 'code',
    }
  }

  /** Parameters for the `getDataProductVersion` operation. */
  export interface GetDataProductVersionParams {
    /** Data product version ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDataProductVersion` operation. */
  export interface DeleteDataProductVersionParams {
    /** Data product version ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductVersion` operation. */
  export interface UpdateDataProductVersionParams {
    /** Data product version ID. */
    id: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deliverDataProductVersion` operation. */
  export interface DeliverDataProductVersionParams {
    /** Data product version id. */
    id: string;
    /** The order for the data product that should be delivered as part of this delivery operation. */
    order?: OrderReference;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The asset represented in this part. */
  export interface AssetPartReference {
    /** The unique identifier of the asset. */
    id: string;
    /** Data product exchange container. */
    container: ContainerReference;
    /** The type of the asset. */
    type?: string;
  }

  /** The asset referenced by the data product version. */
  export interface AssetReference {
    /** The unique identifier of the asset. */
    id: string;
    /** Data product exchange container. */
    container: ContainerReference;
  }

  /** Data product exchange container. */
  export interface ContainerReference {
    /** Container identifier. */
    id: string;
    /** Container type. */
    type?: string;
  }

  /** Data Product. */
  export interface DataProduct {
    /** Data product identifier. */
    id: string;
    /** Data product exchange container. */
    container: ContainerReference;
    /** Name to refer to the data product. */
    name: string;
  }

  /** A collection of data products. */
  export interface DataProductCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Collection of data products. */
    data_products: DataProduct[];
  }

  /** Data product identifier. */
  export interface DataProductIdentity {
    /** Data product identifier. */
    id: string;
  }

  /** DataProductPart. */
  export interface DataProductPart {
    /** The asset represented in this part. */
    asset: AssetPartReference;
    /** The revision number of the asset represented in this part. */
    revision?: number;
    /** The time for when the part was last updated. */
    updated_at?: string;
    /** Delivery methods describing the delivery options available for this part. */
    delivery_methods?: DeliveryMethod[];
  }

  /** Data Product version. */
  export interface DataProductVersion {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: string;
    /** Data product identifier. */
    data_product: DataProductIdentity;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** The identifier of the data product version. */
    id: string;
    /** The asset referenced by the data product version. */
    asset: AssetReference;
    /** Tags on the data product. */
    tags?: string[];
    /** A list of use cases associated with the data product version. */
    use_cases: UseCase[];
    /** The business domain associated with the data product version. */
    domain: Domain;
    /** Type of parts on the data product. */
    type?: string[];
    /** Outgoing parts of a data product used to deliver the data product to consumers. */
    parts_out: DataProductPart[];
    /** The user who published this data product version. */
    published_by?: string;
    /** The time when this data product version was published. */
    published_at?: string;
    /** The creator of this data product version. */
    created_by: string;
    /** The time when this data product version was created. */
    created_at: string;
  }

  /** A collection of data product version summaries. */
  export interface DataProductVersionCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Collection of data product versions. */
    data_product_versions: DataProductVersionSummary[];
  }

  /** DataProductVersionSummary. */
  export interface DataProductVersionSummary {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: string;
    /** Data product identifier. */
    data_product: DataProductIdentity;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** The identifier of the data product version. */
    id: string;
    /** The asset referenced by the data product version. */
    asset: AssetReference;
  }

  /** DeliveryMethod. */
  export interface DeliveryMethod {
    /** The ID of the delivery method. */
    id: string;
    /** Data product exchange container. */
    container: ContainerReference;
  }

  /** DeliveryResource. */
  export interface DeliveryResource {
    /** Status of the deliver operation. */
    status: string;
    /** Link to monitor the status of the deliver operation. */
    href?: string;
  }

  /** The business domain associated with the data product version. */
  export interface Domain {
    /** The ID of the domain. */
    id: string;
    /** The display name of the domain. */
    name: string;
    /** Data product exchange container. */
    container?: ContainerReference;
  }

  /** ErrorModel. */
  export interface ErrorModel {
    code?: string;
    target?: ErrorTargetModel;
    message?: string;
    more_info?: string;
  }

  /** ErrorTargetModel. */
  export interface ErrorTargetModel {
    type?: string;
    name?: string;
  }

  /** First page in the collection. */
  export interface FirstPage {
    /** Link to the first page in the collection. */
    href: string;
  }

  /** InitializeResource. */
  export interface InitializeResource {
    /** Data product exchange container. */
    container?: ContainerReference;
    /** Link to monitor the status of the initialize operation. */
    href?: string;
    /** Status of the initialize operation. */
    status?: string;
    /** The id to trace the failed initialization operation. */
    trace?: string;
    /** The error(s) encountered in the initialization operation. */
    errors?: ErrorModel[];
    /** Start time of the last initialization. */
    last_started_at?: string;
    /** End time of the last initialization. */
    last_finished_at?: string;
    /** Initialized options. */
    initialized_options?: InitializedOption[];
  }

  /** Initialized options. */
  export interface InitializedOption {
    /** The name of the option. */
    name?: string;
    /** The version of the option. */
    version?: number;
  }

  /** ItemReference. */
  export interface ItemReference {
    /** The unique identifier of an item on an asset list representing a data product order. */
    id: string;
  }

  /** This model represents an individual patch operation to be performed on a JSON document, as defined by RFC 6902. */
  export interface JsonPatchOperation {
    /** The operation to be performed. */
    op: string;
    /** The JSON Pointer that identifies the field that is the target of the operation. */
    path: string;
    /** The JSON Pointer that identifies the field that is the source of the operation. */
    from?: string;
    /** The value to be used within the operation. */
    value?: any;
  }

  /** Next page in the collection. */
  export interface NextPage {
    /** Link to the next page in the collection. */
    href: string;
    /** Start token for pagination to the next page in the collection. */
    start: string;
  }

  /** The order for the data product that should be delivered as part of this delivery operation. */
  export interface OrderReference {
    /** The unique identifier of the asset list representing a data product order. */
    id: string;
    /** The list of items to be delivered as part of this operation. This list can be a subset of items belonging to
     *  this order. All items specified must belong to this order.
     */
    items?: ItemReference[];
  }

  /** UseCase. */
  export interface UseCase {
    /** The id of the use case associated with the data product. */
    id: string;
    /** The display name of the use case associated with the data product. */
    name: string;
    /** Data product exchange container. */
    container?: ContainerReference;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * DataProductsPager can be used to simplify the use of listDataProducts().
   */
  export class DataProductsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: DataProductExchangeApiServiceV1;

    protected params: DataProductExchangeApiServiceV1.ListDataProductsParams;

    /**
     * Construct a DataProductsPager object.
     *
     * @param {DataProductExchangeApiServiceV1}  client - The service client instance used to invoke listDataProducts()
     * @param {Object} [params] - The parameters to be passed to listDataProducts()
     * @constructor
     * @returns {DataProductsPager}
     */
    constructor(
      client: DataProductExchangeApiServiceV1,
      params?: DataProductExchangeApiServiceV1.ListDataProductsParams
    ) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listDataProducts().
     * @returns {Promise<DataProductExchangeApiServiceV1.DataProduct[]>}
     */
    public async getNext(): Promise<DataProductExchangeApiServiceV1.DataProduct[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listDataProducts(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.data_products;
    }

    /**
     * Returns all results by invoking listDataProducts() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<DataProductExchangeApiServiceV1.DataProduct[]>}
     */
    public async getAll(): Promise<DataProductExchangeApiServiceV1.DataProduct[]> {
      const results: DataProduct[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * DataProductVersionsPager can be used to simplify the use of listDataProductVersions().
   */
  export class DataProductVersionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: DataProductExchangeApiServiceV1;

    protected params: DataProductExchangeApiServiceV1.ListDataProductVersionsParams;

    /**
     * Construct a DataProductVersionsPager object.
     *
     * @param {DataProductExchangeApiServiceV1}  client - The service client instance used to invoke listDataProductVersions()
     * @param {Object} [params] - The parameters to be passed to listDataProductVersions()
     * @constructor
     * @returns {DataProductVersionsPager}
     */
    constructor(
      client: DataProductExchangeApiServiceV1,
      params?: DataProductExchangeApiServiceV1.ListDataProductVersionsParams
    ) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listDataProductVersions().
     * @returns {Promise<DataProductExchangeApiServiceV1.DataProductVersionSummary[]>}
     */
    public async getNext(): Promise<DataProductExchangeApiServiceV1.DataProductVersionSummary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listDataProductVersions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.data_product_versions;
    }

    /**
     * Returns all results by invoking listDataProductVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<DataProductExchangeApiServiceV1.DataProductVersionSummary[]>}
     */
    public async getAll(): Promise<DataProductExchangeApiServiceV1.DataProductVersionSummary[]> {
      const results: DataProductVersionSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = DataProductExchangeApiServiceV1;
