'use strict';
module.exports = {
    ratelimit: {
        buckets: {
            global: {
                max: 1000,
                interval: 60 * 1000,
                codes: ['xxx'],
            },
            analytics: {
                max: 100,
                interval: 60 * 1000,
            },
            'channel-read': {
                max: 1000,
                interval: 5 * 60 * 1000,
            },
            'channel-search': {
                max: 20,
                interval: 5 * 1000,
            },
            'channel-write': {
                max: 250,
                interval: 5 * 60 * 1000,
            },
            'channel-follow': {
                max: 100,
                interval: 60 * 1000,
            },
            upload: {
                max: 5,
                interval: 10 * 60 * 1000,
            },
            'upload-interactive': {
                max: 15,
                interval: 10 * 30 * 1000,
            },
            'user-read': {
                max: 500,
                interval: 60 * 1000,
            },
            'user-write': {
                max: 100,
                interval: 60 * 1000,
            },
            'user-login': {
                max: 50,
                interval: 60 * 1000,
            },
            'user-login-failed': {
                max: 8,
                interval: 15 * 60 * 1000,
                codes: ['401'],
            },
            'user-email': {
                max: 2,
                interval: 24 * 60 * 60 * 1000,
            },
            'notification-read': {
                max: 100,
                interval: 60 * 1000,
            },
            chats: {
                max: 500,
                interval: 60 * 1000,
            },
            report: {
                max: 10,
                interval: 60 * 1000,
            },
            contact: {
                max: 3,
                interval: 60 * 1000,
            },
            ingest: {
                max: 5,
                interval: 60 * 1000,
            },
            'mail-subscribe': {
                max: 3,
                interval: 60 * 1000,
            },
        },
    },
};
