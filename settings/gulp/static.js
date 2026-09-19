import { src, dest } from 'gulp';
import { src as source, ctx } from '..';

/* Passes through static files that must land at the site root
 * (robots.txt, sitemap.xml, and similar non-processed assets). */

function staticFiles() {

    return src(`${ source.root }/static/**/*`)
        .pipe(dest(ctx.path.root));

}

export default staticFiles;