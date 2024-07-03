// Dph Api Paths
const URL_GET_INITIALIZE_STATUS = '/data_product_exchange/v1/configuration/initialize/status';
const URL_GET_SERVICEID_CREDENTIALS = '/data_product_exchange/v1/configuration/credentials';
const URL_INITIALIZE = '/data_product_exchange/v1/configuration/initialize';
const URL_MANAGE_APIKEYS = '/data_product_exchange/v1/configuration/rotate_credentials';
const URL_LIST_DATA_PRODUCTS = '/data_product_exchange/v1/data_products';
const URL_CREATE_DATA_PRODUCT = '/data_product_exchange/v1/data_products';
const URL_GET_DATA_PRODUCT = '/data_product_exchange/v1/data_products/{data_product_id}';
const URL_COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}/complete';
const URL_LIST_DATA_PRODUCT_DRAFTS =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts';
const URL_CREATE_DATA_PRODUCT_DRAFT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts';
const URL_CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents';
const URL_GET_DATA_PRODUCT_DRAFT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}';
const URL_DELETE_DATA_PRODUCT_DRAFT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}';
const URL_UPDATE_DATA_PRODUCT_DRAFT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}';
const URL_GET_DRAFT_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}';
const URL_DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}';
const URL_UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/contract_terms/{contract_terms_id}/documents/{document_id}';
const URL_PUBLISH_DATA_PRODUCT_DRAFT =
  '/data_product_exchange/v1/data_products/{data_product_id}/drafts/{draft_id}/publish';
const URL_GET_DATA_PRODUCT_RELEASE =
  '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}';
const URL_UPDATE_DATA_PRODUCT_RELEASE =
  '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}';
const URL_GET_RELEASE_CONTRACT_TERMS_DOCUMENT =
  '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/contract_terms/{contract_terms_id}/documents/{document_id}';
const URL_LIST_DATA_PRODUCT_RELEASES =
  '/data_product_exchange/v1/data_products/{data_product_id}/releases';
const URL_RETIRE_DATA_PRODUCT_RELEASE =
  '/data_product_exchange/v1/data_products/{data_product_id}/releases/{release_id}/retire';
// Dph Api Headers
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_PATCH_JSON = 'application/json-patch+json';
// SDK-specific HTTP headers
const SERVICE_NAME = 'dph';
const SERVICE_VERSION = 'v1';
const GET_INITIALIZE_STATUS = 'getInitializeStatus';
const GET_SERVICEID_CREDENTIALS = 'getServiceIdCredentials';
const INITIALIZE = 'initialize';
const MANAGE_APIKEYS = 'manageApiKeys';
const LIST_DATA_PRODUCTS = 'listDataProducts';
const CREATE_DATA_PRODUCT = 'createDataProduct';
const GET_DATA_PRODUCT = 'getDataProduct';
const COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT = 'completeDraftContractTermsDocument';
const LIST_DATA_PRODUCT_DRAFTS = 'listDataProductDrafts';
const CREATE_DATA_PRODUCT_DRAFT = 'createDataProductDraft';
const CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT = 'createDraftContractTermsDocument';
const GET_DATA_PRODUCT_DRAFT = 'getDataProductDraft';
const DLETE_DATA_PRODUCT_DRAFT = 'deleteDataProductDraft';
const UPDATE_DATA_PRODUCT_DRAFT = 'updateDataProductDraft';
const GET_DRAFT_CONTRACT_TERMS_DOCUMENT = 'getDraftContractTermsDocument';
const DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT = 'deleteDraftContractTermsDocument';
const UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT = 'updateDraftContractTermsDocument';
const PUBLISH_DATA_PRODUCT_DRAFT = 'publishDataProductDraft';
const GET_DATA_PRODUCT_RELEASE = 'getDataProductRelease';
const UPDATE_DATA_PRODUCT_RELEASE = 'updateDataProductRelease';
const GET_RELEASE_CONTRACT_TERMS_DOCUMENT = 'getReleaseContractTermsDocument';
const LIST_DATA_PRODUCT_RELEASES = 'listDataProductReleases';
const RETIRE_DATA_PRODUCT_RELEASE = 'retireDataProductRelease';
// Others
const HTTP_GET = 'GET';
const HTTP_POST = 'POST';
const HTTP_DELETE = 'DELETE';
const HTTP_PATCH = 'PATCH';

module.exports = {
  URL_GET_INITIALIZE_STATUS,
  URL_GET_SERVICEID_CREDENTIALS,
  URL_INITIALIZE,
  URL_MANAGE_APIKEYS,
  URL_LIST_DATA_PRODUCTS,
  URL_CREATE_DATA_PRODUCT,
  URL_GET_DATA_PRODUCT,
  URL_COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_LIST_DATA_PRODUCT_DRAFTS,
  URL_CREATE_DATA_PRODUCT_DRAFT,
  URL_CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_GET_DATA_PRODUCT_DRAFT,
  URL_DELETE_DATA_PRODUCT_DRAFT,
  URL_UPDATE_DATA_PRODUCT_DRAFT,
  URL_GET_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  URL_PUBLISH_DATA_PRODUCT_DRAFT,
  URL_GET_DATA_PRODUCT_RELEASE,
  URL_UPDATE_DATA_PRODUCT_RELEASE,
  URL_GET_RELEASE_CONTRACT_TERMS_DOCUMENT,
  URL_LIST_DATA_PRODUCT_RELEASES,
  URL_RETIRE_DATA_PRODUCT_RELEASE,
  CONTENT_TYPE_JSON,
  CONTENT_TYPE_PATCH_JSON,
  SERVICE_NAME,
  SERVICE_VERSION,
  GET_INITIALIZE_STATUS,
  GET_SERVICEID_CREDENTIALS,
  INITIALIZE,
  MANAGE_APIKEYS,
  LIST_DATA_PRODUCTS,
  CREATE_DATA_PRODUCT,
  GET_DATA_PRODUCT,
  COMPLETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  LIST_DATA_PRODUCT_DRAFTS,
  CREATE_DATA_PRODUCT_DRAFT,
  CREATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  GET_DATA_PRODUCT_DRAFT,
  DLETE_DATA_PRODUCT_DRAFT,
  UPDATE_DATA_PRODUCT_DRAFT,
  GET_DRAFT_CONTRACT_TERMS_DOCUMENT,
  DELETE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  UPDATE_DRAFT_CONTRACT_TERMS_DOCUMENT,
  PUBLISH_DATA_PRODUCT_DRAFT,
  GET_DATA_PRODUCT_RELEASE,
  UPDATE_DATA_PRODUCT_RELEASE,
  GET_RELEASE_CONTRACT_TERMS_DOCUMENT,
  LIST_DATA_PRODUCT_RELEASES,
  RETIRE_DATA_PRODUCT_RELEASE,
  HTTP_GET,
  HTTP_POST,
  HTTP_DELETE,
  HTTP_PATCH,
};
