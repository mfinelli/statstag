terraform {
  required_version = "~> 1.4"

  cloud {
    organization = "statstag"

    workspaces {
      name = "prod"
    }
  }

  required_providers {
    fly = {
      source  = "fly-apps/fly"
      version = "~> 0.0"
    }
  }
}

provider "fly" {
  fly_http_endpoint = "https://api.machines.dev"
}
