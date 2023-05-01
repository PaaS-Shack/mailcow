"use strict";

const f = require("cross-fetch");
const ConfigLoader = require("config-mixin");
const { MoleculerClientError } = require("moleculer").Errors;

/**
 * attachments of addons service
 */
module.exports = {
    name: "mailcow",
    version: 1,

    mixins: [
        ConfigLoader(['mailcow.**']),
    ],

    /**
     * Service dependencies
     */
    dependencies: [

    ],

    /**
     * Service settings
     */
    settings: {
        rest: "/v1/mail/"
    },

    /**
     * Actions
     */

    actions: {

        'domain.create': {
            rest: "POST /domains",
            params: {
                "domain": { type: "string", optional: false, default: 'all', trim: true },
                "active": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "aliases": { type: "number", optional: true, default: 10 },
                "defquota": { type: "number", optional: true, default: 3072 },
                "description": { type: "string", optional: true, default: '', trim: true },
                "mailboxes": { type: "number", optional: true, default: 10 },
                "maxquota": { type: "number", optional: true, default: 10240 },
                "quota": { type: "number", optional: true, default: 10240 },
                "relay_all_recipients": { type: "enum", optional: true, default: 0, values: [0, 1] },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/add/domain`, {
                    "domain": params.domain,
                    "active": params.active,
                    "aliases": params.aliases,
                    "backupmx": "0",
                    "defquota": params.defquota,
                    "description": params.description,
                    "mailboxes": params.mailboxes,
                    "maxquota": params.maxquota,
                    "quota": params.quota,
                    "relay_all_recipients": params.relay_all_recipients,
                    "rl_frame": "s",
                    "rl_value": "10",
                    "restart_sogo": "10",
                })
            }
        },
        'domain.update': {
            rest: "POST /domains",
            params: {
                "domain": { type: "string", optional: false, default: 'all', trim: true },
                "active": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "aliases": { type: "number", optional: true, default: 10 },
                "defquota": { type: "number", optional: true, default: 3072 },
                "description": { type: "string", optional: false, default: 'all', trim: true },
                "mailboxes": { type: "number", optional: true, default: 10 },
                "maxquota": { type: "number", optional: true, default: 10240 },
                "quota": { type: "number", optional: true, default: 10240 },
                "relay_all_recipients": { type: "enum", optional: true, default: 0, values: [0, 1] },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/edit/domain`, {
                    "attr": {
                        "active": params.active,
                        "aliases": params.aliases,
                        "backupmx": "0",
                        "defquota": params.defquota,
                        "description": params.description,
                        "mailboxes": params.mailboxes,
                        "maxquota": params.maxquota,
                        "quota": params.quota,
                        "relay_all_recipients": params.relay_all_recipients,
                        "rl_frame": "s",
                        "rl_value": "10",
                        "restart_sogo": "10",
                    },
                    "items": params.domain
                })
            }
        },
        'domain.get': {
            rest: "GET /domains/:domain",
            params: {
                domain: { type: "string", optional: false, default: 'all', trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/domain/${params.domain}`)
            }
        },
        'domain.list': {
            rest: "GET /domains",
            params: {

            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/domain/all`)
            }
        },
        'domain.remove': {
            rest: "GET /domains/:domain",
            params: {
                domain: { type: "string", optional: false, default: 'all', trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/delete/domain/${params.domain}`, [params.domain])
            }
        },




        'domain.mailbox.create': {
            rest: "POST /domains/:domain/mailbox",
            params: {

                "active": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "domain": { type: "string", optional: false, trim: true },
                "local_part": { type: "string", optional: false, trim: true },
                "name": { type: "string", optional: false, trim: true },
                "password": { type: "string", optional: false, trim: true },
                "quota": { type: "number", optional: true, default: 3072 },
                "force_pw_update": { type: "enum", optional: true, default: 0, values: [0, 1] },
                "tls_enforce_in": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "tls_enforce_out": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "sogo_access": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "imap_access": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "pop3_access": { type: "enum", optional: true, default: 0, values: [0, 1] },
                "smtp_access": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "sieve_access": { type: "enum", optional: true, default: 1, values: [0, 1] },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/add/mailbox`, {
                    "active": params.active,
                    "domain": params.domain,
                    "local_part": params.local_part,
                    "name": params.name,
                    "password": params.password,
                    "password2": params.password,
                    "quota": params.quota,
                    "force_pw_update": params.force_pw_update,
                    "tls_enforce_in": params.tls_enforce_in,
                    "tls_enforce_out": params.tls_enforce_out,
                    "sogo_access": params.sogo_access,
                    "imap_access": params.imap_access,
                    "pop3_access": params.pop3_access,
                    "smtp_access": params.smtp_access,
                    "sieve_access": params.sieve_access,
                })
            }
        },
        'domain.mailbox.update': {
            rest: "POST /domains/:domain/mailbox/:local_part",
            params: {
                "active": { type: "enum", optional: true, values: [0, 1] },
                "domain": { type: "string", optional: false, trim: true },
                "local_part": { type: "string", optional: false, trim: true },
                "name": { type: "string", optional: false, trim: true },
                "password": { type: "string", optional: false, trim: true },
                "quota": { type: "number", optional: true },
                "force_pw_update": { type: "enum", optional: true, values: [0, 1] },
                "sogo_access": { type: "enum", optional: true, values: [0, 1] },
                "imap_access": { type: "enum", optional: true, values: [0, 1] },
                "pop3_access": { type: "enum", optional: true, values: [0, 1] },
                "smtp_access": { type: "enum", optional: true, values: [0, 1] },
                "sieve_access": { type: "enum", optional: true, values: [0, 1] },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/add/mailbox`, {
                    "attr": {
                        "active": params.active,
                        "force_pw_update": params.force_pw_update,
                        "name": params.name,
                        "quota": params.quota,
                        "sogo_access": params.sogo_access,
                        "imap_access": params.imap_access,
                        "pop3_access": params.pop3_access,
                        "smtp_access": params.smtp_access,
                        "sieve_access": params.sieve_access,
                    },
                    "items": [`${params.local_part}@${params.domain}`]
                })
            }
        },
        'domain.mailbox.get': {
            rest: "GET /domains/:domain/mailbox/:local_part",
            params: {
                domain: { type: "string", optional: false, trim: true },
                local_part: { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/mailbox/${params.local_part}@${params.domain}`);
            }
        },
        'domain.mailbox.list': {
            rest: "GET /domains/:domain/mailbox",
            params: {
                domain: { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/mailbox/all/${params.domain}`);
            }
        },
        'domain.mailbox.remove': {
            rest: "DELETE /domains/:domain/mailbox/:local_part",
            params: {
                domain: { type: "string", optional: false, trim: true },
                local_part: { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/delete/mailbox`, [`${params.local_part}@${params.domain}`]);
            }
        },
        'domain.alias.create': {
            rest: "POST /domains/:domain/alias",
            params: {
                "active": { type: "enum", optional: true, default: 1, values: [0, 1] },
                "address": { type: "string", optional: false, trim: true },
                "goto": { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/add/alias`, {
                    "active": params.active,
                    "address": params.address,
                    "goto": params.goto,
                })
            }
        },

        'domain.alias.get': {
            rest: "GET /domains/:domain/alias/:id",
            params: {
                id: { type: "number", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/alias/${params.id}`);
            }
        },
        'domain.alias.remove': {
            rest: "DELETE /domains/:domain/alias",
            params: {
                id: { type: "number", optional: false },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/delete/alias`, [params.id])
            }
        },

        'domain.dkim.create': {
            rest: "POST /domains/:domain/dkim",
            params: {
                "dkim_selector": { type: "enum", optional: true, default: "dkim", values: ["dkim"] },
                "domain": { type: "string", optional: false, trim: true },
                "key_size": { type: "enum", optional: true, default: 1024, values: [1024, 2048] },

            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/add/dkim`, {
                    "dkim_selector": params.dkim_selector,
                    "domains": params.domain,
                    "key_size": params.key_size,
                });
            }
        },
        'domain.dkim.get': {
            rest: "GET /domains/:domain/dkim/:local_part",
            params: {
                domain: { type: "string", optional: true, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.get(`api/v1/get/dkim/${params.domain}`);
            }
        },
        'domain.dkim.remove': {
            rest: "DELETE /domains/:domain/dkim",
            params: {
                domain: { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.post(`api/v1/delete/dkim`, [`${params.domain}`]);
            }
        },
        'domain.autogenCreate': {
            params: {
                id: { type: "string", optional: false, trim: true },
            },
            async handler(ctx) {
                const { id } = Object.assign({}, ctx.params);

                const domain = await ctx.call('v1.domains.resolve', { id })
                return this.autogenCreate(ctx, domain);
            }
        },

    },

    /**
     * Events
     */
    events: {
        "domains.removed": {
            async handler(ctx) {
                const domain = Object.assign({}, ctx.params.data);
                if (this.config["mailcow.autogen"]) {
                    const options = {
                        meta: { userID: domain.owner }
                    }

                    const mailboxs = await this.actions['domain.mailbox.list']({
                        domain: `${domain.domain}`
                    })
                    console.log(mailboxs)
                    for (let index = 0; index < mailboxs.length; index++) {
                        const mailbox = mailboxs[index];
                        const removed = await this.actions['domain.mailbox.remove']({
                            domain: mailbox.domain,
                            local_part: mailbox.local_part
                        })
                        console.log(removed)
                    }

                    const removed = await this.actions['domain.remove']({
                        domain: `${domain.domain}`
                    })
                    console.log(removed)
                }
            }
        },
        "domains.created": {
            async handler(ctx) {
                const domain = Object.assign({}, ctx.params.data);
                await this.autogenCreate(ctx, domain)
            }
        },
    },

    /**
     * Methods
     */
    methods: {
        async autogenCreate(ctx, domain) {
            if (this.config["mailcow.autogen"]) {
                const options = {
                    meta: { userID: domain.owner }
                }

                const dkim = await this.actions['domain.create']({
                    domain: `${domain.domain}`
                }).then(() => this.actions['domain.dkim.create']({
                    domain: `${domain.domain}`
                })).then(() => this.actions['domain.dkim.get']({
                    domain: `${domain.domain}`
                }))

                await ctx.call('v1.domains.records.create', {
                    fqdn: `${domain.domain}`,
                    type: 'MX',
                    data: this.config["mailcow.mx"],
                    priority: 10
                }, options)
                await ctx.call('v1.domains.records.create', {
                    fqdn: `autodiscover.${domain.domain}`,
                    type: 'CNAME',
                    data: this.config["mailcow.mx"],
                }, options)
                await ctx.call('v1.domains.records.create', {
                    fqdn: `autoconfig.${domain.domain}`,
                    type: 'CNAME',
                    data: this.config["mailcow.mx"],
                }, options)
                // await ctx.call('v1.domains.records.create', {
                //     fqdn: `_autodiscover._tcp.${domain.domain}`,
                //     type: 'SRV',
                //     priority: 5,
                //     weight: 5,
                //     port: 443,
                //     target: this.config["mailcow.mx"],
                //     data: this.config["mailcow.mx"]
                // }, options)

                await ctx.call('v1.domains.records.create', {
                    fqdn: `${domain.domain}`,
                    type: 'TXT',
                    data: 'V=SPF1 MX ~ALL'
                }, options)
                await ctx.call('v1.domains.records.create', {
                    fqdn: `_dmarc.${domain.domain}`,
                    type: 'TXT',
                    data: 'v=DMARC1;p=quarantine;fo=1'
                }, options)
                await ctx.call('v1.domains.records.create', {
                    fqdn: `dkim._domainkey.${domain.domain}`,
                    type: 'TXT',
                    data: dkim.dkim_txt
                }, options)

            }
        },
        async get(url) {
            const api = this.config["mailcow.api"];
            const key = this.config["mailcow.key"];
            return f(`${api}/${url}`, {
                method: "GET",
                headers: {
                    "X-Api-Key": key
                }
            }).then(res => res.json().catch());
        },
        async post(url, body) {
            const api = this.config["mailcow.api"];
            const key = this.config["mailcow.key"];
            return f(`${api}/${url}`, {
                method: "POST",
                headers: {
                    "X-Api-Key": key,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json().catch());
        }
    },
    /**
     * Service created lifecycle event handler
     */
    created() { },

    /**
     * Service started lifecycle event handler
     */
    async started() { },

    /**
     * Service stopped lifecycle event handler
     */
    stopped() { }
};


