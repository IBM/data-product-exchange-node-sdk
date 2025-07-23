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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.96.0-d6dec9d7-20241008-212902
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
 * Data Product Hub API Service
 *
 * API Version: 1
 */

class DphV1 extends BaseService {
  static DEFAULT_SERVICE_NAME: string = 'dph';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DphV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {DphV1}
   */

  public static newInstance(options: UserOptions): DphV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DphV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a DphV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DphV1}
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
   * Get resource initialization status.
   *
   * Use this API to get the status of resource initialization in Data Product Hub.<br/><br/>If the data product catalog
   * exists but has never been initialized, the status will be "not_started".<br/><br/>If the data product catalog
   * exists and has been or is being initialized, the response will contain the status of the last or current
   * initialization. If the initialization failed, the "errors" and "trace" fields will contain the error(s) encountered
   * during the initialization, including the ID to trace the error(s).<br/><br/>If the data product catalog doesn't
   * exist, an HTTP 404 response is returned.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog is looked up by using the uid of the default data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.InitializeResource>>}
   */
  public getInitializeStatus(
    params?: DphV1.GetInitializeStatusParams
  ): Promise<DphV1.Response<DphV1.InitializeResource>> {
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

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getInitializeStatus');

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
   * Get service id credentials.
   *
   * Use this API to get the information of service id credentials in Data Product Hub.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ServiceIdCredentials>>}
   */
  public getServiceIdCredentials(
    params?: DphV1.GetServiceIdCredentialsParams
  ): Promise<DphV1.Response<DphV1.ServiceIdCredentials>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getServiceIdCredentials');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/configuration/credentials',
        method: 'GET',
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
   * Initialize resources.
   *
   * Use this API to initialize default assets for data product hub. <br/><br/>You can initialize:
   * <br/><ul><li>`delivery_methods` - Methods through which data product parts can be delivered to consumers of the
   * data product hub</li><li>`domains_multi_industry` - Taxonomy of domains and use cases applicable to multiple
   * industries</li><li>`data_product_samples` - Sample data products used to illustrate capabilities of the data
   * product hub</li><li>`workflows` - Workflows to enable restricted data products</li><li>`project` - A default
   * project for exporting data assets to files</li><li>`catalog_configurations` - Catalog configurations for the
   * default data product catalog</li></ul><br/><br/>If a resource depends on resources that are not specified in the
   * request, these dependent resources will be automatically initialized. E.g., initializing `data_product_samples`
   * will also initialize `domains_multi_industry` and `delivery_methods` even if they are not specified in the request
   * because it depends on them.<br/><br/>If initializing the data product hub for the first time, do not specify a
   * container. The default data product catalog will be created.<br/>For first time initialization, it is recommended
   * that at least `delivery_methods` and `domains_multi_industry` is included in the initialize operation.<br/><br/>If
   * the data product hub has already been initialized, you may call this API again to initialize new resources, such as
   * new delivery methods. In this case, specify the default data product catalog container information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ContainerReference} [params.container] - Container reference.
   * @param {string[]} [params.include] - List of configuration options to (re-)initialize.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.InitializeResource>>}
   */
  public initialize(
    params?: DphV1.InitializeParams
  ): Promise<DphV1.Response<DphV1.InitializeResource>> {
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

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'initialize');

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

  /**
   * Rotate credentials for a Data Product Hub instance.
   *
   * Use this API to rotate credentials for a Data Product Hub instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.EmptyObject>>}
   */
  public manageApiKeys(
    params?: DphV1.ManageApiKeysParams
  ): Promise<DphV1.Response<DphV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'manageApiKeys');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/configuration/rotate_credentials',
        method: 'POST',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * dataAssetVisualization
   ************************/

  /**
   * Create visualization asset and initialize profiling for the provided data assets.
   *
   * Use this API to create visualization asset and initialize profiling for the provided data assets<br/><br/>Provide
   * the below required fields<br/><br/>Required fields:<br/><br/>- catalog_id<br/>- Collection of assetId with it's
   * related asset id<br/><br/>.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {DataAssetRelationship[]} [params.assets] - Data product hub asset and it's related part asset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataAssetVisualizationRes>>}
   */
  public createDataAssetVisualization(
    params?: DphV1.CreateDataAssetVisualizationParams
  ): Promise<DphV1.Response<DphV1.DataAssetVisualizationRes>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['assets', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'assets': _params.assets,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDataAssetVisualization'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_asset/visualization',
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
   * Reinitiate visualization for an asset.
   *
   * Use this API to Reinitiate visualization for an asset which is in below scenarios<br/><br/>- Previous bucket got
   * deleted and new bucket is created.<br/>- Data visualization attachment is missing in asset details.<br/>-
   * Visualization asset reference is missing in related asset details.<br/><br/>.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {DataAssetRelationship[]} [params.assets] - Data product hub asset and it's related part asset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataAssetVisualizationRes>>}
   */
  public reinitiateDataAssetVisualization(
    params?: DphV1.ReinitiateDataAssetVisualizationParams
  ): Promise<DphV1.Response<DphV1.DataAssetVisualizationRes>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['assets', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'assets': _params.assets,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'reinitiateDataAssetVisualization'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_asset/visualization/reinitiate',
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
   * Retrieve a list of data products.
   *
   * Retrieve a list of data products.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Limit the number of data products in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductCollection>>}
   */
  public listDataProducts(
    params?: DphV1.ListDataProductsParams
  ): Promise<DphV1.Response<DphV1.DataProductCollection>> {
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

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'listDataProducts');

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

  /**
   * Create a new data product.
   *
   * Use this API to create a new data product.<br/><br/>Provide the initial draft of the data
   * product.<br/><br/>Required fields:<br/><br/>- name<br/>- container<br/><br/>If `version` is not specified, the
   * default version **1.0.0** will be used.<br/><br/>The `domain` is optional.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {DataProductDraftPrototype[]} params.drafts - Collection of data products drafts to add to data product.
   * @param {number} [params.limit] - Limit the number of data products in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProduct>>}
   */
  public createDataProduct(
    params: DphV1.CreateDataProductParams
  ): Promise<DphV1.Response<DphV1.DataProduct>> {
    const _params = { ...params };
    const _requiredParams = ['drafts'];
    const _validParams = ['drafts', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'drafts': _params.drafts,
    };

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'createDataProduct');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products',
        method: 'POST',
        body,
        qs: query,
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
   * Retrieve a data product identified by id.
   *
   * Retrieve a data product identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProduct>>}
   */
  public getDataProduct(
    params: DphV1.GetDataProductParams
  ): Promise<DphV1.Response<DphV1.DataProduct>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId'];
    const _validParams = ['dataProductId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getDataProduct');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}',
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
  /*************************
   * dataProductDrafts
   ************************/

  /**
   * Complete a contract document upload operation.
   *
   * After uploading a file to the provided signed URL, call this endpoint to mark the upload as complete. After the
   * upload operation is marked as complete, the file is available to download. Use '-' for the `data_product_id` to
   * skip specifying the data product ID explicitly.
   * - After the upload is marked as complete, the returned URL is displayed in the "url" field. The signed URL is used
   * to download the document.
   * - Calling complete on referential documents results in an error.
   * - Calling complete on attachment documents for which the file has not been uploaded will result in an error.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.documentId - Document id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTermsDocument>>}
   */
  public completeDraftContractTermsDocument(
    params: DphV1.CompleteDraftContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.ContractTermsDocument>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId'];
    const _validParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'completeDraftContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}/complete',
        method: 'POST',
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
   * Retrieve a list of data product drafts.
   *
   * Retrieve a list of data product drafts. Use '-' for the `data_product_id` to skip specifying the data product ID
   * explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} [params.assetContainerId] - Filter the list of data product drafts by container id.
   * @param {string} [params.version] - Filter the list of data product drafts by version number.
   * @param {number} [params.limit] - Limit the number of data product drafts in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDraftCollection>>}
   */
  public listDataProductDrafts(
    params: DphV1.ListDataProductDraftsParams
  ): Promise<DphV1.Response<DphV1.DataProductDraftCollection>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId'];
    const _validParams = [
      'dataProductId',
      'assetContainerId',
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
      'version': _params.version,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'data_product_id': _params.dataProductId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'listDataProductDrafts');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts',
        method: 'GET',
        qs: query,
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
   * Create a new draft of an existing data product.
   *
   * Create a new draft of an existing data product.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID.
   * @param {AssetPrototype} params.asset - New asset input properties.
   * @param {string} [params.version] - The data product version number.
   * @param {string} [params.state] - The state of the data product version. If not specified, the data product version
   * will be created in `draft` state.
   * @param {DataProductIdentity} [params.dataProduct] - Data product identifier.
   * @param {string} [params.name] - The name that refers to the new data product version. If this is a new data
   * product, this value must be specified. If this is a new version of an existing data product, the name will default
   * to the name of the previous data product version. A name can contain letters, numbers, understores, dashes, spaces
   * or periods. A name must contain at least one non-space character.
   * @param {string} [params.description] - Description of the data product version. If this is a new version of an
   * existing data product, the description will default to the description of the previous version of the data product.
   * @param {string[]} [params.tags] - Tags on the data product.
   * @param {UseCase[]} [params.useCases] - A list of use cases associated with the data product version.
   * @param {string[]} [params.types] - Types of parts on the data product.
   * @param {ContractTerms[]} [params.contractTerms] - Contract terms binding various aspects of the data product.
   * @param {Domain} [params.domain] - Domain that the data product version belongs to. If this is the first version of
   * a data product, this field is required. If this is a new version of an existing data product, the domain will
   * default to the domain of the previous version of the data product.
   * @param {DataProductPart[]} [params.partsOut] - The outgoing parts of this data product version to be delivered to
   * consumers. If this is the first version of a data product, this field defaults to an empty list. If this is a new
   * version of an existing data product, the data product parts will default to the parts list from the previous
   * version of the data product.
   * @param {DataProductWorkflows} [params.workflows] - The workflows associated with the data product version.
   * @param {boolean} [params.dataviewEnabled] - Indicates whether the dataView has enabled for data product.
   * @param {string} [params.comments] - Comments by a producer that are provided either at the time of data product
   * version creation or retiring.
   * @param {AssetListAccessControl} [params.accessControl] - Access control object.
   * @param {string} [params.lastUpdatedAt] - Timestamp of last asset update.
   * @param {boolean} [params.isRestricted] - Indicates whether the data product is restricted or not. A restricted data
   * product indicates that orders of the data product requires explicit approval before data is delivered.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDraft>>}
   */
  public createDataProductDraft(
    params: DphV1.CreateDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductDraft>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'asset'];
    const _validParams = [
      'dataProductId',
      'asset',
      'version',
      'state',
      'dataProduct',
      'name',
      'description',
      'tags',
      'useCases',
      'types',
      'contractTerms',
      'domain',
      'partsOut',
      'workflows',
      'dataviewEnabled',
      'comments',
      'accessControl',
      'lastUpdatedAt',
      'isRestricted',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'asset': _params.asset,
      'version': _params.version,
      'state': _params.state,
      'data_product': _params.dataProduct,
      'name': _params.name,
      'description': _params.description,
      'tags': _params.tags,
      'use_cases': _params.useCases,
      'types': _params.types,
      'contract_terms': _params.contractTerms,
      'domain': _params.domain,
      'parts_out': _params.partsOut,
      'workflows': _params.workflows,
      'dataview_enabled': _params.dataviewEnabled,
      'comments': _params.comments,
      'access_control': _params.accessControl,
      'last_updated_at': _params.lastUpdatedAt,
      'is_restricted': _params.isRestricted,
    };

    const path = {
      'data_product_id': _params.dataProductId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'createDataProductDraft');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts',
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

  /**
   * Upload a contract document to the data product draft contract terms.
   *
   * Upload a contract document to the data product draft identified by draft_id. Use '-' for the `data_product_id` to
   * skip specifying the data product ID explicitly.
   *
   * - If the request object contains a "url" parameter, a referential document is created to store the provided url.
   * - If the request object does not contain a "url" parameter, an attachment document is created, and a signed url
   * will be returned in an "upload_url" parameter. The data product producer can upload the document using the provided
   * "upload_url". After the upload is completed, call "complete_contract_terms_document" for the given document needs
   * to be called to mark the upload as completed. After completion of the upload, "get_contract_terms_document" for the
   * given document returns a signed "url" parameter that can be used to download the attachment document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.type - Type of the contract document.
   * @param {string} params.name - Name of the contract document.
   * @param {string} [params.url] - URL that can be used to retrieve the contract document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTermsDocument>>}
   */
  public createDraftContractTermsDocument(
    params: DphV1.CreateDraftContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.ContractTermsDocument>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId', 'type', 'name'];
    const _validParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'type',
      'name',
      'url',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'url': _params.url,
    };

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDraftContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents',
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

  /**
   * Get a draft of an existing data product.
   *
   * Get a draft of an existing data product. Use '-' for the `data_product_id` to skip specifying the data product ID
   * explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDraft>>}
   */
  public getDataProductDraft(
    params: DphV1.GetDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductDraft>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId'];
    const _validParams = ['dataProductId', 'draftId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getDataProductDraft');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
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
   * Delete a data product draft identified by ID.
   *
   * Delete a data product draft identified by a valid ID. Use '-' for the `data_product_id` to skip specifying the data
   * product ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.EmptyObject>>}
   */
  public deleteDataProductDraft(
    params: DphV1.DeleteDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId'];
    const _validParams = ['dataProductId', 'draftId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDataProductDraft');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
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
   * Update the data product draft identified by ID.
   *
   * Use this API to update the properties of a data product draft identified by a valid ID. Use '-' for the
   * `data_product_id` to skip specifying the data product ID explicitly.<br/><br/>Specify patch operations using
   * http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the properties of a
   * data product<br/><br/>- Add/Remove parts from a data product (up to 20 parts)<br/><br/>- Add/Remove use cases from
   * a data product<br/><br/>- Update the data product state<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDraft>>}
   */
  public updateDataProductDraft(
    params: DphV1.UpdateDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductDraft>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'jsonPatchInstructions'];
    const _validParams = ['dataProductId', 'draftId', 'jsonPatchInstructions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDataProductDraft');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}',
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
   * Get a contract document.
   *
   * If a document has a completed attachment, the response contains the `url` which can be used to download the
   * attachment. If a document does not have a completed attachment, the response contains the `url` which was submitted
   * at document creation. If a document has an attachment that is incomplete, an error is returned to prompt the user
   * to upload the document file and complete it. Use '-' for the `data_product_id` to skip specifying the data product
   * ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.documentId - Document id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTermsDocument>>}
   */
  public getDraftContractTermsDocument(
    params: DphV1.GetDraftContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.ContractTermsDocument>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId'];
    const _validParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDraftContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
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
   * Delete a contract document.
   *
   * Delete an existing contract document.
   *
   * Contract documents can only be deleted for data product versions that are in DRAFT state. Use '-' for the
   * `data_product_id` to skip specifying the data product ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.documentId - Document id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.EmptyObject>>}
   */
  public deleteDraftContractTermsDocument(
    params: DphV1.DeleteDraftContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId'];
    const _validParams = ['dataProductId', 'draftId', 'contractTermsId', 'documentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDraftContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
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
   * Update a contract document.
   *
   * Use this API to update the properties of a contract document that is identified by a valid ID.
   *
   * Specify patch operations using http://jsonpatch.com/ syntax.
   *
   * Supported patch operations include:
   * - Update the url of document if it does not have an attachment.
   * - Update the type of the document.
   * <br/><br/>Contract terms documents can only be updated if the associated data product version is in DRAFT state.
   * Use '-' for the `data_product_id` to skip specifying the data product ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.documentId - Document id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTermsDocument>>}
   */
  public updateDraftContractTermsDocument(
    params: DphV1.UpdateDraftContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.ContractTermsDocument>> {
    const _params = { ...params };
    const _requiredParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'documentId',
      'jsonPatchInstructions',
    ];
    const _validParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'documentId',
      'jsonPatchInstructions',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDraftContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
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
   * Retrieve a data product contract terms identified by id.
   *
   * Retrieve a data product contract terms identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} [params.accept] - The type of the response: application/odcs+yaml or application/json.
   * @param {boolean} [params.includeContractDocuments] - Set to false to exclude external contract documents (e.g.,
   * Terms and Conditions URLs) from the response. By default, these are included.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<NodeJS.ReadableStream>>}
   */
  public getDataProductDraftContractTerms(
    params: DphV1.GetDataProductDraftContractTermsParams
  ): Promise<DphV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId'];
    const _validParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'accept',
      'includeContractDocuments',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_contract_documents': _params.includeContractDocuments,
    };

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDataProductDraftContractTerms'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a data product contract terms identified by id.
   *
   * Update a data product contract terms identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {AssetReference} [params.asset] - The reference schema for a asset in a container.
   * @param {string} [params.id] - ID of the contract terms.
   * @param {ContractTermsDocument[]} [params.documents] - Collection of contract terms documents.
   * @param {string} [params.errorMsg] - An error message, if existing, relating to the contract terms.
   * @param {Overview} [params.overview] - Overview details of a data contract.
   * @param {Description} [params.description] - Description details of a data contract.
   * @param {ContractTemplateOrganization[]} [params.organization] - List of sub domains to be added within a domain.
   * @param {Roles[]} [params.roles] - List of roles associated with the contract.
   * @param {Pricing} [params.price] - Represents the pricing details of the contract.
   * @param {ContractTemplateSLA[]} [params.sla] - Service Level Agreement details.
   * @param {ContractTemplateSupportAndCommunication[]} [params.supportAndCommunication] - Support and communication
   * details for the contract.
   * @param {ContractTemplateCustomProperty[]} [params.customProperties] - Custom properties that are not part of the
   * standard contract.
   * @param {ContractTest} [params.contractTest] - Contains the contract test status and related metadata.
   * @param {ContractSchema[]} [params.schema] - Schema details of the data asset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTerms>>}
   */
  public replaceDataProductDraftContractTerms(
    params: DphV1.ReplaceDataProductDraftContractTermsParams
  ): Promise<DphV1.Response<DphV1.ContractTerms>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId', 'contractTermsId'];
    const _validParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'asset',
      'id',
      'documents',
      'errorMsg',
      'overview',
      'description',
      'organization',
      'roles',
      'price',
      'sla',
      'supportAndCommunication',
      'customProperties',
      'contractTest',
      'schema',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'asset': _params.asset,
      'id': _params.id,
      'documents': _params.documents,
      'error_msg': _params.errorMsg,
      'overview': _params.overview,
      'description': _params.description,
      'organization': _params.organization,
      'roles': _params.roles,
      'price': _params.price,
      'sla': _params.sla,
      'support_and_communication': _params.supportAndCommunication,
      'custom_properties': _params.customProperties,
      'contract_test': _params.contractTest,
      'schema': _params.schema,
    };

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceDataProductDraftContractTerms'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
        method: 'PUT',
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

  /**
   * Update a contract terms property.
   *
   * Use this API to update the properties of a contract terms that is identified by a valid ID.
   *
   * Specify patch operations using http://jsonpatch.com/ syntax.
   *
   * Supported patch operations include:
   * - Update the contract terms properties.
   * <br/><br/>Contract terms can only be updated if the associated data product version is in DRAFT state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTerms>>}
   */
  public updateDataProductDraftContractTerms(
    params: DphV1.UpdateDataProductDraftContractTermsParams
  ): Promise<DphV1.Response<DphV1.ContractTerms>> {
    const _params = { ...params };
    const _requiredParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'jsonPatchInstructions',
    ];
    const _validParams = [
      'dataProductId',
      'draftId',
      'contractTermsId',
      'jsonPatchInstructions',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
      'contract_terms_id': _params.contractTermsId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDataProductDraftContractTerms'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}',
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
   * Publish a draft of an existing data product.
   *
   * Publish a draft of an existing data product. Use '-' for the `data_product_id` to skip specifying the data product
   * ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductRelease>>}
   */
  public publishDataProductDraft(
    params: DphV1.PublishDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductRelease>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'draftId'];
    const _validParams = ['dataProductId', 'draftId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'draft_id': _params.draftId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'publishDataProductDraft');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/publish',
        method: 'POST',
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
  /*************************
   * dataProductReleases
   ************************/

  /**
   * Get a release of an existing data product.
   *
   * Get a release of an existing data product. Use '-' for the `data_product_id` to skip specifying the data product ID
   * explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {boolean} [params.checkCallerApproval] - If the value is true, then it will be verfied whether the caller is
   * present in the data access request pre-approved user list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductRelease>>}
   */
  public getDataProductRelease(
    params: DphV1.GetDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductRelease>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'releaseId'];
    const _validParams = ['dataProductId', 'releaseId', 'checkCallerApproval', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'check_caller_approval': _params.checkCallerApproval,
    };

    const path = {
      'data_product_id': _params.dataProductId,
      'release_id': _params.releaseId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getDataProductRelease');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}',
        method: 'GET',
        qs: query,
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
   * Update the data product release identified by ID.
   *
   * Use this API to update the properties of a data product release identified by a valid ID. Use '-' for the
   * `data_product_id` to skip specifying the data product ID explicitly.<br/><br/>Specify patch operations using
   * http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the properties of a
   * data product<br/><br/>- Add/remove parts from a data product (up to 20 parts)<br/><br/>- Add/remove use cases from
   * a data product<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductRelease>>}
   */
  public updateDataProductRelease(
    params: DphV1.UpdateDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductRelease>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'releaseId', 'jsonPatchInstructions'];
    const _validParams = ['dataProductId', 'releaseId', 'jsonPatchInstructions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const path = {
      'data_product_id': _params.dataProductId,
      'release_id': _params.releaseId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDataProductRelease');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}',
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
   * Get a contract document.
   *
   * If the document has a completed attachment, the response contains the `url` to download the attachment.<br/><br/>
   * If the document does not have an attachment, the response contains the `url` which was submitted at document
   * creation.<br/><br/> If the document has an incomplete attachment, an error is returned to prompt the user to upload
   * the document file to complete the attachment. Use '-' for the `data_product_id` to skip specifying the data product
   * ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {string} params.contractTermsId - Contract terms id.
   * @param {string} params.documentId - Document id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.ContractTermsDocument>>}
   */
  public getReleaseContractTermsDocument(
    params: DphV1.GetReleaseContractTermsDocumentParams
  ): Promise<DphV1.Response<DphV1.ContractTermsDocument>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'releaseId', 'contractTermsId', 'documentId'];
    const _validParams = ['dataProductId', 'releaseId', 'contractTermsId', 'documentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'release_id': _params.releaseId,
      'contract_terms_id': _params.contractTermsId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getReleaseContractTermsDocument'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/contract_terms/{contract_terms_id}/documents/{document_id}',
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
   * Retrieve a list of data product releases.
   *
   * Retrieve a list of data product releases. Use '-' for the `data_product_id` to skip specifying the data product ID
   * explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} [params.assetContainerId] - Filter the list of data product releases by container id.
   * @param {string[]} [params.state] - Filter the list of data product versions by state. States are: available and
   * retired. Default is "available","retired".
   * @param {string} [params.version] - Filter the list of data product releases by version number.
   * @param {number} [params.limit] - Limit the number of data product releases in the results. The maximum is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductReleaseCollection>>}
   */
  public listDataProductReleases(
    params: DphV1.ListDataProductReleasesParams
  ): Promise<DphV1.Response<DphV1.DataProductReleaseCollection>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId'];
    const _validParams = [
      'dataProductId',
      'assetContainerId',
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
      'state': _params.state,
      'version': _params.version,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'data_product_id': _params.dataProductId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'listDataProductReleases');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/releases',
        method: 'GET',
        qs: query,
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
   * Retire a release of an existing data product.
   *
   * Retire a release of an existing data product. Use '-' for the `data_product_id` to skip specifying the data product
   * ID explicitly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {boolean} [params.revokeAccess] - Revoke's Access from all the Subscriptions of the Data Product. No user's
   * can able to see the subscribed assets anymore.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductRelease>>}
   */
  public retireDataProductRelease(
    params: DphV1.RetireDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductRelease>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'releaseId'];
    const _validParams = ['dataProductId', 'releaseId', 'revokeAccess', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'revoke_access': _params.revokeAccess,
    };

    const path = {
      'data_product_id': _params.dataProductId,
      'release_id': _params.releaseId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'retireDataProductRelease');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/retire',
        method: 'POST',
        qs: query,
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
  /*************************
   * dataProductContractTemplates
   ************************/

  /**
   * Retrieve a list of data product contract templates.
   *
   * Retrieve a list of data product contract templates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog is looked up by using the uid of the default data product catalog.
   * @param {string} [params.contractTemplateName] - Name of the data product contract template. If not supplied, the
   * data product templates within the catalog will returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductContractTemplateCollection>>}
   */
  public listDataProductContractTemplate(
    params?: DphV1.ListDataProductContractTemplateParams
  ): Promise<DphV1.Response<DphV1.DataProductContractTemplateCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['containerId', 'contractTemplateName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'container.id': _params.containerId,
      'contract_template.name': _params.contractTemplateName,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDataProductContractTemplate'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/contract_templates',
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
   * Create new data product contract template.
   *
   * Create new data product contract template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ContainerReference} params.container - Container reference.
   * @param {string} [params.id] - The identifier of the data product contract template.
   * @param {string} [params.name] - The name of the contract template.
   * @param {ErrorMessage} [params.error] - Contains the code and details.
   * @param {ContractTerms} [params.contractTerms] - Defines the complete structure of a contract terms.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog is looked up by using the uid of the default data product catalog.
   * @param {string} [params.contractTemplateName] - Name of the data product contract template. If not supplied, the
   * data product templates within the catalog will returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductContractTemplate>>}
   */
  public createContractTemplate(
    params: DphV1.CreateContractTemplateParams
  ): Promise<DphV1.Response<DphV1.DataProductContractTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['container'];
    const _validParams = [
      'container',
      'id',
      'name',
      'error',
      'contractTerms',
      'containerId',
      'contractTemplateName',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'container': _params.container,
      'id': _params.id,
      'name': _params.name,
      'error': _params.error,
      'contract_terms': _params.contractTerms,
    };

    const query = {
      'container.id': _params.containerId,
      'contract_template.name': _params.contractTemplateName,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'createContractTemplate');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/contract_templates',
        method: 'POST',
        body,
        qs: query,
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
   * Retrieve a data product contract template identified by id.
   *
   * Retrieve a data product contract template identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.contractTemplateId - Data Product Contract Template id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductContractTemplate>>}
   */
  public getContractTemplate(
    params: DphV1.GetContractTemplateParams
  ): Promise<DphV1.Response<DphV1.DataProductContractTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['contractTemplateId', 'containerId'];
    const _validParams = ['contractTemplateId', 'containerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'contract_template_id': _params.contractTemplateId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getContractTemplate');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/contract_templates/{contract_template_id}',
        method: 'GET',
        qs: query,
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
   * Delete a data product contract template identified by id.
   *
   * Delete a data product contract template identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.contractTemplateId - Data Product Contract Template id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.EmptyObject>>}
   */
  public deleteDataProductContractTemplate(
    params: DphV1.DeleteDataProductContractTemplateParams
  ): Promise<DphV1.Response<DphV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['contractTemplateId', 'containerId'];
    const _validParams = ['contractTemplateId', 'containerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'contract_template_id': _params.contractTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDataProductContractTemplate'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/contract_templates/{contract_template_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the data product contract template identified by ID.
   *
   * Use this API to update the properties of a data product contract template identified by a valid
   * ID.<br/><br/>Specify patch operations using http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations
   * include:<br/><br/>- Update the name of a data product contract template<br/><br/>- Update the contract terms of
   * data product contract template<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.contractTemplateId - Data Product Contract Template id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductContractTemplate>>}
   */
  public updateDataProductContractTemplate(
    params: DphV1.UpdateDataProductContractTemplateParams
  ): Promise<DphV1.Response<DphV1.DataProductContractTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['contractTemplateId', 'containerId', 'jsonPatchInstructions'];
    const _validParams = ['contractTemplateId', 'containerId', 'jsonPatchInstructions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'contract_template_id': _params.contractTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDataProductContractTemplate'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/contract_templates/{contract_template_id}',
        method: 'PATCH',
        body,
        qs: query,
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
  /*************************
   * dataProductDomains
   ************************/

  /**
   * Retrieve a list of data product domains.
   *
   * Retrieve a list of data product domains.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog is looked up by using the uid of the default data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDomainCollection>>}
   */
  public listDataProductDomains(
    params?: DphV1.ListDataProductDomainsParams
  ): Promise<DphV1.Response<DphV1.DataProductDomainCollection>> {
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

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'listDataProductDomains');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains',
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
   * Create new data product domain.
   *
   * Create new data product domain.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ContainerReference} params.container - Container reference.
   * @param {string} [params.trace] - The id to trace the failed domain creations.
   * @param {ErrorModelResource[]} [params.errors] - Set of errors on the sub domain creation.
   * @param {string} [params.name] - The name of the data product domain.
   * @param {string} [params.description] - The description of the data product domain.
   * @param {string} [params.id] - The identifier of the data product domain.
   * @param {MemberRolesSchema} [params.memberRoles] - Member roles of a corresponding asset.
   * @param {PropertiesSchema} [params.properties] - Properties of the corresponding asset.
   * @param {InitializeSubDomain[]} [params.subDomains] - List of sub domains to be added within a domain.
   * @param {string} [params.containerId] - Container ID of the data product catalog. If not supplied, the data product
   * catalog is looked up by using the uid of the default data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDomain>>}
   */
  public createDataProductDomain(
    params: DphV1.CreateDataProductDomainParams
  ): Promise<DphV1.Response<DphV1.DataProductDomain>> {
    const _params = { ...params };
    const _requiredParams = ['container'];
    const _validParams = [
      'container',
      'trace',
      'errors',
      'name',
      'description',
      'id',
      'memberRoles',
      'properties',
      'subDomains',
      'containerId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'container': _params.container,
      'trace': _params.trace,
      'errors': _params.errors,
      'name': _params.name,
      'description': _params.description,
      'id': _params.id,
      'member_roles': _params.memberRoles,
      'properties': _params.properties,
      'sub_domains': _params.subDomains,
    };

    const query = {
      'container.id': _params.containerId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'createDataProductDomain');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains',
        method: 'POST',
        body,
        qs: query,
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
   * Create data product subdomains for a specific domain identified by id.
   *
   * Create data product subdomains for a specific domain identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.domainId - Domain id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {string} [params.name] - The name of the data product subdomain.
   * @param {string} [params.id] - The identifier of the data product subdomain.
   * @param {string} [params.description] - The description of the data product subdomain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.InitializeSubDomain>>}
   */
  public createDataProductSubdomain(
    params: DphV1.CreateDataProductSubdomainParams
  ): Promise<DphV1.Response<DphV1.InitializeSubDomain>> {
    const _params = { ...params };
    const _requiredParams = ['domainId', 'containerId'];
    const _validParams = ['domainId', 'containerId', 'name', 'id', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'id': _params.id,
      'description': _params.description,
    };

    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'domain_id': _params.domainId,
    };

    const sdkHeaders = getSdkHeaders(
      DphV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDataProductSubdomain'
    );

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains/{domain_id}/subdomains',
        method: 'POST',
        body,
        qs: query,
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

  /**
   * Retrieve a data product domain or subdomain identified by id.
   *
   * Retrieve a data product domain or subdomain identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.domainId - Domain id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDomain>>}
   */
  public getDomain(
    params: DphV1.GetDomainParams
  ): Promise<DphV1.Response<DphV1.DataProductDomain>> {
    const _params = { ...params };
    const _requiredParams = ['domainId'];
    const _validParams = ['domainId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'domain_id': _params.domainId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getDomain');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains/{domain_id}',
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
   * Delete a data product domain identified by id.
   *
   * Delete a data product domain identified by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.domainId - Domain id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.EmptyObject>>}
   */
  public deleteDomain(
    params: DphV1.DeleteDomainParams
  ): Promise<DphV1.Response<DphV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['domainId'];
    const _validParams = ['domainId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'domain_id': _params.domainId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDomain');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains/{domain_id}',
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
   * Update the data product domain identified by ID.
   *
   * Use this API to update the properties of a data product domain identified by a valid ID.<br/><br/>Specify patch
   * operations using http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the
   * name of a data product domain<br/><br/>- Update the description of a data product domain<br/><br/>- Update the rov
   * of a data product domain<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.domainId - Domain id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductDomain>>}
   */
  public updateDataProductDomain(
    params: DphV1.UpdateDataProductDomainParams
  ): Promise<DphV1.Response<DphV1.DataProductDomain>> {
    const _params = { ...params };
    const _requiredParams = ['domainId', 'containerId', 'jsonPatchInstructions'];
    const _validParams = ['domainId', 'containerId', 'jsonPatchInstructions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchInstructions;
    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'domain_id': _params.domainId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDataProductDomain');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains/{domain_id}',
        method: 'PATCH',
        body,
        qs: query,
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
   * Retrieve all data products in a domain specified by id or any of it's subdomains.
   *
   * Retrieve all the data products tagged to the domain identified by id or any of it's subdomains.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.domainId - Domain id.
   * @param {string} params.containerId - Container ID of the data product catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersionCollection>>}
   */
  public getDataProductByDomain(
    params: DphV1.GetDataProductByDomainParams
  ): Promise<DphV1.Response<DphV1.DataProductVersionCollection>> {
    const _params = { ...params };
    const _requiredParams = ['domainId', 'containerId'];
    const _validParams = ['domainId', 'containerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'container.id': _params.containerId,
    };

    const path = {
      'domain_id': _params.domainId,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getDataProductByDomain');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/domains/{domain_id}/data_products',
        method: 'GET',
        qs: query,
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
  /*************************
   * bucketServices
   ************************/

  /**
   * Create a new Bucket.
   *
   * Use this API to create a new S3 Bucket on an AWS Hosting.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {boolean} params.isShared - Flag to specify whether the bucket is dedicated or shared.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.BucketResponse>>}
   */
  public createS3Bucket(
    params: DphV1.CreateS3BucketParams
  ): Promise<DphV1.Response<DphV1.BucketResponse>> {
    const _params = { ...params };
    const _requiredParams = ['isShared'];
    const _validParams = ['isShared', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'is_shared': _params.isShared,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'createS3Bucket');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/bucket',
        method: 'POST',
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
   * Validate the Bucket Existence.
   *
   * Use this API to validate the bucket existence on an AWS hosting.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketName - Name of the bucket to validate.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.BucketValidationResponse>>}
   */
  public getS3BucketValidation(
    params: DphV1.GetS3BucketValidationParams
  ): Promise<DphV1.Response<DphV1.BucketValidationResponse>> {
    const _params = { ...params };
    const _requiredParams = ['bucketName'];
    const _validParams = ['bucketName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_name': _params.bucketName,
    };

    const sdkHeaders = getSdkHeaders(DphV1.DEFAULT_SERVICE_NAME, 'v1', 'getS3BucketValidation');

    const parameters = {
      options: {
        url: '/data_product_exchange/v1/bucket/validate/{bucket_name}',
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
}

/*************************
 * interfaces
 ************************/

namespace DphV1 {
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
    /** Container ID of the data product catalog. If not supplied, the data product catalog is looked up by using
     *  the uid of the default data product catalog.
     */
    containerId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getServiceIdCredentials` operation. */
  export interface GetServiceIdCredentialsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `initialize` operation. */
  export interface InitializeParams {
    /** Container reference. */
    container?: ContainerReference;
    /** List of configuration options to (re-)initialize. */
    include?: InitializeConstants.Include[] | string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `initialize` operation. */
  export namespace InitializeConstants {
    /** Include */
    export enum Include {
      DELIVERY_METHODS = 'delivery_methods',
      DOMAINS_MULTI_INDUSTRY = 'domains_multi_industry',
      DATA_PRODUCT_SAMPLES = 'data_product_samples',
      WORKFLOWS = 'workflows',
      PROJECT = 'project',
      CATALOG_CONFIGURATIONS = 'catalog_configurations',
      FUNCTIONAL_ADMIN_USER_GROUP = 'functional_admin_user_group',
    }
  }

  /** Parameters for the `manageApiKeys` operation. */
  export interface ManageApiKeysParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDataAssetVisualization` operation. */
  export interface CreateDataAssetVisualizationParams {
    /** Data product hub asset and it's related part asset. */
    assets?: DataAssetRelationship[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `reinitiateDataAssetVisualization` operation. */
  export interface ReinitiateDataAssetVisualizationParams {
    /** Data product hub asset and it's related part asset. */
    assets?: DataAssetRelationship[];
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

  /** Parameters for the `createDataProduct` operation. */
  export interface CreateDataProductParams {
    /** Collection of data products drafts to add to data product. */
    drafts: DataProductDraftPrototype[];
    /** Limit the number of data products in the results. The maximum limit is 200. */
    limit?: number;
    /** Start token for pagination. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDataProduct` operation. */
  export interface GetDataProductParams {
    /** Data product ID. */
    dataProductId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `completeDraftContractTermsDocument` operation. */
  export interface CompleteDraftContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Document id. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProductDrafts` operation. */
  export interface ListDataProductDraftsParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Filter the list of data product drafts by container id. */
    assetContainerId?: string;
    /** Filter the list of data product drafts by version number. */
    version?: string;
    /** Limit the number of data product drafts in the results. The maximum limit is 200. */
    limit?: number;
    /** Start token for pagination. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDataProductDraft` operation. */
  export interface CreateDataProductDraftParams {
    /** Data product ID. */
    dataProductId: string;
    /** New asset input properties. */
    asset: AssetPrototype;
    /** The data product version number. */
    version?: string;
    /** The state of the data product version. If not specified, the data product version will be created in `draft`
     *  state.
     */
    state?: CreateDataProductDraftConstants.State | string;
    /** Data product identifier. */
    dataProduct?: DataProductIdentity;
    /** The name that refers to the new data product version. If this is a new data product, this value must be
     *  specified. If this is a new version of an existing data product, the name will default to the name of the
     *  previous data product version. A name can contain letters, numbers, understores, dashes, spaces or periods. A
     *  name must contain at least one non-space character.
     */
    name?: string;
    /** Description of the data product version. If this is a new version of an existing data product, the
     *  description will default to the description of the previous version of the data product.
     */
    description?: string;
    /** Tags on the data product. */
    tags?: string[];
    /** A list of use cases associated with the data product version. */
    useCases?: UseCase[];
    /** Types of parts on the data product. */
    types?: CreateDataProductDraftConstants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contractTerms?: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain?: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    partsOut?: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataviewEnabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    accessControl?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    lastUpdatedAt?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    isRestricted?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDataProductDraft` operation. */
  export namespace CreateDataProductDraftConstants {
    /** The state of the data product version. If not specified, the data product version will be created in `draft` state. */
    export enum State {
      DRAFT = 'draft',
      AVAILABLE = 'available',
      RETIRED = 'retired',
    }
    /** Types */
    export enum Types {
      DATA = 'data',
      CODE = 'code',
    }
  }

  /** Parameters for the `createDraftContractTermsDocument` operation. */
  export interface CreateDraftContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Type of the contract document. */
    type: CreateDraftContractTermsDocumentConstants.Type | string;
    /** Name of the contract document. */
    name: string;
    /** URL that can be used to retrieve the contract document. */
    url?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDraftContractTermsDocument` operation. */
  export namespace CreateDraftContractTermsDocumentConstants {
    /** Type of the contract document. */
    export enum Type {
      TERMS_AND_CONDITIONS = 'terms_and_conditions',
      SLA = 'sla',
    }
  }

  /** Parameters for the `getDataProductDraft` operation. */
  export interface GetDataProductDraftParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDataProductDraft` operation. */
  export interface DeleteDataProductDraftParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductDraft` operation. */
  export interface UpdateDataProductDraftParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDraftContractTermsDocument` operation. */
  export interface GetDraftContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Document id. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDraftContractTermsDocument` operation. */
  export interface DeleteDraftContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Document id. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDraftContractTermsDocument` operation. */
  export interface UpdateDraftContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Document id. */
    documentId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDataProductDraftContractTerms` operation. */
  export interface GetDataProductDraftContractTermsParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** The type of the response: application/odcs+yaml or application/json. */
    accept?: GetDataProductDraftContractTermsConstants.Accept | string;
    /** Set to false to exclude external contract documents (e.g., Terms and Conditions URLs) from the response. By
     *  default, these are included.
     */
    includeContractDocuments?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getDataProductDraftContractTerms` operation. */
  export namespace GetDataProductDraftContractTermsConstants {
    /** The type of the response: application/odcs+yaml or application/json. */
    export enum Accept {
      APPLICATION_ODCS_YAML = 'application/odcs+yaml',
      APPLICATION_JSON = 'application/json',
    }
  }

  /** Parameters for the `replaceDataProductDraftContractTerms` operation. */
  export interface ReplaceDataProductDraftContractTermsParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** The reference schema for a asset in a container. */
    asset?: AssetReference;
    /** ID of the contract terms. */
    id?: string;
    /** Collection of contract terms documents. */
    documents?: ContractTermsDocument[];
    /** An error message, if existing, relating to the contract terms. */
    errorMsg?: string;
    /** Overview details of a data contract. */
    overview?: Overview;
    /** Description details of a data contract. */
    description?: Description;
    /** List of sub domains to be added within a domain. */
    organization?: ContractTemplateOrganization[];
    /** List of roles associated with the contract. */
    roles?: Roles[];
    /** Represents the pricing details of the contract. */
    price?: Pricing;
    /** Service Level Agreement details. */
    sla?: ContractTemplateSLA[];
    /** Support and communication details for the contract. */
    supportAndCommunication?: ContractTemplateSupportAndCommunication[];
    /** Custom properties that are not part of the standard contract. */
    customProperties?: ContractTemplateCustomProperty[];
    /** Contains the contract test status and related metadata. */
    contractTest?: ContractTest;
    /** Schema details of the data asset. */
    schema?: ContractSchema[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductDraftContractTerms` operation. */
  export interface UpdateDataProductDraftContractTermsParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `publishDataProductDraft` operation. */
  export interface PublishDataProductDraftParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product draft id. */
    draftId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDataProductRelease` operation. */
  export interface GetDataProductReleaseParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product release id. */
    releaseId: string;
    /** If the value is true, then it will be verfied whether the caller is present in the data access request
     *  pre-approved user list.
     */
    checkCallerApproval?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductRelease` operation. */
  export interface UpdateDataProductReleaseParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product release id. */
    releaseId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReleaseContractTermsDocument` operation. */
  export interface GetReleaseContractTermsDocumentParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product release id. */
    releaseId: string;
    /** Contract terms id. */
    contractTermsId: string;
    /** Document id. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProductReleases` operation. */
  export interface ListDataProductReleasesParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Filter the list of data product releases by container id. */
    assetContainerId?: string;
    /** Filter the list of data product versions by state. States are: available and retired. Default is
     *  "available","retired".
     */
    state?: ListDataProductReleasesConstants.State[] | string[];
    /** Filter the list of data product releases by version number. */
    version?: string;
    /** Limit the number of data product releases in the results. The maximum is 200. */
    limit?: number;
    /** Start token for pagination. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listDataProductReleases` operation. */
  export namespace ListDataProductReleasesConstants {
    /** Filter the list of data product versions by state. States are: available and retired. Default is "available","retired". */
    export enum State {
      AVAILABLE = 'available',
      RETIRED = 'retired',
    }
  }

  /** Parameters for the `retireDataProductRelease` operation. */
  export interface RetireDataProductReleaseParams {
    /** Data product ID. Use '-' to skip specifying the data product ID explicitly. */
    dataProductId: string;
    /** Data product release id. */
    releaseId: string;
    /** Revoke's Access from all the Subscriptions of the Data Product. No user's can able to see the subscribed
     *  assets anymore.
     */
    revokeAccess?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProductContractTemplate` operation. */
  export interface ListDataProductContractTemplateParams {
    /** Container ID of the data product catalog. If not supplied, the data product catalog is looked up by using
     *  the uid of the default data product catalog.
     */
    containerId?: string;
    /** Name of the data product contract template. If not supplied, the data product templates within the catalog
     *  will returned.
     */
    contractTemplateName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createContractTemplate` operation. */
  export interface CreateContractTemplateParams {
    /** Container reference. */
    container: ContainerReference;
    /** The identifier of the data product contract template. */
    id?: string;
    /** The name of the contract template. */
    name?: string;
    /** Contains the code and details. */
    error?: ErrorMessage;
    /** Defines the complete structure of a contract terms. */
    contractTerms?: ContractTerms;
    /** Container ID of the data product catalog. If not supplied, the data product catalog is looked up by using
     *  the uid of the default data product catalog.
     */
    containerId?: string;
    /** Name of the data product contract template. If not supplied, the data product templates within the catalog
     *  will returned.
     */
    contractTemplateName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getContractTemplate` operation. */
  export interface GetContractTemplateParams {
    /** Data Product Contract Template id. */
    contractTemplateId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDataProductContractTemplate` operation. */
  export interface DeleteDataProductContractTemplateParams {
    /** Data Product Contract Template id. */
    contractTemplateId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductContractTemplate` operation. */
  export interface UpdateDataProductContractTemplateParams {
    /** Data Product Contract Template id. */
    contractTemplateId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDataProductDomains` operation. */
  export interface ListDataProductDomainsParams {
    /** Container ID of the data product catalog. If not supplied, the data product catalog is looked up by using
     *  the uid of the default data product catalog.
     */
    containerId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDataProductDomain` operation. */
  export interface CreateDataProductDomainParams {
    /** Container reference. */
    container: ContainerReference;
    /** The id to trace the failed domain creations. */
    trace?: string;
    /** Set of errors on the sub domain creation. */
    errors?: ErrorModelResource[];
    /** The name of the data product domain. */
    name?: string;
    /** The description of the data product domain. */
    description?: string;
    /** The identifier of the data product domain. */
    id?: string;
    /** Member roles of a corresponding asset. */
    memberRoles?: MemberRolesSchema;
    /** Properties of the corresponding asset. */
    properties?: PropertiesSchema;
    /** List of sub domains to be added within a domain. */
    subDomains?: InitializeSubDomain[];
    /** Container ID of the data product catalog. If not supplied, the data product catalog is looked up by using
     *  the uid of the default data product catalog.
     */
    containerId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDataProductSubdomain` operation. */
  export interface CreateDataProductSubdomainParams {
    /** Domain id. */
    domainId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    /** The name of the data product subdomain. */
    name?: string;
    /** The identifier of the data product subdomain. */
    id?: string;
    /** The description of the data product subdomain. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDomain` operation. */
  export interface GetDomainParams {
    /** Domain id. */
    domainId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDomain` operation. */
  export interface DeleteDomainParams {
    /** Domain id. */
    domainId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDataProductDomain` operation. */
  export interface UpdateDataProductDomainParams {
    /** Domain id. */
    domainId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    /** A set of patch operations as defined in RFC 6902. See http://jsonpatch.com/ for more information. */
    jsonPatchInstructions: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDataProductByDomain` operation. */
  export interface GetDataProductByDomainParams {
    /** Domain id. */
    domainId: string;
    /** Container ID of the data product catalog. */
    containerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createS3Bucket` operation. */
  export interface CreateS3BucketParams {
    /** Flag to specify whether the bucket is dedicated or shared. */
    isShared: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getS3BucketValidation` operation. */
  export interface GetS3BucketValidationParams {
    /** Name of the bucket to validate. */
    bucketName: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Access control object.
   */
  export interface AssetListAccessControl {
    /** The owner of the asset. */
    owner?: string;
  }

  /**
   * The asset represented in this part.
   */
  export interface AssetPartReference {
    /** The unique identifier of the asset. */
    id?: string;
    /** Asset name. */
    name?: string;
    /** Container reference. */
    container: ContainerReference;
    /** The type of the asset. */
    type?: string;
  }

  /**
   * New asset input properties.
   */
  export interface AssetPrototype {
    /** The unique identifier of the asset. */
    id?: string;
    /** The identity schema for a IBM knowledge catalog container (catalog/project/space). */
    container: ContainerIdentity;
  }

  /**
   * The reference schema for a asset in a container.
   */
  export interface AssetReference {
    /** The unique identifier of the asset. */
    id?: string;
    /** Asset name. */
    name?: string;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * BucketResponse to hold the Bucket response data.
   */
  export interface BucketResponse {
    /** Name of the Bucket. */
    bucket_name?: string;
    /** Location of the Bucket stored. */
    bucket_location?: string;
    /** Role ARN. */
    role_arn?: string;
    /** Bucket Type. */
    bucket_type?: string;
    /** Is Shared Bucket. */
    shared?: boolean;
  }

  /**
   * BucketValidationResponse to hold the bucket validation data.
   */
  export interface BucketValidationResponse {
    /** Flag of bucket existence. */
    bucket_exists?: boolean;
  }

  /**
   * The identity schema for a IBM knowledge catalog container (catalog/project/space).
   */
  export interface ContainerIdentity {
    /** Container identifier. */
    id: string;
  }

  /**
   * Container reference.
   */
  export interface ContainerReference {
    /** Container identifier. */
    id: string;
    /** Container type. */
    type: ContainerReference.Constants.Type | string;
  }
  export namespace ContainerReference {
    export namespace Constants {
      /** Container type. */
      export enum Type {
        CATALOG = 'catalog',
        PROJECT = 'project',
      }
    }
  }

  /**
   * Schema definition of the data asset.
   */
  export interface ContractSchema {
    /** Name of the schema or data asset part. */
    name?: string;
    /** Description of the schema. */
    description?: string;
    /** MIME type or physical type. */
    physical_type?: string;
    /** List of properties. */
    properties?: ContractSchemaProperty[];
  }

  /**
   * Defines a property inside the schema.
   */
  export interface ContractSchemaProperty {
    /** Property name. */
    name: string;
    /** Detailed type definition of a schema property. */
    type?: ContractSchemaPropertyType;
  }

  /**
   * Detailed type definition of a schema property.
   */
  export interface ContractSchemaPropertyType {
    /** Type of the field. */
    type?: string;
    /** Length of the field as string. */
    length?: string;
    /** Scale of the field as string. */
    scale?: string;
    /** Is field nullable? true/false as string. */
    nullable?: string;
    /** Is field signed? true/false as string. */
    signed?: string;
    /** Native type of the field. */
    native_type?: string;
  }

  /**
   * Represents a custom property within the contract.
   */
  export interface ContractTemplateCustomProperty {
    /** The name of the key. Names should be in camel case–the same as if they were permanent properties in the
     *  contract.
     */
    key: string;
    /** The value of the key. */
    value: string;
  }

  /**
   * Represents a user and their role in the contract.
   */
  export interface ContractTemplateOrganization {
    /** The user ID associated with the contract. */
    user_id: string;
    /** The role of the user in the contract. */
    role: string;
  }

  /**
   * Represents the SLA details of the contract.
   */
  export interface ContractTemplateSLA {
    /** The default SLA element. */
    default_element?: string;
    /** List of SLA properties and their values. */
    properties?: ContractTemplateSLAProperty[];
  }

  /**
   * Represents an SLA property and its value.
   */
  export interface ContractTemplateSLAProperty {
    /** The SLA property name. */
    property: string;
    /** The value associated with the SLA property. */
    value: string;
  }

  /**
   * Represents a support and communication channel for the contract.
   */
  export interface ContractTemplateSupportAndCommunication {
    /** The communication channel. */
    channel: string;
    /** The URL associated with the communication channel. */
    url: string;
  }

  /**
   * Defines the complete structure of a contract terms.
   */
  export interface ContractTerms {
    /** The reference schema for a asset in a container. */
    asset?: AssetReference;
    /** ID of the contract terms. */
    id?: string;
    /** Collection of contract terms documents. */
    documents?: ContractTermsDocument[];
    /** An error message, if existing, relating to the contract terms. */
    error_msg?: string;
    /** Overview details of a data contract. */
    overview?: Overview;
    /** Description details of a data contract. */
    description?: Description;
    /** List of sub domains to be added within a domain. */
    organization?: ContractTemplateOrganization[];
    /** List of roles associated with the contract. */
    roles?: Roles[];
    /** Represents the pricing details of the contract. */
    price?: Pricing;
    /** Service Level Agreement details. */
    sla?: ContractTemplateSLA[];
    /** Support and communication details for the contract. */
    support_and_communication?: ContractTemplateSupportAndCommunication[];
    /** Custom properties that are not part of the standard contract. */
    custom_properties?: ContractTemplateCustomProperty[];
    /** Contains the contract test status and related metadata. */
    contract_test?: ContractTest;
    /** Schema details of the data asset. */
    schema?: ContractSchema[];
  }

  /**
   * Standard contract terms document, which is used for get and list contract terms responses.
   */
  export interface ContractTermsDocument {
    /** URL that can be used to retrieve the contract document. */
    url?: string;
    /** Type of the contract document. */
    type: ContractTermsDocument.Constants.Type | string;
    /** Name of the contract document. */
    name: string;
    /** Id uniquely identifying this document within the contract terms instance. */
    id: string;
    /** Attachment associated witht the document. */
    attachment?: ContractTermsDocumentAttachment;
    /** URL which can be used to upload document file. */
    upload_url?: string;
  }
  export namespace ContractTermsDocument {
    export namespace Constants {
      /** Type of the contract document. */
      export enum Type {
        TERMS_AND_CONDITIONS = 'terms_and_conditions',
        SLA = 'sla',
      }
    }
  }

  /**
   * Attachment associated witht the document.
   */
  export interface ContractTermsDocumentAttachment {
    /** Id representing the corresponding attachment. */
    id?: string;
  }

  /**
   * List of links to sources that provide more details on the dataset.
   */
  export interface ContractTermsMoreInfo {
    /** Type of Source Link. */
    type: string;
    /** Link to source that provide more details on the dataset. */
    url: string;
  }

  /**
   * Contains the contract test status and related metadata.
   */
  export interface ContractTest {
    /** Status of the contract test (pass or fail). */
    status: ContractTest.Constants.Status | string;
    /** Timestamp of when the contract was last tested. */
    last_tested_time: string;
    /** Optional message or details about the contract test. */
    message?: string;
  }
  export namespace ContractTest {
    export namespace Constants {
      /** Status of the contract test (pass or fail). */
      export enum Status {
        PASS = 'pass',
        FAIL = 'fail',
      }
    }
  }

  /**
   * Data members for visualization process.
   */
  export interface DataAssetRelationship {
    /** Data members for visualization. */
    visualization?: Visualization;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
    /** The reference schema for a asset in a container. */
    related_asset: AssetReference;
    /** Contains the code and details. */
    error?: ErrorMessage;
  }

  /**
   * Data relationships for the visualization process response.
   */
  export interface DataAssetVisualizationRes {
    /** Data asset Ids and their related asset Ids. */
    results?: DataAssetRelationship[];
  }

  /**
   * Data Product.
   */
  export interface DataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
    /** Data product name. */
    name?: string;
    /** Summary of Data Product Version object. */
    latest_release?: DataProductVersionSummary;
    /** List of draft summaries of this data product. */
    drafts?: DataProductVersionSummary[];
  }

  /**
   * A collection of data product summaries.
   */
  export interface DataProductCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Indicates the total number of results returned. */
    total_results?: number;
    /** Collection of data product summaries. */
    data_products: DataProductSummary[];
  }

  /**
   * Defines the complete structure of a contract template.
   */
  export interface DataProductContractTemplate {
    /** Container reference. */
    container: ContainerReference;
    /** The identifier of the data product contract template. */
    id?: string;
    /** The name of the contract template. */
    name?: string;
    /** Contains the code and details. */
    error?: ErrorMessage;
    /** Defines the complete structure of a contract terms. */
    contract_terms?: ContractTerms;
  }

  /**
   * A collection of data product contract templates.
   */
  export interface DataProductContractTemplateCollection {
    /** Collection of data product contract templates. */
    contract_templates: DataProductContractTemplate[];
  }

  /**
   * A custom workflow definition to be used to create a workflow to approve a data product subscription.
   */
  export interface DataProductCustomWorkflowDefinition {
    /** ID of a workflow definition. */
    id?: string;
  }

  /**
   * The data product domain.
   */
  export interface DataProductDomain {
    /** Container reference. */
    container: ContainerReference;
    /** The id to trace the failed domain creations. */
    trace?: string;
    /** Set of errors on the sub domain creation. */
    errors?: ErrorModelResource[];
    /** The name of the data product domain. */
    name?: string;
    /** The description of the data product domain. */
    description?: string;
    /** The identifier of the data product domain. */
    id?: string;
    /** Member roles of a corresponding asset. */
    member_roles?: MemberRolesSchema;
    /** Properties of the corresponding asset. */
    properties?: PropertiesSchema;
    /** List of sub domains to be added within a domain. */
    sub_domains?: InitializeSubDomain[];
  }

  /**
   * A collection of data product domains.
   */
  export interface DataProductDomainCollection {
    /** Collection of data product domains. */
    domains: DataProductDomain[];
  }

  /**
   * Data Product version draft.
   */
  export interface DataProductDraft {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductDraft.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductDraftDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductDraft.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
    /** The user who published this data product version. */
    published_by?: string;
    /** The time when this data product version was published. */
    published_at?: string;
    /** The creator of this data product version. */
    created_by: string;
    /** The time when this data product version was created. */
    created_at: string;
    /** Metadata properties on data products. */
    properties?: JsonObject;
    /** Errors encountered during the visualization creation process. */
    visualization_errors?: DataAssetRelationship[];
  }
  export namespace DataProductDraft {
    export namespace Constants {
      /** The state of the data product version. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * A collection of data product draft summaries.
   */
  export interface DataProductDraftCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Indicates the total number of results returned. */
    total_results?: number;
    /** Collection of data product drafts. */
    drafts: DataProductDraftSummary[];
  }

  /**
   * Data product reference.
   */
  export interface DataProductDraftDataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * New data product version input properties.
   */
  export interface DataProductDraftPrototype {
    /** The data product version number. */
    version?: string;
    /** The state of the data product version. If not specified, the data product version will be created in `draft`
     *  state.
     */
    state?: DataProductDraftPrototype.Constants.State | string;
    /** Data product identifier. */
    data_product?: DataProductIdentity;
    /** The name that refers to the new data product version. If this is a new data product, this value must be
     *  specified. If this is a new version of an existing data product, the name will default to the name of the
     *  previous data product version. A name can contain letters, numbers, understores, dashes, spaces or periods. A
     *  name must contain at least one non-space character.
     */
    name?: string;
    /** Description of the data product version. If this is a new version of an existing data product, the
     *  description will default to the description of the previous version of the data product.
     */
    description?: string;
    /** Tags on the data product. */
    tags?: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types?: DataProductDraftPrototype.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms?: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain?: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out?: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted?: boolean;
    /** New asset input properties. */
    asset: AssetPrototype;
  }
  export namespace DataProductDraftPrototype {
    export namespace Constants {
      /** The state of the data product version. If not specified, the data product version will be created in `draft` state. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * Summary of Data Product Version object.
   */
  export interface DataProductDraftSummary {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductDraftSummary.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductDraftSummaryDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductDraftSummary.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
  }
  export namespace DataProductDraftSummary {
    export namespace Constants {
      /** The state of the data product version. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * Data product reference.
   */
  export interface DataProductDraftSummaryDataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * A data product draft version object.
   */
  export interface DataProductDraftVersionRelease {
    /** ID of a draft version of data product. */
    id?: string;
  }

  /**
   * Data product identifier.
   */
  export interface DataProductIdentity {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
  }

  /**
   * The approval workflows associated with the data product version.
   */
  export interface DataProductOrderAccessRequest {
    /** The workflow approvers associated with the data product version. */
    task_assignee_users?: string[];
    /** The list of users or groups whose request will get pre-approved associated with the data product version. */
    pre_approved_users?: string[];
    /** A custom workflow definition to be used to create a workflow to approve a data product subscription. */
    custom_workflow_definition?: DataProductCustomWorkflowDefinition;
  }

  /**
   * Data Product Part.
   */
  export interface DataProductPart {
    /** The asset represented in this part. */
    asset: AssetPartReference;
    /** Delivery methods describing the delivery options available for this part. */
    delivery_methods?: DeliveryMethod[];
  }

  /**
   * Data Product version release.
   */
  export interface DataProductRelease {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductRelease.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductReleaseDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductRelease.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
    /** The user who published this data product version. */
    published_by?: string;
    /** The time when this data product version was published. */
    published_at?: string;
    /** The creator of this data product version. */
    created_by: string;
    /** The time when this data product version was created. */
    created_at: string;
    /** Metadata properties on data products. */
    properties?: JsonObject;
    /** Errors encountered during the visualization creation process. */
    visualization_errors?: DataAssetRelationship[];
  }
  export namespace DataProductRelease {
    export namespace Constants {
      /** The state of the data product version. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * A collection of data product release summaries.
   */
  export interface DataProductReleaseCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Indicates the total number of results returned. */
    total_results?: number;
    /** Collection of data product releases. */
    releases: DataProductReleaseSummary[];
  }

  /**
   * Data product reference.
   */
  export interface DataProductReleaseDataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * Summary of Data Product Version object.
   */
  export interface DataProductReleaseSummary {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductReleaseSummary.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductReleaseSummaryDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags?: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductReleaseSummary.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain?: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out?: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
  }
  export namespace DataProductReleaseSummary {
    export namespace Constants {
      /** The state of the data product version. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * Data product reference.
   */
  export interface DataProductReleaseSummaryDataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * Data Product Summary.
   */
  export interface DataProductSummary {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
    /** Data product name. */
    name?: string;
  }

  /**
   * A collection of data product version summaries.
   */
  export interface DataProductVersionCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Indicates the total number of results returned. */
    total_results?: number;
    /** Collection of data product versions. */
    data_product_versions: DataProductVersionSummary[];
  }

  /**
   * Summary of Data Product Version object.
   */
  export interface DataProductVersionSummary {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductVersionSummary.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductVersionSummaryDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags?: string[];
    /** A list of use cases associated with the data product version. */
    use_cases?: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductVersionSummary.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: ContractTerms[];
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain?: Domain;
    /** The outgoing parts of this data product version to be delivered to consumers. If this is the first version
     *  of a data product, this field defaults to an empty list. If this is a new version of an existing data product,
     *  the data product parts will default to the parts list from the previous version of the data product.
     */
    parts_out?: DataProductPart[];
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Indicates whether the dataView has enabled for data product. */
    dataview_enabled?: boolean;
    /** Comments by a producer that are provided either at the time of data product version creation or retiring. */
    comments?: string;
    /** Access control object. */
    access_control?: AssetListAccessControl;
    /** Timestamp of last asset update. */
    last_updated_at?: string;
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    /** The reference schema for a asset in a container. */
    asset: AssetReference;
  }
  export namespace DataProductVersionSummary {
    export namespace Constants {
      /** The state of the data product version. */
      export enum State {
        DRAFT = 'draft',
        AVAILABLE = 'available',
        RETIRED = 'retired',
      }
      /** Types of parts on the data product. */
      export enum Types {
        DATA = 'data',
        CODE = 'code',
      }
    }
  }

  /**
   * Data product reference.
   */
  export interface DataProductVersionSummaryDataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * The workflows associated with the data product version.
   */
  export interface DataProductWorkflows {
    /** The approval workflows associated with the data product version. */
    order_access_request?: DataProductOrderAccessRequest;
  }

  /**
   * DeliveryMethod.
   */
  export interface DeliveryMethod {
    /** The ID of the delivery method. */
    id: string;
    /** Container reference. */
    container: ContainerReference;
    /** The propertiess of the delivery method. */
    getproperties?: DeliveryMethodPropertiesModel;
  }

  /**
   * The propertiess of the delivery method.
   */
  export interface DeliveryMethodPropertiesModel {
    /** Parameters for delivery that are set by a data product producer. */
    producer_input?: ProducerInputModel;
  }

  /**
   * Description details of a data contract.
   */
  export interface Description {
    /** Intended purpose for the provided data. */
    purpose?: string;
    /** Technical, compliance, and legal limitations for data use. */
    limitations?: string;
    /** Recommended usage of the data. */
    usage?: string;
    /** List of links to sources that provide more details on the dataset. */
    more_info?: ContractTermsMoreInfo[];
    /** Custom properties that are not part of the standard. */
    custom_properties?: string;
  }

  /**
   * Domain that the data product version belongs to. If this is the first version of a data product, this field is
   * required. If this is a new version of an existing data product, the domain will default to the domain of the
   * previous version of the data product.
   */
  export interface Domain {
    /** The ID of the domain. */
    id: string;
    /** The display name of the domain. */
    name?: string;
    /** Container reference. */
    container?: ContainerReference;
  }

  /**
   * Engine details as defined by the data product producer.
   */
  export interface EngineDetailsModel {
    /** The name of the engine defined by the data product producer. */
    display_name?: string;
    /** The id of the engine defined by the data product producer. */
    engine_id?: string;
    /** The port of the engine defined by the data product producer. */
    engine_port?: string;
    /** The host of the engine defined by the data product producer. */
    engine_host?: string;
    /** The list of associated catalogs. */
    associated_catalogs?: string[];
  }

  /**
   * Detailed error information.
   */
  export interface ErrorExtraResource {
    /** Error id. */
    id?: string;
    /** Timestamp of the error. */
    timestamp?: string;
    /** Environment where the error occurred. */
    environment_name?: string;
    /** Http status code. */
    http_status?: number;
    /** Source cluster of the error. */
    source_cluster?: number;
    /** Source component of the error. */
    source_component?: number;
    /** Transaction id of the request. */
    transaction_id?: number;
  }

  /**
   * Contains the code and details.
   */
  export interface ErrorMessage {
    /** The error code. */
    code: string;
    /** The error details. */
    message: string;
  }

  /**
   * Detailed error information.
   */
  export interface ErrorModelResource {
    /** Error code. */
    code: ErrorModelResource.Constants.Code | string;
    /** Error message. */
    message?: string;
    /** Detailed error information. */
    extra?: ErrorExtraResource;
    /** More info message. */
    more_info?: string;
  }
  export namespace ErrorModelResource {
    export namespace Constants {
      /** Error code. */
      export enum Code {
        REQUEST_BODY_ERROR = 'request_body_error',
        MISSING_REQUIRED_VALUE = 'missing_required_value',
        INVALID_PARAMETER = 'invalid_parameter',
        DOES_NOT_EXIST = 'does_not_exist',
        ALREADY_EXISTS = 'already_exists',
        NOT_AUTHENTICATED = 'not_authenticated',
        NOT_AUTHORIZED = 'not_authorized',
        FORBIDDEN = 'forbidden',
        CONFLICT = 'conflict',
        CREATE_ERROR = 'create_error',
        FETCH_ERROR = 'fetch_error',
        UPDATE_ERROR = 'update_error',
        DELETE_ERROR = 'delete_error',
        PATCH_ERROR = 'patch_error',
        DATA_ERROR = 'data_error',
        DATABASE_ERROR = 'database_error',
        DATABASE_QUERY_ERROR = 'database_query_error',
        CONSTRAINT_VIOLATION = 'constraint_violation',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        TOO_MANY_REQUESTS = 'too_many_requests',
        DEPENDENT_SERVICE_ERROR = 'dependent_service_error',
        CONFIGURATION_ERROR = 'configuration_error',
        UNEXPECTED_EXCEPTION = 'unexpected_exception',
        GOVERNANCE_POLICY_DENIAL = 'governance_policy_denial',
        DATABASE_USAGE_LIMITS = 'database_usage_limits',
        INACTIVE_USER = 'inactive_user',
        ENTITLEMENT_ENFORCEMENT = 'entitlement_enforcement',
        DELETED = 'deleted',
        NOT_IMPLEMENTED = 'not_implemented',
        FEATURE_NOT_ENABLED = 'feature_not_enabled',
        MISSING_ASSET_DETAILS = 'missing_asset_details',
      }
    }
  }

  /**
   * First page in the collection.
   */
  export interface FirstPage {
    /** Link to the first page in the collection. */
    href: string;
  }

  /**
   * Resource defining initialization parameters.
   */
  export interface InitializeResource {
    /** Container reference. */
    container?: ContainerReference;
    /** Link to monitor the status of the initialize operation. */
    href?: string;
    /** Status of the initialize operation. */
    status: InitializeResource.Constants.Status | string;
    /** The id to trace the failed initialization operation. */
    trace?: string;
    /** Set of errors on the latest initialization request. */
    errors?: ErrorModelResource[];
    /** Start time of the last initialization. */
    last_started_at?: string;
    /** End time of the last initialization. */
    last_finished_at?: string;
    /** Initialized options. */
    initialized_options?: InitializedOption[];
    /** Resource defining provided workflow definitions. */
    workflows?: ProvidedCatalogWorkflows;
  }
  export namespace InitializeResource {
    export namespace Constants {
      /** Status of the initialize operation. */
      export enum Status {
        NOT_STARTED = 'not_started',
        IN_PROGRESS = 'in_progress',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
      }
    }
  }

  /**
   * The subdomain for a data product domain.
   */
  export interface InitializeSubDomain {
    /** The name of the data product subdomain. */
    name?: string;
    /** The identifier of the data product subdomain. */
    id?: string;
    /** The description of the data product subdomain. */
    description?: string;
  }

  /**
   * List of options successfully initialized.
   */
  export interface InitializedOption {
    /** The name of the option. */
    name?: string;
    /** The version of the option. */
    version?: number;
  }

  /**
   * This model represents an individual patch operation to be performed on a JSON document, as defined by RFC 6902.
   */
  export interface JsonPatchOperation {
    /** The operation to be performed. */
    op: JsonPatchOperation.Constants.Op | string;
    /** The JSON Pointer that identifies the field that is the target of the operation. */
    path: string;
    /** The JSON Pointer that identifies the field that is the source of the operation. */
    from?: string;
    /** The value to be used within the operation. */
    value?: any;
  }
  export namespace JsonPatchOperation {
    export namespace Constants {
      /** The operation to be performed. */
      export enum Op {
        ADD = 'add',
        REMOVE = 'remove',
        REPLACE = 'replace',
        MOVE = 'move',
        COPY = 'copy',
        TEST = 'test',
      }
    }
  }

  /**
   * Member roles of a corresponding asset.
   */
  export interface MemberRolesSchema {
    /** User id. */
    user_iam_id?: string;
    /** Roles of the given user. */
    roles?: string[];
  }

  /**
   * Next page in the collection.
   */
  export interface NextPage {
    /** Link to the next page in the collection. */
    href: string;
    /** Start token for pagination to the next page in the collection. */
    start: string;
  }

  /**
   * Overview details of a data contract.
   */
  export interface Overview {
    /** The API version of the contract. */
    api_version?: string;
    /** The kind of contract. */
    kind?: string;
    /** The name of the contract. */
    name?: string;
    /** The version of the contract. */
    version: string;
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain: Domain;
    /** Additional information links about the contract. */
    more_info?: string;
  }

  /**
   * Represents the pricing details of the contract.
   */
  export interface Pricing {
    /** The amount for the contract pricing. */
    amount?: string;
    /** The currency for the pricing amount. */
    currency?: string;
    /** The unit associated with the pricing. */
    unit?: string;
  }

  /**
   * Parameters for delivery that are set by a data product producer.
   */
  export interface ProducerInputModel {
    /** Engine details as defined by the data product producer. */
    engine_details?: EngineDetailsModel;
  }

  /**
   * Properties of the corresponding asset.
   */
  export interface PropertiesSchema {
    /** Value of the property object. */
    value?: string;
  }

  /**
   * Resource defining provided workflow definitions.
   */
  export interface ProvidedCatalogWorkflows {
    /** A reference to a workflow definition. */
    data_access?: ProvidedWorkflowResource;
    /** A reference to a workflow definition. */
    request_new_product?: ProvidedWorkflowResource;
  }

  /**
   * A reference to a workflow definition.
   */
  export interface ProvidedWorkflowResource {
    /** Reference to a workflow definition. */
    definition?: WorkflowDefinitionReference;
  }

  /**
   * Represents a role associated with the contract.
   */
  export interface Roles {
    /** The role associated with the contract. */
    role?: string;
  }

  /**
   * Service id credentials.
   */
  export interface ServiceIdCredentials {
    /** Name of the api key of the service id. */
    name?: string;
    /** Created date of the api key of the service id. */
    created_at?: string;
  }

  /**
   * UseCase.
   */
  export interface UseCase {
    /** The id of the use case associated with the data product. */
    id: string;
    /** The display name of the use case associated with the data product. */
    name?: string;
    /** Container reference. */
    container?: ContainerReference;
  }

  /**
   * Data members for visualization.
   */
  export interface Visualization {
    /** Visualization identifier. */
    id?: string;
    /** Visualization name. */
    name?: string;
  }

  /**
   * Reference to a workflow definition.
   */
  export interface WorkflowDefinitionReference {
    /** ID of a workflow definition. */
    id?: string;
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

    protected client: DphV1;

    protected params: DphV1.ListDataProductsParams;

    /**
     * Construct a DataProductsPager object.
     *
     * @param {DphV1}  client - The service client instance used to invoke listDataProducts()
     * @param {Object} [params] - The parameters to be passed to listDataProducts()
     * @constructor
     * @returns {DataProductsPager}
     */
    constructor(client: DphV1, params?: DphV1.ListDataProductsParams) {
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
     * @returns {Promise<DphV1.DataProductSummary[]>}
     */
    public async getNext(): Promise<DphV1.DataProductSummary[]> {
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
     * @returns {Promise<DphV1.DataProductSummary[]>}
     */
    public async getAll(): Promise<DphV1.DataProductSummary[]> {
      const results: DataProductSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * DataProductDraftsPager can be used to simplify the use of listDataProductDrafts().
   */
  export class DataProductDraftsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: DphV1;

    protected params: DphV1.ListDataProductDraftsParams;

    /**
     * Construct a DataProductDraftsPager object.
     *
     * @param {DphV1}  client - The service client instance used to invoke listDataProductDrafts()
     * @param {Object} params - The parameters to be passed to listDataProductDrafts()
     * @constructor
     * @returns {DataProductDraftsPager}
     */
    constructor(client: DphV1, params: DphV1.ListDataProductDraftsParams) {
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
     * Returns the next page of results by invoking listDataProductDrafts().
     * @returns {Promise<DphV1.DataProductDraftSummary[]>}
     */
    public async getNext(): Promise<DphV1.DataProductDraftSummary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listDataProductDrafts(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.drafts;
    }

    /**
     * Returns all results by invoking listDataProductDrafts() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<DphV1.DataProductDraftSummary[]>}
     */
    public async getAll(): Promise<DphV1.DataProductDraftSummary[]> {
      const results: DataProductDraftSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * DataProductReleasesPager can be used to simplify the use of listDataProductReleases().
   */
  export class DataProductReleasesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: DphV1;

    protected params: DphV1.ListDataProductReleasesParams;

    /**
     * Construct a DataProductReleasesPager object.
     *
     * @param {DphV1}  client - The service client instance used to invoke listDataProductReleases()
     * @param {Object} params - The parameters to be passed to listDataProductReleases()
     * @constructor
     * @returns {DataProductReleasesPager}
     */
    constructor(client: DphV1, params: DphV1.ListDataProductReleasesParams) {
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
     * Returns the next page of results by invoking listDataProductReleases().
     * @returns {Promise<DphV1.DataProductReleaseSummary[]>}
     */
    public async getNext(): Promise<DphV1.DataProductReleaseSummary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listDataProductReleases(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.releases;
    }

    /**
     * Returns all results by invoking listDataProductReleases() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<DphV1.DataProductReleaseSummary[]>}
     */
    public async getAll(): Promise<DphV1.DataProductReleaseSummary[]> {
      const results: DataProductReleaseSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = DphV1;
