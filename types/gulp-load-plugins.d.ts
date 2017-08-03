import * as Less from 'gulp-less';
import * as gIf from 'gulp-if';
import * as concat from 'gulp-concat';
import * as GulpUglify from 'gulp-uglify'
import * as autoPrefixer from 'gulp-autoprefixer';
import 'gulp-load-plugins';
import { Options } from 'pug';

declare class UglifyError extends Error {
    public readonly cause: {
        filename: string;
        line: number;
        col: number;
        message: string;
    }
}
declare module 'gulp-load-plugins' {
    export interface GulpPlugins {
        less: typeof Less;
        if: typeof gIf;
        concat: typeof concat;
        uglify: typeof GulpUglify & {
            GulpUglifyError: typeof UglifyError
        };
        autoprefixer: typeof autoPrefixer;
        consolidate (formatter: string, values: { [key: string]: any }): NodeJS.ReadWriteStream;
        iconfont (options: {
            fontName: string;
            normalize?: boolean;
            formats: string[];
        }): NodeJS.ReadWriteStream;
        minifyHtml (): NodeJS.ReadWriteStream;
        imagemin (): NodeJS.ReadWriteStream;
        cleanCss (): NodeJS.ReadWriteStream;
        pug (options: Options & {
            locals?: { [key: string]: any };
            data?: { [key: string]: any };
        }): NodeJS.ReadWriteStream;
    }
}
