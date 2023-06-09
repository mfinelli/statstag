resource "fly_app" "prod" {
  name = "statstag"
}

resource "fly_ip" "v6" {
  app  = fly_app.prod.name
  type = "v6"
}
