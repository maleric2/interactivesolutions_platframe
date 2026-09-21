/* SET CONTEXT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

import context from 'dotenv'; context.config();

/* GULP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

import { series, parallel } from 'gulp';

/* TASKS ━━━━━━━━━━━━━━ private  ━━━━━━━━━━━━━━ */

import load from './settings/gulp/load';
import watch from './settings/gulp/watch';
import clean from './settings/gulp/clean';
import logic from './settings/gulp/logic';
import notify from './settings/gulp/notify';
import styles from './settings/gulp/styles';
import collect from './settings/gulp/collect';
import staticFiles from './settings/gulp/static';
import templates from './settings/gulp/templates';
import imgLinked from './settings/gulp/img-linked';
import imgSprite from './settings/gulp/img-sprite';
import { host } from './settings/gulp/servers';

/* TASKS ━━━━━━━━━━━━━━━ public  ━━━━━━━━━━━━━━ */

const assets = parallel(
    templates,
    styles,
    staticFiles,
    imgLinked,
    imgSprite,
    logic,
);

export const develop = series(
    clean,
    collect,

    assets, host, notify, watch
);

export const build = series(
    clean,
    collect,

    assets, notify
);

export const preflight = series(
    clean,
    collect,

    assets, host, notify

);

export const serve = preflight;

export const deploy = series(
    build,
);

// development environment initialization
const init = () => load({ task: 'develop', flag: '-S' });

export default init;
