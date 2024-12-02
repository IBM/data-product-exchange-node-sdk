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

const commonConstants = require('../lib/common.constants');

const {
  SERVICE_NAME,
  CONTENT_TYPE_JSON,
  CONTENT_TYPE_PATCH_JSON,
  SERVICE_VERSION,
  INITIALIZE,
  URL_GET_INITIALIZE_STATUS,
  HTTP_GET,
  GET_INITIALIZE_STATUS,
  URL_CREATE_DATA_PRODUCT,
  CREATE_DATA_PRODUCT,
  HTTP_POST,
  GET_SERVICEID_CREDENTIALS,
  URL_GET_SERVICEID_CREDENTIALS,
  URL_INITIALIZE,
  MANAGE_APIKEYS,
  URL_MANAGE_APIKEYS,
  LIST_DATA_PRODUCTS,
  URL_LIST_DATA_PRODUCTS,
  GET_DATA_PRODUCT,
  URL_GET_DATA_PRODUCT,
  COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  LIST_DATA_PRODUCT_DRAFTS,
  URL_LIST_DATA_PRODUCT_DRAFTS,
  CREATE_DATA_PRODUCT_DRAFT,
  URL_CREATE_DATA_PRODUCT_DRAFT,
  CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  GET_DATA_PRODUCT_DRAFT,
  URL_GET_DATA_PRODUCT_DRAFT,
  DLETE_DATA_PRODUCT_DRAFT,
  URL_DELETE_DATA_PRODUCT_DRAFT,
  HTTP_DELETE,
  UPDATE_DATA_PRODUCT_DRAFT,
  URL_UPDATE_DATA_PRODUCT_DRAFT,
  HTTP_PATCH,
  GET_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_GET_DRAFT_CONTRACT_TERMS_DOCUMENT,
  DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  PUBLISH_DATA_PRODUCT_DRAFT,
  URL_PUBLISH_DATA_PRODUCT_DRAFT,
  GET_DATA_PRODUCT_RELEASE,
  URL_GET_DATA_PRODUCT_RELEASE,
  UPDATE_DATA_PRODUCT_RELEASE,
  URL_UPDATE_DATA_PRODUCT_RELEASE,
  GET_RELEASE_CONTRACT_TERMS_DOCUMENT,
  URL_GET_RELEASE_CONTRACT_TERMS_DOCUMENT,
  LIST_DATA_PRODUCT_RELEASES,
  URL_LIST_DATA_PRODUCT_RELEASES,
  RETIRE_DATA_PRODUCT_RELEASE,
  URL_RETIRE_DATA_PRODUCT_RELEASE,
} = commonConstants;

/**
 * Data Product Hub API Service
 *
 * API Version: 1.0.0
 */

class DphV1 extends BaseService {
  static DEFAULT_SERVICE_NAME: string = SERVICE_NAME;
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, GET_INITIALIZE_STATUS);

    const parameters = {
      options: {
        url: URL_GET_INITIALIZE_STATUS,
        method: HTTP_GET,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, GET_SERVICEID_CREDENTIALS);

    const parameters = {
      options: {
        url: URL_GET_SERVICEID_CREDENTIALS,
        method: HTTP_GET,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, INITIALIZE);

    const parameters = {
      options: {
        url: URL_INITIALIZE,
        method: HTTP_POST,
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, MANAGE_APIKEYS);

    const parameters = {
      options: {
        url: URL_MANAGE_APIKEYS,
        method: HTTP_POST,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - Limit the number of data products in the results. The maximum limit is 200.
   * @param {string} [params.start] - Start token for pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductSummaryCollection>>}
   */
  public listDataProducts(
    params?: DphV1.ListDataProductsParams
  ): Promise<DphV1.Response<DphV1.DataProductSummaryCollection>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, LIST_DATA_PRODUCTS);

    const parameters = {
      options: {
        url: URL_LIST_DATA_PRODUCTS,
        method: HTTP_GET,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * @param {DataProductVersionPrototype[]} params.drafts - Collection of data products drafts to add to data product.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProduct>>}
   */
  public createDataProduct(
    params: DphV1.CreateDataProductParams
  ): Promise<DphV1.Response<DphV1.DataProduct>> {
    const _params = { ...params };
    const _requiredParams = ['drafts'];
    const _validParams = ['drafts', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'drafts': _params.drafts,
    };

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, CREATE_DATA_PRODUCT);

    const parameters = {
      options: {
        url: URL_CREATE_DATA_PRODUCT,
        method: HTTP_POST,
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, GET_DATA_PRODUCT);

    const parameters = {
      options: {
        url: URL_GET_DATA_PRODUCT,
        method: HTTP_GET,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * upload operation is marked as complete, the file is available to download.
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
      SERVICE_NAME,
      SERVICE_VERSION,
      COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_POST,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, LIST_DATA_PRODUCT_DRAFTS);

    const parameters = {
      options: {
        url: URL_LIST_DATA_PRODUCT_DRAFTS,
        method: HTTP_GET,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * @param {DataProductContractTerms[]} [params.contractTerms] - Contract terms binding various aspects of the data
   * product.
   * @param {boolean} [params.isRestricted] - Indicates whether the data product is restricted or not. A restricted data
   * product indicates that orders of the data product requires explicit approval before data is delivered.
   * @param {Domain} [params.domain] - Domain that the data product version belongs to. If this is the first version of
   * a data product, this field is required. If this is a new version of an existing data product, the domain will
   * default to the domain of the previous version of the data product.
   * @param {DataProductPart[]} [params.partsOut] - The outgoing parts of this data product version to be delivered to
   * consumers. If this is the first version of a data product, this field defaults to an empty list. If this is a new
   * version of an existing data product, the data product parts will default to the parts list from the previous
   * version of the data product.
   * @param {DataProductWorkflows} [params.workflows] - The workflows associated with the data product version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public createDataProductDraft(
    params: DphV1.CreateDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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
      'isRestricted',
      'domain',
      'partsOut',
      'workflows',
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
      'is_restricted': _params.isRestricted,
      'domain': _params.domain,
      'parts_out': _params.partsOut,
      'workflows': _params.workflows,
    };

    const path = {
      'data_product_id': _params.dataProductId,
    };

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, CREATE_DATA_PRODUCT_DRAFT);

    const parameters = {
      options: {
        url: URL_CREATE_DATA_PRODUCT_DRAFT,
        method: HTTP_POST,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_JSON,
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
      SERVICE_NAME,
      SERVICE_VERSION,
      CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_POST,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_JSON,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public getDataProductDraft(
    params: DphV1.GetDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, GET_DATA_PRODUCT_DRAFT);

    const parameters = {
      options: {
        url: URL_GET_DATA_PRODUCT_DRAFT,
        method: HTTP_GET,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, DLETE_DATA_PRODUCT_DRAFT);

    const parameters = {
      options: {
        url: URL_DELETE_DATA_PRODUCT_DRAFT,
        method: HTTP_DELETE,
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
   * Use this API to update the properties of a data product draft identified by a valid ID.<br/><br/>Specify patch
   * operations using http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the
   * properties of a data product<br/><br/>- Add/Remove parts from a data product (up to 20 parts)<br/><br/>- Add/Remove
   * use cases from a data product<br/><br/>- Update the data product state<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public updateDataProductDraft(
    params: DphV1.UpdateDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, UPDATE_DATA_PRODUCT_DRAFT);

    const parameters = {
      options: {
        url: URL_UPDATE_DATA_PRODUCT_DRAFT,
        method: HTTP_PATCH,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_PATCH_JSON,
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
   * to upload the document file and complete it.
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
      SERVICE_NAME,
      SERVICE_VERSION,
      GET_DRAFT_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_GET_DRAFT_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_GET,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * Contract documents can only be deleted for data product versions that are in DRAFT state.
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
      SERVICE_NAME,
      SERVICE_VERSION,
      DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_DELETE,
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
      SERVICE_NAME,
      SERVICE_VERSION,
      UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_PATCH,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_PATCH_JSON,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.draftId - Data product draft id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public publishDataProductDraft(
    params: DphV1.PublishDataProductDraftParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, PUBLISH_DATA_PRODUCT_DRAFT);

    const parameters = {
      options: {
        url: URL_PUBLISH_DATA_PRODUCT_DRAFT,
        method: HTTP_POST,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {boolean} [params.checkCallerApproval] - If the value is true, then it will be verfied whether the caller is
   * present in the data access request pre-approved user list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public getDataProductRelease(
    params: DphV1.GetDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, GET_DATA_PRODUCT_RELEASE);

    const parameters = {
      options: {
        url: URL_GET_DATA_PRODUCT_RELEASE,
        method: HTTP_GET,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * Use this API to update the properties of a data product release identified by a valid ID.<br/><br/>Specify patch
   * operations using http://jsonpatch.com/ syntax.<br/><br/>Supported patch operations include:<br/><br/>- Update the
   * properties of a data product<br/><br/>- Add/remove parts from a data product (up to 20 parts)<br/><br/>- Add/remove
   * use cases from a data product<br/><br/>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {JsonPatchOperation[]} params.jsonPatchInstructions - A set of patch operations as defined in RFC 6902. See
   * http://jsonpatch.com/ for more information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public updateDataProductRelease(
    params: DphV1.UpdateDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, UPDATE_DATA_PRODUCT_RELEASE);

    const parameters = {
      options: {
        url: URL_UPDATE_DATA_PRODUCT_RELEASE,
        method: HTTP_PATCH,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
            'Content-Type': CONTENT_TYPE_PATCH_JSON,
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
   * the document file to complete the attachment.
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
      SERVICE_NAME,
      SERVICE_VERSION,
      GET_RELEASE_CONTRACT_TERMS_DOCUMENT
    );

    const parameters = {
      options: {
        url: URL_GET_RELEASE_CONTRACT_TERMS_DOCUMENT,
        method: HTTP_GET,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, LIST_DATA_PRODUCT_RELEASES);

    const parameters = {
      options: {
        url: URL_LIST_DATA_PRODUCT_RELEASES,
        method: HTTP_GET,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataProductId - Data product ID. Use '-' to skip specifying the data product ID explicitly.
   * @param {string} params.releaseId - Data product release id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DphV1.Response<DphV1.DataProductVersion>>}
   */
  public retireDataProductRelease(
    params: DphV1.RetireDataProductReleaseParams
  ): Promise<DphV1.Response<DphV1.DataProductVersion>> {
    const _params = { ...params };
    const _requiredParams = ['dataProductId', 'releaseId'];
    const _validParams = ['dataProductId', 'releaseId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'data_product_id': _params.dataProductId,
      'release_id': _params.releaseId,
    };

    const sdkHeaders = getSdkHeaders(SERVICE_NAME, SERVICE_VERSION, LIST_DATA_PRODUCT_RELEASES);

    const parameters = {
      options: {
        url: URL_RETIRE_DATA_PRODUCT_RELEASE,
        method: HTTP_POST,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': CONTENT_TYPE_JSON,
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
      ACCOUNT_OWNER_INTO_CATALOG_MEMBERS = 'account_owner_into_catalog_members',
    }
  }

  /** Parameters for the `manageApiKeys` operation. */
  export interface ManageApiKeysParams {
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
    drafts: DataProductVersionPrototype[];
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
    contractTerms?: DataProductContractTerms[];
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    isRestricted?: boolean;
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
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * The asset represented in this part.
   */
  export interface AssetPartReference {
    /** The unique identifier of the asset. */
    id?: string;
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
    container: ContainerIdentity;
  }

  /**
   * AssetReference.
   */
  export interface AssetReference {
    /** The unique identifier of the asset. */
    id?: string;
    /** Container reference. */
    container: ContainerReference;
  }

  /**
   * ContainerIdentity.
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
   * Data Product.
   */
  export interface DataProduct {
    /** Data product identifier. */
    id: string;
    /** A data product draft version object. */
    release?: DataProductDraftVersionRelease;
    /** Container reference. */
    container: ContainerReference;
    /** Summary of Data Product Version object. */
    latest_release?: DataProductVersionSummary;
    /** List of draft summaries of this data product. */
    drafts?: DataProductVersionSummary[];
  }

  /**
   * DataProductContractTerms.
   */
  export interface DataProductContractTerms {
    asset?: AssetReference;
    /** ID of the contract terms. */
    id?: string;
    /** Collection of contract terms documents. */
    documents?: ContractTermsDocument[];
    error_msg?: string;
  }

  /**
   * A custom workflow definition to be used to create a workflow to approve a data product subscription.
   */
  export interface DataProductCustomWorkflowDefinition {
    /** ID of a workflow definition. */
    id?: string;
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
    /** Collection of data product drafts. */
    drafts: DataProductVersionSummary[];
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
   * A collection of data product release summaries.
   */
  export interface DataProductReleaseCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Collection of data product releases. */
    releases: DataProductVersionSummary[];
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
  }

  /**
   * A collection of data product summaries.
   */
  export interface DataProductSummaryCollection {
    /** Set a limit on the number of results returned. */
    limit: number;
    /** First page in the collection. */
    first: FirstPage;
    /** Next page in the collection. */
    next?: NextPage;
    /** Collection of data product summaries. */
    data_products: DataProductSummary[];
  }

  /**
   * Data Product version.
   */
  export interface DataProductVersion {
    /** The data product version number. */
    version: string;
    /** The state of the data product version. */
    state: DataProductVersion.Constants.State | string;
    /** Data product reference. */
    data_product: DataProductVersionDataProduct;
    /** The name of the data product version. A name can contain letters, numbers, understores, dashes, spaces or
     *  periods. Names are mutable and reusable.
     */
    name: string;
    /** The description of the data product version. */
    description: string;
    /** Tags on the data product. */
    tags: string[];
    /** A list of use cases associated with the data product version. */
    use_cases: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductVersion.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: DataProductContractTerms[];
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
    asset: AssetReference;
    /** Domain that the data product version belongs to. If this is the first version of a data product, this field
     *  is required. If this is a new version of an existing data product, the domain will default to the domain of the
     *  previous version of the data product.
     */
    domain: Domain;
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
    /** The workflows associated with the data product version. */
    workflows?: DataProductWorkflows;
    /** Metadata properties on data products. */
    properties?: JsonObject;
  }
  export namespace DataProductVersion {
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
  export interface DataProductVersionDataProduct {
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
  export interface DataProductVersionPrototype {
    /** The data product version number. */
    version?: string;
    /** The state of the data product version. If not specified, the data product version will be created in `draft`
     *  state.
     */
    state?: DataProductVersionPrototype.Constants.State | string;
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
    types?: DataProductVersionPrototype.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms?: DataProductContractTerms[];
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted?: boolean;
    /** New asset input properties. */
    asset: AssetPrototype;
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
  }
  export namespace DataProductVersionPrototype {
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
    tags: string[];
    /** A list of use cases associated with the data product version. */
    use_cases: UseCase[];
    /** Types of parts on the data product. */
    types: DataProductVersionSummary.Constants.Types[] | string[];
    /** Contract terms binding various aspects of the data product. */
    contract_terms: DataProductContractTerms[];
    /** Indicates whether the data product is restricted or not. A restricted data product indicates that orders of
     *  the data product requires explicit approval before data is delivered.
     */
    is_restricted: boolean;
    /** The identifier of the data product version. */
    id: string;
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
   * Detailed error information.
   */
  export interface ErrorModelResource {
    /** Error code. */
    code?: ErrorModelResource.Constants.Code | string;
    /** Error message. */
    message?: string;
    /** Extra information about the error. */
    extra?: JsonObject;
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
    status?: InitializeResource.Constants.Status | string;
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
   * Next page in the collection.
   */
  export interface NextPage {
    /** Link to the next page in the collection. */
    href: string;
    /** Start token for pagination to the next page in the collection. */
    start: string;
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
     * @returns {Promise<DphV1.DataProductVersionSummary[]>}
     */
    public async getNext(): Promise<DphV1.DataProductVersionSummary[]> {
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
     * @returns {Promise<DphV1.DataProductVersionSummary[]>}
     */
    public async getAll(): Promise<DphV1.DataProductVersionSummary[]> {
      const results: DataProductVersionSummary[] = [];
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
     * @returns {Promise<DphV1.DataProductVersionSummary[]>}
     */
    public async getNext(): Promise<DphV1.DataProductVersionSummary[]> {
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
     * @returns {Promise<DphV1.DataProductVersionSummary[]>}
     */
    public async getAll(): Promise<DphV1.DataProductVersionSummary[]> {
      const results: DataProductVersionSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = DphV1;
