data "cloudflare_zone" "statstag" {
  account_id = var.CLOUDFLARE_ACCOUNT_ID
  name       = "statstag.com"
}

resource "cloudflare_record" "apex" {
  zone_id = data.cloudflare_zone.statstag.id
  name    = data.cloudflare_zone.statstag.name
  type    = "AAAA"
  ttl     = 1
  proxied = true
  value   = fly_ip.v6.address
}

resource "fly_cert" "statstag" {
  depends_on = [cloudflare_record.apex]
  app        = fly_app.prod.name
  hostname   = data.cloudflare_zone.statstag.name
}

resource "cloudflare_record" "verification" {
  zone_id = data.cloudflare_zone.statstag.id

  type    = "CNAME"
  ttl     = 1
  proxied = false
  value   = fly_cert.statstag.dnsvalidationtarget

  name = replace(
    fly_cert.statstag.dnsvalidationhostname,
    ".${data.cloudflare_zone.statstag.name}",
    ""
  )
}
