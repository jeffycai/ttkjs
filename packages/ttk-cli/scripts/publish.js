'use strict';

const paths = require('../config/paths');
const utils = require('./utils');
const consts = require('../config/consts');

utils.yarn(['publish', '--registry', consts.ttkServerUrl, '--exact'], paths.appSrc)


