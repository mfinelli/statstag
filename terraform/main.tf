resource "fly_app" "prod" {
  name = "statstag"
}

resource "fly_ip" "v6" {
  app  = fly_app.prod.name
  type = "v6"
}

resource "fly_machine" "app" {
  app      = fly_app.prod.name
  region   = "iad" # nova
  name     = "app"
  image    = "mfinelli/statstag:latest"
  cpus     = 1
  memorymb = 256

  services = [
    {
      protocol      = "tcp"
      internal_port = 3000

      ports = [
        {
          port     = 443
          handlers = ["tls", "http"]
        },
      ]
    },
  ]
}
