'use strict';

/**
 * busy-slot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::busy-slot.busy-slot');
