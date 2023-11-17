/**
 * (C) Copyright IBM Corp. 2020.
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
import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

class InitialCamsSetup extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.dataplatform.dev.cloud.ibm.com:443/v2';

  static DEFAULT_SERVICE_NAME: string = 'cams_api_service';

  public static newInstance(options: UserOptions): InitialCamsSetup {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new InitialCamsSetup(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(InitialCamsSetup.DEFAULT_SERVICE_URL);
    }
  }

  public createDataProductCatalog(): Promise<InitialCamsSetup.Response<any>> {
    const body = {
      'name': 'Default Data Product Hub',
      'uid': 'ibm-default-hub',
      'subtype': 'ibm_data_product_catalog',
      'generator': 'catalogadmin',
    };
    const sdkHeaders = getSdkHeaders(
      InitialCamsSetup.DEFAULT_SERVICE_NAME,
      'v1',
      'createDataProductCatalog'
    );

    const parameters = {
      options: {
        url: '/catalogs',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    };

    return this.createRequest(parameters);
  }

  public deleteCamsCatalog(
    params
  ): Promise<InitialCamsSetup.Response<InitialCamsSetup.EmptyObject>> {
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
      InitialCamsSetup.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCamsCatalog'
    );

    const parameters = {
      options: {
        url: '/catalogs/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}),
      }),
    };

    return this.createRequest(parameters);
  }
}
namespace InitialCamsSetup {
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
}

export = InitialCamsSetup;
