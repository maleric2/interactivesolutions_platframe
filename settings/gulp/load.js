import log from 'fancy-log';
import { join } from 'path';
import { watch } from 'gulp';
import context from 'dotenv';
import { spawn } from 'child_process';

// Resolve gulp's CLI entry and run it with the current Node binary.
// Spawning the "gulp" shell script directly fails on Windows, where the
// executable is "gulp.cmd" and cannot be launched without a shell.
const gulpCli = join(process.cwd(), 'node_modules', 'gulp-cli', 'bin', 'gulp.js');

export default async ({ task, flag }) => {

    let child;

    const sources = [
        './.env',
        './settings/**/*.js',
    ];

    const purgeEnvCache = () => {

        Object.keys(process.env).forEach(key => {
            if (key.match(/^PLATFRAME_/)) delete process.env[key]
        })

    }

    const spawnChild = async () => {

        if (child) {
            // clear environment
            purgeEnvCache();
            // purge outdated process
            child.kill();
            // notify user
            log(`\u{1F6E0}\u{FE0F}\u{00A0} Project settings changed, creating a new development environment.`);
            // re-establish context
            context.config();
        }

        child = spawn(process.execPath, [gulpCli, task, flag], { stdio: 'inherit' });

    }

    watch(sources, { ignoreInitial: false }, spawnChild);

};
