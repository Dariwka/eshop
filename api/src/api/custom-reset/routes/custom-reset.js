"use strict";
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/manual-reset",
      handler: "custom-reset.manualReset",
      config: {
        auth: false, // можно без JWT, т.к. ты сбрасываешь по email//
      },
    },
  ],
};
