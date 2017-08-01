import * as cfg from 'config';

export interface IConfig {
    /**
     * Whether the resulting build should be minified, or not.
     */
    minify: boolean;
    /**
     * Wether the reference docs should be built or not.
     */
    buildReferenceDocs: true;

    /**
     * Source and corresponding destination paths for resources.
     */
    src: {
        tmp: string;
        css: string;
        js: string[];
        html: string
        snippets: string;
        icons: string;
        images: string;
    }

    dist: {
        css: string;
        js: string;
        html: string;
        font: string;
        images: string;
        javadoc: string;
    }

    /**
     * Location of locally stored repositories. If these are not enabled, we'll
     * try to clone them into a temp directory for building.
     */
    repos: {
        [key: string]: string;
    }

    backendRamlPath?: string;
}

export const config = <IConfig><any>cfg;
