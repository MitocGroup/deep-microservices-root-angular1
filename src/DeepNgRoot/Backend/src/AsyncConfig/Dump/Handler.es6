/**
 * Created by mgoria on 3/11/16.
 */

'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @TBD
   *
   * @param request
   */
  handle(request) {
    return this.createResponse({}).send();
  }
}