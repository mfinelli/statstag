terraform {
  required_version = "~> 1.4"

  cloud {
    organization = "statstag"

    workspaces {
      name = "prod"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.7"
    }

    fly = {
      source  = "fly-apps/fly"
      version = "~> 0.0"
    }
  }
}

provider "fly" {
  fly_http_endpoint = "api.machines.dev"
}

provider "cloudflare" {}

variable "CLOUDFLARE_ACCOUNT_ID" {
  type = string
}
