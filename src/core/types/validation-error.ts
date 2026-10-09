DEBUG: apply certs with type: ECC
DEBUG: Post JWS Request: https://acme-v02.api.letsencrypt.org/acme/new-order
  DEBUG: Post JWS header: {
  "alg" : "RS256",
    "kid" : "https://acme-v02.api.letsencrypt.org/acme/acct/1365674266",
    "nonce" : "s__XR7YDAi6BFzHxWnif20zBMLhCzuQd9-585VSurDPp_w6ZS6A",
    "url" : "https://acme-v02.api.letsencrypt.org/acme/new-order"
}

DEBUG: Post JWS value: {
  "identifiers" : [
    {
      "type" : "dns",
      "value" : "hrlmv.ru"
    }
  ]
}

DEBUG: szUserAgent: [synology_avoton_415+ DSM7.1-42962 Update 9 (DDNS)]
DEBUG: Post Request: https://acme-v02.api.letsencrypt.org/acme/new-order
  DEBUG: Post value: {
  "payload" : "eyJpZGVudGlmaWVycyI6W3sidHlwZSI6ImRucyIsInZhbHVlIjoiaHJsbXYucnUifV19Cg",
    "protected" : "eyJhbGciOiJSUzI1NiIsImtpZCI6Imh0dHBzOi8vYWNtZS12MDIuYXBpLmxldHNlbmNyeXB0Lm9yZy9hY21lL2FjY3QvMTM2NTY3NDI2NiIsIm5vbmNlIjoic19fWFI3WURBaTZCRnpIeFduaWYyMHpCTUxoQ3p1UWQ5LTU4NVZTdXJEUHBfdzZaUzZBIiwidXJsIjoiaHR0cHM6Ly9hY21lLXYwMi5hcGkubGV0c2VuY3J5cHQub3JnL2FjbWUvbmV3LW9yZGVyIn0K",
    "signature" : "vA2DoANXZaO3dhQOBiyvgT9bZ9kn2sv1YB67J4DftNYbXQlp2QdUp3JVxcjj2dGfMxV1CmM7ZwlNvwSN-sIs_vs5_pWCTnTx041BRPTGQeXwnJ0Ppr1q-NxSbgqgmht7QTHWQnUyiGXHu-LcnGw8FnClAEegyiZbwsGORXsasc2PspQgN3L3BzEdUEtBjC1B3FqPrWeMiA8X1c8WQu3I9_IkOmKUftMxXuHMNpppWlTr4MpvUvzfKdo8ViD2B_CysbYK6eB8O1aGBCvVXwiquJvlkDZf5HEK9rLPcR46R33chWJf7JnO3xRwOUGISg8H2-iP4b9q-HckyKfJdXBMEg"
}

DEBUG: Curl Reply: [429] Header: [HTTP/2 429
  server: nginx
date: Thu, 08 Oct 2026 07:50:38 GMT
content-type: application/problem+json
content-length: 312
boulder-requester: 1365674266
cache-control: public, max-age=0, no-cache
link: <https://acme-v02.api.letsencrypt.org/directory>;rel="index"
link: <https://letsencrypt.org/docs/rate-limits>;rel="help"
replay-nonce: XH75Z4cidvGdPXbgqXpq9vxuBaVVDkVOeDO0ws57--AiHwQFva8
retry-after: 75533

] Body: [{
  "type": "urn:ietf:params:acme:error:rateLimited",
  "detail": "too many certificates (5) already issued for this exact set of identifiers in the last 168h0m0s, retry after 2026-10-09 04:49:31 UTC: see https://letsencrypt.org/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers",
  "status": 429
}]
{"error":104,"file":"client_v2-base.cpp","msg":"too many certificates (5) already issued for this exact set of identifiers in the last 168h0m0s, retry after 2026-10-09 04:49:31 UTC: see https://letsencrypt.org/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers"}

Denis@DS415:~$ sudo /usr/syno/sbin/syno-letsencrypt new-cert -d hrlmv.ru -m XoMA32@yandex.ru -vvvConnection to 192.168.1.101 closed by remote host.
  Connection to 192.168.1.101 closed.
  horlamov@MacBook-Air-Denis ~ % ssh denis@192.168.1.101
** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.
** The server may need to be upgraded. See https://openssh.com/pq.html
  denis@192.168.1.101's password:

Synology strongly advises you not to run commands as the root user, who has
the highest privileges on the system. Doing so may cause major damages
to the system. Please note that if you choose to proceed, all consequences are
at your own risk.

  Denis@DS415:~$ sudo cat /usr/syno/etc/certificate/_archive/INFO
Password:
  Sorry, try again.
  Password:
{
  "MkJ2SP" : {
  "desc" : "DSM",
    "services" : [
    {
      "display_name" : "FTPS",
      "isPkg" : false,
      "owner" : "root",
      "service" : "ftpd",
      "subscriber" : "smbftpd"
    },
    {
      "display_name" : "Synology Storage Console Server",
      "display_name_i18n" : "SYNO.SDS.iSCSI.Application:service:storage_console_server",
      "isPkg" : true,
      "owner" : "root",
      "service" : "pkg-scsi-plugin-server",
      "subscriber" : "ScsiTarget"
    },
    {
      "display_name" : "VPNServer",
      "display_name_i18n" : "SYNO.SDS.VPN.Instance:app:app_name",
      "isPkg" : true,
      "owner" : "root",
      "service" : "OpenVPN",
      "subscriber" : "VPNCenter"
    },
    {
      "display_name" : "Log Receiving",
      "display_name_i18n" : "helptoc:logcenter_server",
      "isPkg" : true,
      "owner" : "root",
      "service" : "pkg-LogCenter",
      "subscriber" : "LogCenter"
    },
    {
      "display_name" : "Replication Service",
      "display_name_i18n" : "app:displayname",
      "isPkg" : true,
      "owner" : "root",
      "service" : "snapshot_receiver",
      "subscriber" : "ReplicationService"
    },
    {
      "display_name" : "WebDAVServer",
      "display_name_i18n" : "SYNO.SDS.WebDAVServer.Instance:app:app_name",
      "isPkg" : true,
      "owner" : "root",
      "service" : "webdav",
      "subscriber" : "WebDAVServer"
    },
    {
      "display_name" : "Synology Drive Server",
      "display_name_i18n" : "SYNO.SDS.Drive.Application:app:pkg_name",
      "isPkg" : true,
      "owner" : "SynologyDrive",
      "service" : "SynologyDrive",
      "subscriber" : "SynologyDrive"
    },
    {
      "display_name" : "Contacts - contacts.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "Contacts",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "NoteStation - note.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "NoteStation",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "Calendar - time.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "Calendar",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "nas",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "FQDN",
      "subscriber" : "system",
      "user_setable" : true
    },
    {
      "display_name" : "DSM Desktop Service",
      "display_name_i18n" : "common:web_desktop",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "default",
      "subscriber" : "system",
      "user_setable" : true
    },
    {
      "display_name" : "FileStation - fs.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "FileStation",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "Portal:80/443",
      "isPkg" : true,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "8ae6cbda-01e5-4bb1-b1cb-a98a7f998ef3",
      "subscriber" : "WebStation"
    },
    {
      "display_name" : "DownloadStation - ds.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "DownloadStation",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "VideoStation - video.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "VideoStation",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "site:80\n/443\n",
      "isPkg" : true,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "vhost_1a969efd-5fc8-4f48-a4c8-662b43a8489e",
      "subscriber" : "WebStation"
    },
    {
      "display_name" : "SynologyPhotos - photo.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "SynologyPhotos",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "SynologyDrive - drive.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "SynologyDrive",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "Virtualization - vm.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "Virtualization",
      "subscriber" : "AppPortal",
      "user_setable" : true
    },
    {
      "display_name" : "denis.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "0e09dd59-7269-471b-81ce-b195191bbd03",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "db.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "1dbc87ce-5004-4b06-9a65-16b6c505717f",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "nas.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "53b8cbdc-192e-4053-889e-fc73e4a6dddb",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "plex.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "7acaf34d-3204-4cdf-8628-9c61cf0e4a9a",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "vpn.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "ab95e8b5-4354-4096-bde1-06e7d92b1888",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "adguard.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "b416aed9-7631-45fa-a0e1-bd8b35ffc5ed",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "mail.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "c4208861-6974-4337-957e-666ce825ca25",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "ha.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "e1919745-d201-47da-a8ad-424d7506e8e3",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "fad0d2eb-67b9-4ada-9935-a968e2d80e91",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "dep.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "f10ef866-67f8-470b-9614-5962d37a4aec",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    },
    {
      "display_name" : "dev.hrlmv.ru",
      "isPkg" : false,
      "multiple_cert" : true,
      "owner" : "root",
      "service" : "98eef129-7351-42e6-9db7-5f5c67e64391",
      "subscriber" : "ReverseProxy",
      "user_setable" : true
    }
  ],
    "user_deletable" : true
},
  "YUNtbm" : {
  "desc" : "Synology QuickConnect Certificate",
    "services" : [],
    "user_deletable" : false
},
  "put3mT" : {
  "desc" : "",
    "services" : []
}
}