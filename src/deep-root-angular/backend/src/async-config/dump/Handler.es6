/**
 * Created by mgoria on 3/11/16.
 */

'use strict';

import AWS from 'aws-sdk';
import DeepFramework from 'deep-framework';
import {Property_Instance as Property} from 'deep-package-manager';
import {Provisioning_Describer as ServicesDescriber} from 'deep-package-manager';
import {AsyncConfig} from './AsyncConfig';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let logger = this.kernel.get('log');
    let describer = new ServicesDescriber(
      new Property('/', this._getPropertyConfig()),
      this.kernel.config
    );

    let asyncConfig = new AsyncConfig(describer);

    asyncConfig.generate((errors, config) => {
      if (Object.keys(errors).length !== 0 ) {
        logger.warn(`Error on generating async config.`, errors);
      }

      this._dumpIntoFs(this.sharedFs, config, () => {
        this._dumpIntoFs(this.publicRootFs, config, () => {
          this._invalidateCachedAsyncConfig((error) => {
            if (error) {
              logger.warn('Error on invalidating cached async config.', error);
            } else if (asyncConfig.ready) {
              this._selfDisable(() => {
                this.createResponse(config).send();
              });

              return;
            }

            this.createResponse(config).send();
          });
        });
      });
    });
  }

  /**
   * @returns {S3.FS}
   */
  get sharedFs() {
    return this.kernel.get('fs').shared();
  }

  /**
   * @returns {S3.FS}
   */
  get publicRootFs() {
    let publicFsClone = this.kernel.get('fs').public.clone();

    publicFsClone.path = '/';

    return publicFsClone;
  }

  /**
   * @param {S3.FS} fs
   * @param {Object} config
   * @param {Function} cb
   * @private
   */
  _dumpIntoFs(fs, config, cb) {
    fs.writeFile(this.kernel.constructor.ASYNC_CONFIG_FILE, JSON.stringify(config), (error) => {
      if (error) {
        throw new DeepFramework.Core.Exception.Exception(
          `Error on persisting ${this.kernel.constructor.ASYNC_CONFIG_FILE} file in ${fs.constructor.name} FS. ${error}`
        );
      }

      cb();
    });
  }

  /**
   *
   * @param {Function} cb
   * @private
   */
  _selfDisable(cb) {
    let resource = this.kernel.get('resource');
    let lambda = resource.get('@deep-root-angular:scheduler:rule');
    let payload = {
      effect: 'disable',
      lambdaName: this.context.functionName
    };

    lambda.request(payload).useDirectCall().send(cb);
  }

  /**
   * @param {Function} callback
   * @private
   */
  _invalidateCachedAsyncConfig(callback) {
    let cache = this.kernel.get('cache');
    let cacheKey = this.kernel.constructor.ASYNC_CONFIG_CACHE_KEY;

    cache.invalidate(cacheKey, 0, callback);
  }

  /**
   * @returns {Object}
   * @private
   */
  _getPropertyConfig() {
    return {
      env: this.kernel.config.env,
      appIdentifier: this.kernel.config.appIdentifier,
      awsAccountId: this.kernel.config.awsAccountId,
      aws: {
        accessKeyId: AWS.config.credentials.accessKeyId,
        secretAccessKey: '',
        sessionToken: AWS.config.credentials.sessionToken,
        region: AWS.config.region
      }
    };
  }
}
